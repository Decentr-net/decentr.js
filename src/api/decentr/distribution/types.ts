import {
  MsgSetWithdrawAddress,
  MsgWithdrawValidatorCommission,
  MsgWithdrawDelegatorReward,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';

export { Params as DistributionParams } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
export {
  QueryDelegationRewardsResponse,
  QueryDelegationTotalRewardsResponse,
} from 'cosmjs-types/cosmos/distribution/v1beta1/query';

export type SetWithdrawAddressRequest = MsgSetWithdrawAddress;
export type WithdrawValidatorCommissionRequest = MsgWithdrawValidatorCommission;
export type WithdrawDelegatorRewardRequest = MsgWithdrawDelegatorReward[];
