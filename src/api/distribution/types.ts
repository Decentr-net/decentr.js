import { Coin } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';
import { Validator } from '../staking';

export interface DelegatorRewards {
  rewards: {
    validator_address: Validator['operator_address'];
    reward: Coin[];
  }[];
  total: Coin[];
}

export interface ValidatorDistribution {
  operator_address: Wallet['address'];
  self_bond_rewards: Coin[];
  val_commission: Coin[];
}

export interface DistributionParameters {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}

