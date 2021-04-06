import { Pool, Validator, ValidatorsFilterParameters, ValidatorStatus } from './types';
import { blockchainFetch } from '../api-utils';

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
