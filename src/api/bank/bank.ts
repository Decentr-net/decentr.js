import { Account, getAccount } from '../profile';
import { addGas, blockchainFetch } from '../api-utils';
import {
  BankBroadcastOptions,
  BankCoin,
  QueryTransferResponse,
  TransferData,
  TransferHistory,
  TransferHistoryPaginationOptions,
  TransferHistoryResponse
} from './types'
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
  transferData: TransferData,
): Promise<QueryTransferResponse> {
  const url = `${apiUrl}/bank/accounts/${transferData.to_address}/transfers`;

  const queryParam = {
    amount: [{
      amount: transferData.amount,
      denom: 'udec',
    }],
  };

  const body = await addGas(queryParam, chainId, url, transferData.from_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  transferData: TransferData,
): Promise<QueryTransferResponse>;

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  transferData: TransferData,
  broadcastOptions: BankBroadcastOptions,
): Promise<BroadcastResponse>;

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  transferData: TransferData,
  broadcastOptions?: BankBroadcastOptions,
): Promise<QueryTransferResponse | BroadcastResponse> {
  const stdTxResponse = await queryTransfer(
    apiUrl,
    chainId,
    transferData
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, transferData.from_address) as Account;

  return broadcast(
    apiUrl,
    chainId,
    stdTxResponse.value,
    {
      ...account,
      privateKey: broadcastOptions.privateKey,
    },
    broadcastOptions,
  );
}

export async function getTransferHistory(
  apiUrl: string,
  walletAddress: Wallet['address'],
  role: 'sender' | 'recipient',
  paginationOptions?: TransferHistoryPaginationOptions,
): Promise<TransferHistory> {
  const response = await fetchJson<TransferHistoryResponse>(
    `${apiUrl}/txs`,
    {
      queryParameters: {
        ...paginationOptions,
        [`transfer.${role}`]: walletAddress,
      },
    },
  );

  const transactions = response.txs.map((elem) => {
    const txValue = elem.tx.value.msg[0].value;

    return {
      amount: txValue.amount[0].amount,
      recipient: txValue.to_address,
      sender: txValue.from_address,
      timestamp: elem.timestamp,
    };
  });

  return {
    count: response.count,
    limit: response.limit,
    page: response.page_number,
    transactions,
  };
}
