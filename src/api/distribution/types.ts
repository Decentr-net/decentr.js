import { Validator } from '../staking';
import { DenomAmount } from '../types';
import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';

export interface DelegatorRewards {
  rewards: {
    validator_address: Validator['operator_address'];
    reward: DenomAmount[];
  }[];
  total: DenomAmount[];
}

export interface ValidatorDistribution {
  operator_address: Wallet['address'];
  self_bond_rewards: DenomAmount[];
  val_commission: DenomAmount[];
}

export interface DistributionParameters {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}

export interface DistributionBroadcastOptions extends BroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
}

