import { Account, getAccount } from '../profile';
import { blockchainFetch, calculateTransactionFeeAmount } from '../api-utils';
import {
  BankBroadcastOptions,
  BankCoin,
  QueryTransferResponse,
  TransferData,
  TransferHistory,
  TransferHistoryPaginationOptions,
  TransferHistoryResponse,
  TransferRole,
} from './types'
import { broadcast, BroadcastResponse } from '../messages';
import { fetchJson } from '../../utils';
import { Wallet } from '../../wallet';
import { Fee, StdTxMessageType } from '../types';
import { getTransferUrl, prepareTransferBody } from './utils';

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
  const url = getTransferUrl(apiUrl, transferData.to_address);

  const body = await prepareTransferBody(url, chainId, transferData);

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateTransferFee(
  apiUrl: string,
  chainId: string,
  transferData: TransferData,
): Promise<Fee[]> {
  const url = getTransferUrl(apiUrl, transferData.to_address);

  const body = await prepareTransferBody(url, chainId, transferData);

  return calculateTransactionFeeAmount(apiUrl, body.base_req.gas as string);
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
): Promise<BroadcastResponse<StdTxMessageType.CosmosSend>>;

export async function sendCoin(
  apiUrl: string,
  chainId: string,
  transferData: TransferData,
  broadcastOptions?: BankBroadcastOptions,
): Promise<QueryTransferResponse | BroadcastResponse<StdTxMessageType.CosmosSend>> {
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
    {
      ...stdTxResponse.value,
      memo: transferData.comment || stdTxResponse.value.memo,
    },
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
  role: TransferRole,
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

  const transactions = response.txs.map((element) => {
    const txValue = element.tx.value.msg[0].value;

    return {
      amount: txValue.amount[0],
      comment: element.tx.value.memo,
      fee: element.tx.value.fee,
      recipient: txValue.to_address,
      sender: txValue.from_address,
      timestamp: element.timestamp,
    };
  });

  return {
    count: +response.count,
    limit: +response.limit,
    page: +response.page_number,
    pageTotal: +response.page_total,
    totalCount: +response.total_count,
    transactions,
  };
}
