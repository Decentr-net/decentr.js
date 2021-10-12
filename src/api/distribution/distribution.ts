import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch, prepareQueryBody } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { Validator } from '../staking';
import { DenomAmount, StdTxMessageType, StdTxResponse } from '../types';
import {
  DelegatorRewards,
  DistributionBroadcastOptions,
  DistributionParameters,
  ValidatorDistribution,
} from './types';

export function getDelegatorRewards(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<DelegatorRewards>;

export function getDelegatorRewards(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<DelegatorRewards>;

export function getDelegatorRewards(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
  validatorAddress?: Validator['operator_address'],
): Promise<DelegatorRewards | DenomAmount[]> {
  const baseUrl = `${apiUrl}/distribution/delegators/${delegatorAddress}/rewards`;

  return blockchainFetch(
    validatorAddress ? `${baseUrl}/${validatorAddress}` : baseUrl,
  );
}

export function getWithdrawAddress(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Wallet['address']> {
  return blockchainFetch(
    `${apiUrl}/distribution/delegators/${delegatorAddress}/withdraw_address`,
  );
}

async function queryReplaceWithdrawAddress(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  withdrawAddress: Wallet['address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosModifyWithdrawAddress>> {
  const url = `${apiUrl}/distribution/delegators/${delegatorAddress}/withdraw_address`;

  const body = await prepareQueryBody(
    url,
    chainId,
    { withdraw_address: withdrawAddress },
    delegatorAddress,
  );

  return fetchJson(url, { method: 'POST', body });
}

export function replaceWithdrawAddress(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  withdrawAddress: Wallet['address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosModifyWithdrawAddress>>;

export function replaceWithdrawAddress(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  withdrawAddress: Wallet['address'],
  broadcastOptions: DistributionBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosModifyWithdrawAddress>>;

export async function replaceWithdrawAddress(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  withdrawAddress: Wallet['address'],
  broadcastOptions?: DistributionBroadcastOptions,
): Promise<StdTxResponse<StdTxMessageType.CosmosModifyWithdrawAddress> | BroadcastResponse<StdTxMessageType.CosmosModifyWithdrawAddress>> {
  const stdTxResponse = await queryReplaceWithdrawAddress(
    apiUrl,
    chainId,
    delegatorAddress,
    withdrawAddress,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, delegatorAddress) as Account;

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

async function queryWithdrawDelegatorsRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  fromValidatorAddress?: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>> {
  const baseUrl = `${apiUrl}/distribution/delegators/${delegatorAddress}/rewards`;

  const url = fromValidatorAddress ? `${baseUrl}/${fromValidatorAddress}` : baseUrl;

  const body = await prepareQueryBody(
    url,
    chainId,
    {},
    delegatorAddress,
  );

  return fetchJson(url, { method: 'POST', body });
}

export function withdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

export function withdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  options: DistributionBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

export function withdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  options: { fromValidatorAddress : Validator['operator_address'] },
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

export function withdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  options: DistributionBroadcastOptions & { fromValidatorAddress? : Validator['operator_address'] },
): Promise<BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

export async function withdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  options?: DistributionBroadcastOptions & { fromValidatorAddress? : Validator['operator_address'] }
    | { fromValidatorAddress : Validator['operator_address'] },
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward> | BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>> {
  const stdTxResponse = await queryWithdrawDelegatorsRewards(
    apiUrl,
    chainId,
    delegatorAddress,
    options?.fromValidatorAddress,
  );

  const broadcastOptions = options as DistributionBroadcastOptions;

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, delegatorAddress) as Account;

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

export function getValidatorDistribution(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<ValidatorDistribution> {
  return blockchainFetch(
    `${apiUrl}/distribution/validators/${validatorAddress}`,
  );
}

async function queryWithdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.Undefined>> {
  const url = `${apiUrl}/distribution/validators/${validatorAddress}/rewards`;

  const body = await prepareQueryBody(
    url,
    chainId,
    {},
    walletAddress,
  );

  return fetchJson(url, { method: 'POST', body });
}

export function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.Undefined>>;

export function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
  broadcastOptions: DistributionBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.Undefined>>;

export async function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
  broadcastOptions?: DistributionBroadcastOptions,
): Promise<StdTxResponse<StdTxMessageType.Undefined> | BroadcastResponse<StdTxMessageType.Undefined>> {
  const stdTxResponse = await queryWithdrawValidatorRewards(
    apiUrl,
    chainId,
    walletAddress,
    validatorAddress,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, walletAddress) as Account;

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

export function getCommunityPool(apiUrl: string): Promise<DenomAmount[]> {
  return blockchainFetch(`${apiUrl}/distribution/community_pool`);
}

export function getDistributionParameters(apiUrl: string): Promise<DistributionParameters> {
  return blockchainFetch(`${apiUrl}/distribution/parameters`);
}
