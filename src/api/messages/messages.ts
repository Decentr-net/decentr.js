import { bytesToBase64, fetchJson, getPublicKeyBase64 } from '../../utils';
import { Wallet } from '../../wallet';
import { StdTxResponseValue } from '../types';
import { getSignature } from '../api-utils';
import { Account } from '../profile';
import { BroadcastBody, BroadcastMode, BroadcastResponse, SignedMessage, StdMessage } from './types';

function createStdMessage(
  txResponseValue: StdTxResponseValue,
  account: Pick<Account, 'account_number' | 'sequence'>,
  chainId: string,
): StdMessage {
  return {
    msg: txResponseValue.msg,
    chain_id: chainId,
    fee: {
      amount: txResponseValue.fee.amount.map((amount => ({
        amount: amount.amount || '5000',
        denom: amount.denom || 'udec',
      }))),
      gas: txResponseValue.fee.gas,
    },
    memo: txResponseValue.memo,
    account_number: account.account_number,
    sequence: account.sequence,
  }
}

function signMessage(message: StdMessage, privateKey: Wallet['privateKey']): SignedMessage {
  const signature = getSignature(message, privateKey);
  const signatureBase64 = bytesToBase64(signature);
  const publicKeyBase64 = getPublicKeyBase64(privateKey);

  return {
    msg: message.msg,
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
    tx: message,
    mode: mode || 'block',
  };

  return fetchJson<BroadcastResponse, BroadcastBody>(`${apiUrl}/txs`, {
    method: 'POST',
    body,
  });
}

export async function broadcast(
  apiUrl: string,
  chainId: string,
  stdTxValue: StdTxResponseValue,
  account: Pick<Account, 'account_number' | 'sequence'> & {
    privateKey: Wallet['privateKey'],
  },
  options: {
    mode?: BroadcastMode;
  },
): Promise<BroadcastResponse> {
  const stdTxMessage = createStdMessage(stdTxValue, account, chainId);
  const signedMessage = signMessage(stdTxMessage, account.privateKey);
  return broadcastSignedMessage(apiUrl, signedMessage, options.mode);
}
