import {
  BroadcastTxResponse,
  Coin,
  coins,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { assertIsBroadcastSuccess, createDecentrCoin } from '../api-utils';
import { DECENTR_DENOM } from '../types';
import { SendTokensOptions } from './types';

export function getBalance(
  nodeUrl: string,
  walletAddress: Wallet['address'],
): Promise<Coin[]> {
  const url = `${nodeUrl}/cosmos/bank/v1beta1/balances/${walletAddress}`;

  return fetchJson<{ balances: Coin[] }>(url)
    .then(({ balances }) => balances);
}

export function getDenomBalance(
  nodeUrl: string,
  walletAddress: Wallet['address'],
  denom: string = DECENTR_DENOM,
): Promise<Coin> {
  const url = `${nodeUrl}/cosmos/bank/v1beta1/balances/${walletAddress}/${denom}`;

  return fetchJson<{ balance: Coin }>(url)
    .then(({ balance }) => balance);
}

export function getSupply(
  nodeUrl: string,
): Promise<Coin[]> {
  const url = `${nodeUrl}/cosmos/bank/v1beta1/supply`;

  return fetchJson<{ supply: Coin[] }>(url)
    .then(({ supply }) => supply);
}

export function getDenomSupply(
  nodeUrl: string,
  denom: string = DECENTR_DENOM,
): Promise<Coin> {
  const url = `${nodeUrl}/cosmos/bank/v1beta1/supply/${denom}`;

  return fetchJson<{ amount: Coin }>(url)
    .then(({ amount }) => amount);
}

// TODO: replace with cosmos simulate
// export async function calculateTransferFee(
//   nodeUrl: string,
//   chainId: string,
//   transferData: TransferData,
// ): Promise<Fee[]> {
//   const url = getTransferUrl(nodeUrl, transferData.to_address);
//
//   const body = await prepareTransferBody(url, chainId, transferData);
//
//   return calculateTransactionFeeAmount(nodeUrl, body.base_req.gas as string);
// }

export async function sendTokens(
  nodeUrl: string,
  options: SendTokensOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  // TODO: replace with gasPrice
  const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet);
  // const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet, { gasPrice });

  const accounts = await wallet.getAccounts();

  const result = await signingStargateClient.sendTokens(
    accounts[0].address,
    options.recipient,
    options.denom
      ? coins(options.amount, options.denom)
      : [createDecentrCoin(options.amount)],
    // TODO: change to 'auto'
    {
      amount: [createDecentrCoin(options.amount)],
      gas: '1',
    },
    options.comment,
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}
