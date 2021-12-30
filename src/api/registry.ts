import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { MsgDeposit, MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';
import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes } from '@cosmjs/stargate';

import {
  MsgCreatePost,
  MsgDeletePost,
  MsgFollow,
  MsgSetLike,
  MsgUnfollow,
} from '../codec/community/tx';
import { MsgResetAccount } from '../codec/operations/tx';

export enum TxMessageTypeUrl {
  BankSend = '/cosmos.bank.v1beta1.MsgSend',
  CommunityCreatePost = '/decentr.community.MsgCreatePost',
  CommunityDeletePost = '/decentr.community.MsgDeletePost',
  CommunityFollow = '/decentr.community.MsgFollow',
  CommunitySetLike = '/decentr.community.MsgSetLike',
  CommunityUnfollow = '/decentr.community.MsgUnfollow',
  DistributionFundCommunityPool = '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
  DistributionSetWithdrawAddress = '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  DistributionWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  DistributionWithdrawValidatorCommission = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
  GovDeposit = '/cosmos.gov.v1beta1.MsgDeposit',
  GovVote = '/cosmos.gov.v1beta1.MsgVote',
  OperationsResetAccount = '/decentr.operations.MsgResetAccount',
  StakingBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  StakingCreateValidator = '/cosmos.staking.v1beta1.MsgCreateValidator',
  StakingDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
  StakingEditValidator = '/cosmos.staking.v1beta1.MsgEditValidator',
  StakingUndelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
}

const REGISTRY_MAP: Record<TxMessageTypeUrl, GeneratedType> = {
  [TxMessageTypeUrl.BankSend]: MsgSend,
  [TxMessageTypeUrl.CommunityCreatePost]: MsgCreatePost,
  [TxMessageTypeUrl.CommunityDeletePost]: MsgDeletePost,
  [TxMessageTypeUrl.CommunityFollow]: MsgFollow,
  [TxMessageTypeUrl.CommunitySetLike]: MsgSetLike,
  [TxMessageTypeUrl.CommunityUnfollow]: MsgUnfollow,
  [TxMessageTypeUrl.DistributionFundCommunityPool]: MsgFundCommunityPool,
  [TxMessageTypeUrl.DistributionSetWithdrawAddress]: MsgSetWithdrawAddress,
  [TxMessageTypeUrl.DistributionWithdrawDelegatorReward]: MsgWithdrawDelegatorReward,
  [TxMessageTypeUrl.DistributionWithdrawValidatorCommission]: MsgWithdrawValidatorCommission,
  [TxMessageTypeUrl.GovDeposit]: MsgDeposit,
  [TxMessageTypeUrl.GovVote]: MsgVote,
  [TxMessageTypeUrl.OperationsResetAccount]: MsgResetAccount,
  [TxMessageTypeUrl.StakingBeginRedelegate]: MsgBeginRedelegate,
  [TxMessageTypeUrl.StakingCreateValidator]: MsgCreateValidator,
  [TxMessageTypeUrl.StakingDelegate]: MsgDelegate,
  [TxMessageTypeUrl.StakingEditValidator]: MsgEditValidator,
  [TxMessageTypeUrl.StakingUndelegate]: MsgUndelegate,
};

export interface TxMessageValueMap {
  [TxMessageTypeUrl.BankSend]: MsgSend,
  [TxMessageTypeUrl.CommunityCreatePost]: MsgCreatePost,
  [TxMessageTypeUrl.CommunityDeletePost]: MsgDeletePost,
  [TxMessageTypeUrl.CommunityFollow]: MsgFollow,
  [TxMessageTypeUrl.CommunitySetLike]: MsgSetLike,
  [TxMessageTypeUrl.CommunityUnfollow]: MsgUnfollow,
  [TxMessageTypeUrl.DistributionFundCommunityPool]: MsgFundCommunityPool,
  [TxMessageTypeUrl.DistributionSetWithdrawAddress]: MsgSetWithdrawAddress,
  [TxMessageTypeUrl.DistributionWithdrawDelegatorReward]: MsgWithdrawDelegatorReward,
  [TxMessageTypeUrl.DistributionWithdrawValidatorCommission]: MsgWithdrawValidatorCommission,
  [TxMessageTypeUrl.GovDeposit]: MsgDeposit,
  [TxMessageTypeUrl.GovVote]: MsgVote,
  [TxMessageTypeUrl.OperationsResetAccount]: MsgResetAccount,
  [TxMessageTypeUrl.StakingBeginRedelegate]: MsgBeginRedelegate,
  [TxMessageTypeUrl.StakingCreateValidator]: MsgCreateValidator,
  [TxMessageTypeUrl.StakingDelegate]: MsgDelegate,
  [TxMessageTypeUrl.StakingEditValidator]: MsgEditValidator,
  [TxMessageTypeUrl.StakingUndelegate]: MsgUndelegate,
}

export interface TypedEncodeObject<K extends keyof TxMessageValueMap> {
  typeUrl: K;
  value: TxMessageValueMap[K];
}

export const REGISTRY = new Registry([
  ...defaultRegistryTypes,
  ...Object.entries(REGISTRY_MAP),
]);
