import {
  MsgSetWithdrawAddress,
  MsgWithdrawValidatorCommission,
  MsgWithdrawDelegatorReward,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';

export type SetWithdrawAddressRequest = MsgSetWithdrawAddress;
export type WithdrawValidatorCommissionRequest = MsgWithdrawValidatorCommission;
export type WithdrawDelegatorRewardRequest = MsgWithdrawDelegatorReward[];
