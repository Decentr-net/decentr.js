import { Pool, Validator, ValidatorsFilterParams } from './types';
import { blockchainFetch } from '../api-utils';

export function getPool(
  apiUrl: string,
): Promise<Pool> {
  return blockchainFetch(`${apiUrl}/staking/pool`);
}

export function getValidators(
  apiUrl: string,
  filter?: ValidatorsFilterParams,
): Promise<Validator[]> {
  return blockchainFetch(`${apiUrl}/staking/validators`, filter as {});
}

export function getValidator(
  apiUrl: string,
  address: Validator['operator_address'],
): Promise<Validator> {
  return blockchainFetch(`${apiUrl}/staking/validators/${address}`);
}
