import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { bufferToBytes } from '@tendermint/belt';
import { Address4, Address6 } from 'ip-address';
import { generateKeyPair } from 'curve25519-js';
import Long from 'long';

import { Params } from '../../../../codec/sentinel/session/v1/params';
import { Session } from '../../../../codec/sentinel/session/v1/session';
import {
  QueryParamsRequest,
  QuerySessionRequest,
  QuerySessionsForAddressRequest,
  QuerySessionsRequest,
} from '../../../../codec/sentinel/session/v1/querier';
import {
  createWalletFromPrivateKey,
  transformWalletAddress,
  WalletPrefix,
} from '../../../../wallet';
import {
  Base64ToBytes,
  bytesToString,
  coerceArray,
  fetchJson,
  getAuthHeaders,
} from '../../../../utils';
import { getWebCryptoRandomBytesBuffer } from '../../../../mnemonic';
import { createTypedEncodeObject } from '../../api-utils';
import { setupSessionExtension } from './extension';
import {
  AddSessionResponse,
  EndSessionRequest,
  StartSessionRequest,
  UpdateSessionRequest,
} from './types';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { TxMessageTypeUrl } from '../registry';

export class SessionClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupSessionExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getSessions(request: QuerySessionsRequest): Promise<Session[]> {
    return this.queryClient.session.getSessions(request);
  }

  public getSessionsForAddress(request: QuerySessionsForAddressRequest): Promise<Session[]> {
    return this.queryClient.session.getSessionsForAddress(request);
  }

  public getSession(request: QuerySessionRequest): Promise<Session | undefined> {
    return this.queryClient.session.getSession(request);
  }

  public getParams(request: QueryParamsRequest): Promise<Params | undefined> {
    return this.queryClient.session.getParams(request);
  }

  public async addSession(vpnNode: string, sessionId: Long): Promise<AddSessionResponse> {
    const privateKey = this.transactionSignerFactory.getPrivateKey();

    const walletAddress = await createWalletFromPrivateKey(privateKey)
      .then(({ address }) => transformWalletAddress(address, WalletPrefix.Sentinel));

    const sessionBytes = new Uint8Array(sessionId.toBytesBE());

    const signature = getAuthHeaders(
      sessionBytes,
      privateKey,
      {
        signatureEncoding: 'base64',
      },
    ).Signature;

    const endpoint = `${vpnNode}/accounts/${walletAddress}/sessions/${sessionId}`;

    const wgKeyPair = generateKeyPair(bufferToBytes(getWebCryptoRandomBytesBuffer()));
    const wgPrivateKey = bytesToString(wgKeyPair.private, 'base64');
    const wgPublicKey = bytesToString(wgKeyPair.public, 'base64');

    const body = {
      signature,
      key: wgPublicKey,
    };

    const response = await fetchJson<{
      error?: {
        message: string,
      };
      result?: string;
    }>(
      endpoint,
      {
        method: 'POST',
        body,
      },
    );

    if (response.error) {
      throw new Error(response.error.message);
    }

    const responseBytes = Base64ToBytes.decode(response.result as string);

    enum ResponseResultLength {
      IpV4 = 4,
      IpV6 = 16,
      Host = 4,
      Port = 2,
      HostPublicKey = 32,
    }

    let offset = 0;

    const ipV4Bytes = responseBytes.slice(offset, offset += ResponseResultLength.IpV4);
    const ipV4 = Address4.fromHex(bytesToString(ipV4Bytes, 'hex')).address;

    const ipV6Bytes = responseBytes.slice(offset, offset += ResponseResultLength.IpV6);
    const ipV6 = Address6.fromByteArray([...ipV6Bytes.values()]).address;

    const hostBytes = responseBytes.slice(offset, offset += ResponseResultLength.Host);
    const host = Address4.fromHex(bytesToString(hostBytes, 'hex')).address;

    const portBytes = responseBytes.slice(offset, offset += ResponseResultLength.Port);
    const port = Buffer.from(portBytes).readUint16BE();

    const hostPublicKeyBytes = responseBytes.slice(offset, offset += ResponseResultLength.HostPublicKey);
    const hostPublicKey = bytesToString(hostPublicKeyBytes, 'base64');

    return {
      ipV4,
      ipV6,
      host,
      port,
      hostPublicKey,
      wgPrivateKey,
    };
  }

  public startSession(
    request: StartSessionRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SessionStart,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public updateSession(
    request: UpdateSessionRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SessionUpdate,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public endSession(
    request: EndSessionRequest,
  ): TransactionSigner {
    const messages = coerceArray(request)
      .map((message) => createTypedEncodeObject(
        TxMessageTypeUrl.SessionEnd,
        message,
      ));

    return this.transactionSignerFactory(messages);
  }
}
