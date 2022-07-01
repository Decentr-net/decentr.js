import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

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
import { coerceArray, fetchJson } from '../../../../utils';
import { createTypedEncodeObject } from '../../api-utils';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { TxMessageTypeUrl } from '../registry';
import { setupSessionExtension } from './extension';
import {
  EndSessionRequest,
  SessionConnectInfo,
  StartSessionRequest,
  UpdateSessionRequest,
} from './types';
import { generateKeys, getSessionSignature, parseAddSessionResponse } from './wireguard';

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

  public async addSession(vpnNode: string, sessionId: Session['id']): Promise<SessionConnectInfo> {
    const privateKey = this.transactionSignerFactory.getPrivateKey();

    const walletAddress = await createWalletFromPrivateKey(privateKey)
      .then(({ address }) => transformWalletAddress(address, WalletPrefix.Sentinel));

    const signature = getSessionSignature(sessionId, privateKey);

    const endpoint = `${vpnNode}/accounts/${walletAddress}/sessions/${sessionId}`;

    const { privateKey: wgPrivateKey, publicKey: wgPublicKey } = generateKeys();

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

    return {
      ...parseAddSessionResponse(response.result as string),
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
