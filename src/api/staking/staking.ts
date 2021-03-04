import { Validator, ValidatorsFilterParams } from './types';
import { blockchainFetch } from '../api-utils';

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
