import { Wallet } from '../../wallet';
import { DenomAmount, StdTxMessageType, StdTxResponse } from '../types';
import { BroadcastOptions } from '../messages';

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
  balance: DenomAmount;
}

export type QueryCreateDelegationResponse = StdTxResponse<StdTxMessageType.CosmosDelegate>;

export interface DelegationBroadcastOptions extends BroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
}

export interface CreateDelegationRequest
  extends Pick<Delegation, 'delegator_address' | 'validator_address'>
{
  amount: Delegation['balance'];
}

export interface UnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  initial_balance: string;
  balance: string;
  creation_height: number;
  min_time: number;
}

export type QueryCreateUnbondingDelegationResponse = StdTxResponse<StdTxMessageType.CosmosUndelegate>;

export interface CreateUnbondingDelegationRequest
  extends Pick<UnbondingDelegation, 'delegator_address' | 'validator_address'>
{
  amount: Delegation['balance'];
}

interface RedelegationEntry {
  creation_height: number;
  completion_time: string;
  initial_balance: string;
  shares_dst: string;
  balance: string;
}

export interface Redelegation {
  delegator_address: Wallet['address'];
  validator_src_address: Validator['operator_address'];
  validator_dst_address: Validator['operator_address'];
  entries: RedelegationEntry[];
}

export type QueryCreateRedelegationResponse = StdTxResponse<StdTxMessageType.CosmosBeginRedelegate>;

export interface CreateRedelegationRequest
  extends Omit<Redelegation, 'entries'>
{
  amount: Delegation['balance'];
}

export interface RedelegationsFilterParameters {
  delegator?: Wallet['address'];
  validator_from?: Validator['operator_address'];
  validator_to?: Validator['operator_address'];
}

export interface StakingParameters {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
}
