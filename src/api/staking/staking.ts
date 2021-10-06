import { Wallet } from '../../wallet';
import { addGas, blockchainFetch } from '../api-utils';
import {
  CreateDelegationRequest, CreateRedelegationRequest, CreateUnbondingDelegationRequest,
  Delegation,
  DelegationBroadcastOptions,
  Pool,
  QueryCreateDelegationResponse, QueryCreateUnbondingDelegationResponse,
  Redelegation,
  StakingParameters,
  UnbondingDelegation,
  Validator,
  ValidatorsFilterParameters,
  ValidatorStatus,
} from './types';
import { fetchJson } from '../../utils';
import { broadcast, BroadcastResponse } from '../messages';
import { StdTxMessageType } from '../types';
import { Account, getAccount } from '../profile';

type ValidatorStatusFilterParameter = 'unbonding' | 'bonded' | 'unbonded';

const VALIDATOR_STATUS_MAP: Record<ValidatorStatus, ValidatorStatusFilterParameter> = {
  [ValidatorStatus.Bonded]: 'bonded',
  [ValidatorStatus.Unbonded]: 'unbonded',
  [ValidatorStatus.Unbonding]: 'unbonding',
}

export function getPool(
  apiUrl: string,
): Promise<Pool> {
  return blockchainFetch(`${apiUrl}/staking/pool`);
}

export function getValidators(
  apiUrl: string,
  filter?: ValidatorsFilterParameters,
): Promise<Validator[]> {
  return blockchainFetch(`${apiUrl}/staking/validators`, {
    status: VALIDATOR_STATUS_MAP[filter?.status as ValidatorStatus],
  });
}

export function getValidator(
  apiUrl: string,
  address: Validator['operator_address'],
): Promise<Validator> {
  return blockchainFetch(`${apiUrl}/staking/validators/${address}`);
}

export function getDelegations(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Delegation[]> {
  return blockchainFetch(
    `${apiUrl}/staking/delegators/${delegatorAddress}/delegations`,
  );
}

async function queryCreateDelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateDelegationRequest,
): Promise<QueryCreateDelegationResponse> {
  const url = `${apiUrl}/staking/delegators/${delegation.delegator_address}/delegations`;

  const body = await addGas(delegation, chainId, url, delegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function createDelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateDelegationRequest,
): Promise<QueryCreateDelegationResponse>;

export async function createDelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateDelegationRequest,
  broadcastOptions: DelegationBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosDelegate>>;

export async function createDelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateDelegationRequest,
  broadcastOptions?: DelegationBroadcastOptions,
): Promise<QueryCreateDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosDelegate>> {
  const stdTxResponse = await queryCreateDelegation(
    apiUrl,
    chainId,
    delegation,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, delegation.delegator_address) as Account;

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

export function getValidatorDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<Delegation[]>;

export function getValidatorDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
  delegatorAddress: Wallet['address'],
): Promise<Delegation>;

export function getValidatorDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
  delegatorAddress?: Wallet['address'],
): Promise<Delegation[] | Delegation> {
  return blockchainFetch(delegatorAddress
    ? `${apiUrl}/staking/delegators/${delegatorAddress}/delegations/${validatorAddress}`
    : `${apiUrl}/staking/validators/${validatorAddress}/delegations`
  );
}

async function queryCreateUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
): Promise<QueryCreateUnbondingDelegationResponse> {
  const url = `${apiUrl}/staking/delegators/${unbondingDelegation.delegator_address}/unbonding_delegations`;

  const body = await addGas(unbondingDelegation, chainId, url, unbondingDelegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function createUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
): Promise<QueryCreateUnbondingDelegationResponse>;

export async function createUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
  broadcastOptions: DelegationBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosDelegate>>;

export async function createUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
  broadcastOptions?: DelegationBroadcastOptions,
): Promise<QueryCreateUnbondingDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosDelegate>> {
  const stdTxResponse = await queryCreateUnbondingDelegation(
    apiUrl,
    chainId,
    unbondingDelegation,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, unbondingDelegation.delegator_address) as Account;

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

export function getUnbondingDelegations(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<UnbondingDelegation[]> {
  return blockchainFetch(
    `${apiUrl}/staking/delegators/${delegatorAddress}/unbonding_delegations`,
  );
}

export function getValidatorUnbondingDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<UnbondingDelegation[]>;

export function getValidatorUnbondingDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
  delegatorAddress: Wallet['address'],
): Promise<UnbondingDelegation>;

export function getValidatorUnbondingDelegations(
  apiUrl: string,
  validatorAddress: Validator['operator_address'],
  delegatorAddress?: Wallet['address'],
): Promise<UnbondingDelegation[] | UnbondingDelegation> {
  return blockchainFetch(delegatorAddress
    ? `${apiUrl}/staking/delegators/${delegatorAddress}/unbonding_delegations/${validatorAddress}`
    : `${apiUrl}/staking/validators/${validatorAddress}/unbonding_delegations`
  );
}

async function queryCreateRedelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateRedelegationRequest,
): Promise<QueryCreateDelegationResponse> {
  const url = `${apiUrl}/staking/delegators/${delegation.delegator_address}/redelegations`;

  const body = await addGas(delegation, chainId, url, delegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateRedelegationRequest,
): Promise<QueryCreateDelegationResponse>;

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
  broadcastOptions: DelegationBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosDelegate>>;

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
  broadcastOptions?: DelegationBroadcastOptions,
): Promise<QueryCreateDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosDelegate>> {
  const stdTxResponse = await queryCreateRedelegation(
    apiUrl,
    chainId,
    redelegation,
  );

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, redelegation.delegator_address) as Account;

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

export function getRedelegations(
  apiUrl: string,
): Promise<Redelegation[]> {
  return blockchainFetch(`${apiUrl}/staking/redelegations`);
}

export function getDelegatorValidators(
  apiUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Validator[]> {
  return blockchainFetch(
    `${apiUrl}/staking/delegators/${delegatorAddress}/validators`
  );
}

export function getStakingParameters(
  apiUrl: string,
): Promise<StakingParameters> {
  return blockchainFetch(`${apiUrl}/staking/parameters`);
}
