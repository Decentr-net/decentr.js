import { GeneratedType } from '@cosmjs/proto-signing';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { MsgAcknowledgement } from 'cosmjs-types/ibc/core/channel/v1/tx';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';
import { MsgUpdateClient } from 'cosmjs-types/ibc/core/client/v1/tx';
import { MsgDeposit, MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { MsgUnjail } from 'cosmjs-types/cosmos/slashing/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';

export enum TxMessageTypeUrl {
  BankSend = '/cosmos.bank.v1beta1.MsgSend',
  DistributionFundCommunityPool = '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
  DistributionSetWithdrawAddress = '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
  DistributionWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  DistributionWithdrawValidatorCommission = '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
  GovDeposit = '/cosmos.gov.v1beta1.MsgDeposit',
  GovVote = '/cosmos.gov.v1beta1.MsgVote',
  IbcMsgAcknowledgement = '/ibc.core.channel.v1.MsgAcknowledgement',
  IbcMsgTransfer = '/ibc.applications.transfer.v1.MsgTransfer',
  IbcMsgUpdateClient = '/ibc.core.client.v1.MsgUpdateClient',
  SlashingUnjail = '/cosmos.slashing.v1beta1.MsgUnjail',
  StakingBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  StakingCreateValidator = '/cosmos.staking.v1beta1.MsgCreateValidator',
  StakingDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
  StakingEditValidator = '/cosmos.staking.v1beta1.MsgEditValidator',
  StakingUndelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
}

export const REGISTRY_MAP: Record<TxMessageTypeUrl, GeneratedType> = {
  [TxMessageTypeUrl.BankSend]: MsgSend,
  [TxMessageTypeUrl.DistributionFundCommunityPool]: MsgFundCommunityPool,
  [TxMessageTypeUrl.DistributionSetWithdrawAddress]: MsgSetWithdrawAddress,
  [TxMessageTypeUrl.DistributionWithdrawDelegatorReward]: MsgWithdrawDelegatorReward,
  [TxMessageTypeUrl.DistributionWithdrawValidatorCommission]: MsgWithdrawValidatorCommission,
  [TxMessageTypeUrl.IbcMsgAcknowledgement]: MsgAcknowledgement,
  [TxMessageTypeUrl.IbcMsgTransfer]: MsgTransfer,
  [TxMessageTypeUrl.IbcMsgUpdateClient]: MsgUpdateClient,
  [TxMessageTypeUrl.GovDeposit]: MsgDeposit,
  [TxMessageTypeUrl.GovVote]: MsgVote,
  [TxMessageTypeUrl.SlashingUnjail]: MsgUnjail,
  [TxMessageTypeUrl.StakingBeginRedelegate]: MsgBeginRedelegate,
  [TxMessageTypeUrl.StakingCreateValidator]: MsgCreateValidator,
  [TxMessageTypeUrl.StakingDelegate]: MsgDelegate,
  [TxMessageTypeUrl.StakingEditValidator]: MsgEditValidator,
  [TxMessageTypeUrl.StakingUndelegate]: MsgUndelegate,
};

export interface TxMessageValueMap {
  [TxMessageTypeUrl.BankSend]: MsgSend,
  [TxMessageTypeUrl.DistributionFundCommunityPool]: MsgFundCommunityPool,
  [TxMessageTypeUrl.DistributionSetWithdrawAddress]: MsgSetWithdrawAddress,
  [TxMessageTypeUrl.DistributionWithdrawDelegatorReward]: MsgWithdrawDelegatorReward,
  [TxMessageTypeUrl.DistributionWithdrawValidatorCommission]: MsgWithdrawValidatorCommission,
  [TxMessageTypeUrl.IbcMsgAcknowledgement]: MsgAcknowledgement,
  [TxMessageTypeUrl.IbcMsgTransfer]: MsgTransfer,
  [TxMessageTypeUrl.IbcMsgUpdateClient]: MsgUpdateClient,
  [TxMessageTypeUrl.GovDeposit]: MsgDeposit,
  [TxMessageTypeUrl.GovVote]: MsgVote,
  [TxMessageTypeUrl.SlashingUnjail]: MsgUnjail,
  [TxMessageTypeUrl.StakingBeginRedelegate]: MsgBeginRedelegate,
  [TxMessageTypeUrl.StakingCreateValidator]: MsgCreateValidator,
  [TxMessageTypeUrl.StakingDelegate]: MsgDelegate,
  [TxMessageTypeUrl.StakingEditValidator]: MsgEditValidator,
  [TxMessageTypeUrl.StakingUndelegate]: MsgUndelegate,
}
