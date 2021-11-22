import { Coin } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';

export interface Pool {
  not_bonded_tokens: string;
  bonded_tokens: string;
}

export enum ValidatorStatus {
  Unbonded = 'BOND_STATUS_UNBONDED',
  Unbonding = 'BOND_STATUS_UNBONDING',
  Bonded = 'BOND_STATUS_BONDED',
}

export interface ValidatorsFilterParameters {
  status?: ValidatorStatus;
}

export interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export interface ValidatorCommission {
  commission_rates: {
    rate: string;
    max_rate: string;
    max_change_rate: string;
  }
  update_time: string;
}

export interface ValidatorConsensusPubKey {
  '@type': string;
  key: string;
}

export interface Validator {
  commission: ValidatorCommission;
  consensus_pubkey: ValidatorConsensusPubKey;
  delegator_shares: string;
  description: ValidatorDescription;
  jailed: boolean;
  min_self_delegation: string;
  operator_address: string;
  status: ValidatorStatus;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
}

export interface Delegation {
  delegation: {
    delegator_address: Wallet['address'];
    validator_address: Validator['operator_address'];
    shares: string;
  };
  balance: Coin;
}

interface UnbondingDelegationEntry {
  creation_height: number;
  completion_time: string;
  initial_balance: string;
  balance: string;
}

export interface UnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  entries: UnbondingDelegationEntry[];
}

interface RedelegationEntry {
  creation_height: number;
  completion_time: string;
  initial_balance: string;
  shares_dst: string;
}

export interface Redelegation {
  redelegation: {
    delegator_address: Wallet['address'];
    entries: RedelegationEntry[];
    validator_src_address: Validator['operator_address'];
    validator_dst_address: Validator['operator_address'];
  };
  entries: {
    redelegation_entry: RedelegationEntry;
    balance: string;
  }[];
}

export interface RedelegationsFilterParameters {
  validatorSrcAddress?: Validator['operator_address'];
  validatorDstAddress?: Validator['operator_address'];
}

export interface StakingParameters {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
}

export interface DelegateTokensOptions {
  readonly amount: number | string;
  readonly comment?: string;
  readonly denom?: string;
  readonly validatorAddress: Validator['operator_address'];
}

export interface UndelegateTokensOptions {
  readonly amount: number | string;
  readonly comment?: string;
  readonly denom?: string;
  readonly validatorAddress: Validator['operator_address'];
}

export interface RedelegateTokensOptions {
  readonly amount: number | string;
  readonly comment?: string;
  readonly denom?: string;
  readonly validatorSrcAddress: Validator['operator_address'];
  readonly validatorDstAddress: Validator['operator_address'];
}
