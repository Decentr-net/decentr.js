import { Account, getAccount } from '../profile';
import { addGas, blockchainFetch } from '../api-utils';
import { BankBroadcastOptions, BankCoin, QueryTransferResponse } from './types';
import { broadcast, BroadcastResponse } from '../messages';
import { fetchJson } from '../../utils';
import { Wallet } from '../../wallet';

export function getBankBalances(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<BankCoin[]> {
  return blockchainFetch<BankCoin[]>(`${apiUrl}/bank/balances/${walletAddress}`);
}

async function queryTransfer(
  apiUrl: string,
  chainId: string,
  walletAddressFrom: Wallet['address'],
  walletAddressTo: Wallet['address'],
  amount: string,
): Promise<QueryTransferResponse> {
  const url = `${apiUrl}/bank/accounts/${walletAddressTo}/transfers`;

  const queryParam = {
    amount: [{
      amount,
      denom: 'udec',
    }],
  };

  const body = await addGas(queryParam, chainId, url, walletAddressFrom);

  return fetchJson(url, { method: 'POST', body });
}

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  wallet: Wallet,
  walletAddressTo: Wallet['address'],
  amount: string,
): Promise<QueryTransferResponse>;

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  wallet: Wallet,
  walletAddressTo: Wallet['address'],
  amount: string,
  broadcastOptions: BankBroadcastOptions,
): Promise<BroadcastResponse>;

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  wallet: Wallet,
  walletAddressTo: Wallet['address'],
  amount: string,
  broadcastOptions?: BankBroadcastOptions,
): Promise<QueryTransferResponse | BroadcastResponse> {
  const stdTxResponse = await queryTransfer(
    apiUrl,
    chainId,
    wallet.address,
    walletAddressTo,
    amount,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, wallet.address) as Account;

  return broadcast(
    apiUrl,
    chainId,
    stdTxResponse.value,
    {
      ...account,
      privateKey: wallet.privateKey,
    },
    broadcastOptions,
  );
}
