import { Wallet } from '../../wallet';

export interface Pool {
  not_bonded_tokens: number;
  bonded_tokens: number;
}

export enum ValidatorStatus {
  Unbonded,
  Unbonding,
  Bonded,
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

export interface Validator {
  commission: ValidatorCommission;
  consensus_pubkey: string;
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
  delegator_address: Wallet['address'],
  validator_address: Validator['operator_address'];
  shares: string;
  balance: {
    denom: string;
    amount: string;
  };
}

export interface UnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  initial_balance: string;
  balance: string;
  creation_height: number;
  min_time: number;
}

export interface Redelegation {
  delegator_address: Wallet['address'];
  validator_src_address: Validator['operator_address'];
  validator_dst_address: Validator['operator_address'];
  entries: unknown[];
}

// interface SubmitDelegationTx {
//   code: string;
//   data: string;
//   log: string;
//   gas_used: number;
//   gas_wanted: number;
//   info: string;
//   tags: string[];
// }
//
// export interface SubmitDelegationResponse {
//   check_tx: SubmitDelegationTx;
//   deliver_tx: SubmitDelegationTx;
//   hash: string;
//   height: number;
// }

export interface StakingParameters {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
}
