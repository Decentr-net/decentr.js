import { Wallet } from '../../wallet';
import { blockchainFetch } from '../api-utils';
import {
  Delegation,
  Pool,
  Redelegation,
  StakingParameters,
  UnbondingDelegation,
  Validator,
  ValidatorsFilterParameters,
  ValidatorStatus,
} from './types';

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

// export function submitDelegation(
//   apiUrl: string,
//   delegation: Omit<Delegation, 'shares'>,
// ): Promise<SubmitDelegationResponse> {
//   const body = createBaseRequest();
//
//   return fetchJson(
//     `${apiUrl}/staking/delegators/${delegation.delegator_address}/delegations`,
//     {
//       method: 'POST',
//     },
//   )
// }

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
