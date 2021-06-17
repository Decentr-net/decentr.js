import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch, createBaseRequest } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { Fee, StdTxMessageType } from '../types';
import { QueryResetAccountResponse, ResetAccountBroadcastOptions } from './types';

export function getMinGasPrice(apiUrl: string): Promise<Fee> {
  return blockchainFetch(`${apiUrl}/operations/min-gas-price`);
}

export function queryResetAccount(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  initiator: Wallet['address'],
): Promise<QueryResetAccountResponse> {
  const url = `${apiUrl}/operations/accounts/${walletAddress}/reset`;

  const body = createBaseRequest({
    chainId,
    walletAddress: initiator,
  });

  return fetchJson(url, { method: 'POST', body });
}

export async function resetAccount(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  initiator: Wallet['address'],
): Promise<QueryResetAccountResponse>;

export async function resetAccount(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  initiator: Wallet['address'],
  broadcastOptions: ResetAccountBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.OperationsResetAccount>>;

export async function resetAccount(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  initiator: Wallet['address'],
  broadcastOptions?: ResetAccountBroadcastOptions,
): Promise<QueryResetAccountResponse | BroadcastResponse<StdTxMessageType.OperationsResetAccount>> {
  const stdTxResponse = await queryResetAccount(
    apiUrl,
    chainId,
    walletAddress,
    initiator,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, initiator) as Account;

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
