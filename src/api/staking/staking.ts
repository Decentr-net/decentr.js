import { Wallet } from '../../wallet';
import {
  addGas,
  blockchainFetch,
  calculateTransactionFeeAmount,
  prepareQueryBody,
} from '../api-utils';
import {
  CreateDelegationRequest,
  CreateRedelegationRequest,
  CreateUnbondingDelegationRequest,
  Delegation,
  DelegationBroadcastOptions,
  Pool,
  QueryCreateDelegationResponse,
  QueryCreateRedelegationResponse,
  QueryCreateUnbondingDelegationResponse,
  Redelegation,
  StakingParameters,
  UnbondingDelegation,
  Validator,
  ValidatorsFilterParameters,
  ValidatorStatus,
} from './types';
import { fetchJson } from '../../utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Fee, StdTxMessageType } from '../types';
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

function getCreateDelegationUrl(apiUrl: string, delegatorAddress: Wallet['address']): string {
  return `${apiUrl}/staking/delegators/${delegatorAddress}/delegations`;
}

async function queryCreateDelegation(
  apiUrl: string,
  chainId: string,
  delegation: CreateDelegationRequest,
): Promise<QueryCreateDelegationResponse> {
  const url = getCreateDelegationUrl(apiUrl, delegation.delegator_address);

  const body = await addGas(delegation, chainId, url, delegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateCreateDelegationFee(
  apiUrl: string,
  chainId: string,
  delegation: CreateUnbondingDelegationRequest,
): Promise<Fee[]> {
  const url = getCreateDelegationUrl(apiUrl, delegation.delegator_address);

  const queryBody = await prepareQueryBody(
    url,
    chainId,
    delegation,
    delegation.delegator_address,
  );

  return calculateTransactionFeeAmount(apiUrl, queryBody.base_req.gas as string);
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

function getCreateUnbondingDelegationUrl(apiUrl: string, delegatorAddress: Wallet['address']): string {
  return `${apiUrl}/staking/delegators/${delegatorAddress}/unbonding_delegations`;
}

async function queryCreateUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
): Promise<QueryCreateUnbondingDelegationResponse> {
  const url = getCreateUnbondingDelegationUrl(apiUrl, unbondingDelegation.delegator_address);

  const body = await addGas(unbondingDelegation, chainId, url, unbondingDelegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateCreateUnbondingDelegationFee(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
): Promise<Fee[]> {
  const url = getCreateUnbondingDelegationUrl(apiUrl, unbondingDelegation.delegator_address);

  const queryBody = await prepareQueryBody(
    url,
    chainId,
    unbondingDelegation,
    unbondingDelegation.delegator_address,
  );

  return calculateTransactionFeeAmount(apiUrl, queryBody.base_req.gas as string);
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
): Promise<BroadcastResponse<StdTxMessageType.CosmosUndelegate>>;

export async function createUnbondingDelegation(
  apiUrl: string,
  chainId: string,
  unbondingDelegation: CreateUnbondingDelegationRequest,
  broadcastOptions?: DelegationBroadcastOptions,
): Promise<QueryCreateUnbondingDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosUndelegate>> {
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

function getCreateRedelegationUrl(apiUrl: string, delegatorAddress: Wallet['address']): string {
  return `${apiUrl}/staking/delegators/${delegatorAddress}/redelegations`;
}

async function queryCreateRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
): Promise<QueryCreateRedelegationResponse> {
  const url = getCreateRedelegationUrl(apiUrl, redelegation.delegator_address);

  const body = await prepareQueryBody(url, chainId, redelegation, redelegation.delegator_address);

  return fetchJson(url, { method: 'POST', body });
}

export async function calculateCreateRedelegationFee(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
): Promise<Fee[]> {
  const url = getCreateRedelegationUrl(apiUrl, redelegation.delegator_address);

  const queryBody = await prepareQueryBody(
    url,
    chainId,
    redelegation,
    redelegation.delegator_address,
  );

  return calculateTransactionFeeAmount(apiUrl, queryBody.base_req.gas as string);
}

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
): Promise<QueryCreateRedelegationResponse>;

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
  broadcastOptions: DelegationBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CosmosBeginRedelegate>>;

export async function createRedelegation(
  apiUrl: string,
  chainId: string,
  redelegation: CreateRedelegationRequest,
  broadcastOptions?: DelegationBroadcastOptions,
): Promise<QueryCreateRedelegationResponse | BroadcastResponse<StdTxMessageType.CosmosBeginRedelegate>> {
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
