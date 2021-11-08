import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch, calculateTransactionFeeAmount, prepareQueryBody } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { Validator } from '../staking';
import { DenomAmount, Fee, StdTxMessageType, StdTxResponse } from '../types';
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

function createWithdrawDelegatorRewardsUrl(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
  fromValidatorAddress?: Validator['operator_address'],
): string {
  const baseUrl = `${apiUrl}/distribution/delegators/${delegatorAddress}/rewards`;

  return fromValidatorAddress ? `${baseUrl}/${fromValidatorAddress}` : baseUrl;
}

async function queryWithdrawDelegatorRewards(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  fromValidatorAddress?: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>> {
  const url = createWithdrawDelegatorRewardsUrl(
    apiUrl,
    delegatorAddress,
    fromValidatorAddress,
  );

  const body = await prepareQueryBody(
    url,
    chainId,
    {},
    delegatorAddress,
  );

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateWithdrawDelegatorRewardsFee(
  apiUrl: string,
  chainId: string,
  delegatorAddress: Wallet['address'],
  fromValidatorAddress?: Validator['operator_address'],
): Promise<Fee[]> {
  const url = createWithdrawDelegatorRewardsUrl(
    apiUrl,
    delegatorAddress,
    fromValidatorAddress,
  );

  const queryBody = await prepareQueryBody(
    url,
    chainId,
    {},
    delegatorAddress,
  );

  return calculateTransactionFeeAmount(apiUrl, queryBody.base_req.gas as string);
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
  const stdTxResponse = await queryWithdrawDelegatorRewards(
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

export function getValidatorOutstandingRewards(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<DenomAmount[]> {
  return blockchainFetch(
    `${apiUrl}/distribution/validators/${validatorAddress}/outstanding_rewards`,
  );
}

export function getValidatorRewards(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<DenomAmount[]> {
  return blockchainFetch(
    `${apiUrl}/distribution/validators/${validatorAddress}/rewards`,
  );
}

function createWithdrawValidatorRewardsUrl(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): string {
  return `${apiUrl}/distribution/validators/${validatorAddress}/rewards`;
}

async function queryWithdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawValidatorCommission>> {
  const url = createWithdrawValidatorRewardsUrl(apiUrl, validatorAddress);

  const body = await prepareQueryBody(
    url,
    chainId,
    {},
    walletAddress,
  );

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateWithdrawValidatorRewardsFee(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<Fee[]> {
  const url = createWithdrawValidatorRewardsUrl(
    apiUrl,
    validatorAddress,
  );

  const queryBody = await prepareQueryBody(
    url,
    chainId,
    {},
    walletAddress,
  );

  return calculateTransactionFeeAmount(apiUrl, queryBody.base_req.gas as string);
}

export function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawValidatorCommission>>;

export function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
  broadcastOptions: DistributionBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosWithdrawValidatorCommission>>;

export async function withdrawValidatorRewards(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
  broadcastOptions?: DistributionBroadcastOptions,
): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawValidatorCommission> | BroadcastResponse<StdTxMessageType.CosmosWithdrawValidatorCommission>> {
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
