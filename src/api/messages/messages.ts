import { bytesToBase64, fetchJson, getPublicKeyBase64 } from '../../utils';
import { Wallet } from '../../wallet';
import { StdTxResponseValue } from '../types';
import { getSignature } from '../api-utils';
import { Account } from '../profile';
import {
  BroadcastBody, BroadcastClientError,
  BroadcastErrorResponse,
  BroadcastMode, BroadcastOptions,
  BroadcastResponse,
  SignedMessage,
  StdMessage
} from './types'

function createStdMessage(
  txResponseValue: StdTxResponseValue,
  account: Pick<Account, 'account_number' | 'sequence'>,
  chainId: string,
): StdMessage {
  return {
    account_number: account.account_number,
    chain_id: chainId,
    fee: txResponseValue.fee,
    memo: txResponseValue.memo,
    msgs: txResponseValue.msg,
    sequence: account.sequence,
  };
}

function signMessage(
  message: StdMessage,
  privateKey: Wallet['privateKey'],
): SignedMessage {
  const signature = getSignature(message, privateKey);
  const signatureBase64 = bytesToBase64(signature);
  const publicKeyBase64 = getPublicKeyBase64(privateKey);

  return {
    msg: message.msgs,
    fee: message.fee,
    memo: message.memo,
    signatures: [
      {
        account_number: message.account_number,
        sequence: message.sequence,
        signature: signatureBase64,
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: publicKeyBase64,
        },
      },
    ],
  };
}

function broadcastSignedMessage(
  apiUrl: string,
  message: SignedMessage,
  mode?: BroadcastMode,
): Promise<BroadcastResponse> {
  const body: BroadcastBody = {
    mode: mode || 'block',
    tx: message,
  };

  return fetchJson<BroadcastResponse, BroadcastBody>(`${apiUrl}/txs`, {
    method: 'POST',
    body,
  });
}

function isBroadcastErrorResponse(response: BroadcastResponse): response is BroadcastErrorResponse {
  return !!(response as BroadcastErrorResponse).code;
}

export async function broadcast(
  apiUrl: string,
  chainId: string,
  stdTxValue: StdTxResponseValue,
  account: Pick<Account, 'account_number' | 'sequence'> & {
    privateKey: Wallet['privateKey'],
  },
  options?: BroadcastOptions,
): Promise<BroadcastResponse> {
  const stdTxMessage = createStdMessage(stdTxValue, account, chainId);
  const signedMessage = signMessage(stdTxMessage, account.privateKey);

  return broadcastSignedMessage(apiUrl, signedMessage, options?.mode)
    .then((response) => {
      if (isBroadcastErrorResponse(response) && !options?.skipErrors) {
        throw new BroadcastClientError(response.code);
      }

      return response;
    });
}
