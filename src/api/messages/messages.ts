import { bytesToBase64, fetchJson, getPublicKeyBase64 } from '../../utils';
import { Wallet } from '../../wallet';
import { StdTxFee, StdTxMessageType, StdTxMessageValueMap, StdTxResponseValue } from '../types';
import { getSignature } from '../api-utils';
import { getMinGasPrice } from '../operations';
import { Account } from '../profile';
import {
  BroadcastBody,
  BroadcastClientError,
  BroadcastErrorResponse,
  BroadcastMode,
  BroadcastOptions,
  BroadcastResponse,
  SignedMessage,
  StdMessage,
} from './types';

function createStdMessage<K extends keyof StdTxMessageValueMap>(
  txResponseValue: StdTxResponseValue<K>,
  account: Pick<Account, 'account_number' | 'sequence'>,
  chainId: string,
): StdMessage<K> {
  return {
    account_number: account.account_number,
    chain_id: chainId,
    fee: txResponseValue.fee,
    memo: txResponseValue.memo,
    msgs: txResponseValue.msg,
    sequence: account.sequence,
  };
}

function signMessage<K extends keyof StdTxMessageValueMap>(
  message: StdMessage<K>,
  privateKey: Wallet['privateKey'],
): SignedMessage<K> {
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

function broadcastSignedMessage<K extends keyof StdTxMessageValueMap>(
  apiUrl: string,
  message: SignedMessage<K>,
  mode?: BroadcastMode,
): Promise<BroadcastResponse<K>> {
  const body: BroadcastBody<K> = {
    mode: mode || 'block',
    tx: message,
  };

  return fetchJson<BroadcastResponse<K>, BroadcastBody<K>>(`${apiUrl}/txs`, {
    method: 'POST',
    body,
  });
}

function isBroadcastErrorResponse<K extends StdTxMessageType>(
  response: BroadcastResponse<K>
): response is BroadcastErrorResponse {
  return !!(response as BroadcastErrorResponse).code;
}

export async function broadcast<K extends keyof StdTxMessageValueMap>(
  apiUrl: string,
  chainId: string,
  stdTxValue: StdTxResponseValue<K>,
  account: Pick<Account, 'account_number' | 'sequence'> & {
    privateKey: Wallet['privateKey'],
  },
  options?: BroadcastOptions,
): Promise<BroadcastResponse<K>> {
  const minGasPrice = await getMinGasPrice(apiUrl).then((price) => price.amount);

  const fee: StdTxFee = {
    ...stdTxValue.fee,
    amount: [{
      amount: Math.ceil(+minGasPrice * +stdTxValue.fee.gas).toString(),
      denom: 'udec',
    }],
  };

  const newStdTxValue: StdTxResponseValue<K> = {
    ...stdTxValue,
    fee,
  };

  const stdTxMessage = createStdMessage(newStdTxValue, account, chainId);

  const signedMessage = signMessage(stdTxMessage, account.privateKey);

  return broadcastSignedMessage(apiUrl, signedMessage, options?.mode)
    .then((response) => {
      if (isBroadcastErrorResponse(response) && !options?.skipErrors) {
        throw new BroadcastClientError(response.code);
      }

      return {
        ...response,
        stdTxValue,
      };
    });
}
