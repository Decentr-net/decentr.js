export type ValidatorStatusFilterParam = 'unbonding' | 'bonded' | 'unbonded';

export interface ValidatorsFilterParams {
  status?: ValidatorStatusFilterParam;
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
  status: number;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
}