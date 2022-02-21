import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';

export { BondStatusString } from '@cosmjs/stargate/build/queries/staking';

export {
  BondStatus,
  DelegationResponse,
  Params as StakingParams,
  Pool,
  RedelegationResponse,
  RedelegationEntry,
  UnbondingDelegation,
  UnbondingDelegationEntry,
  Validator,
} from 'cosmjs-types/cosmos/staking/v1beta1/staking';

export type DelegateTokensRequest = MsgDelegate;
export type UndelegateTokensRequest = MsgUndelegate;
export type RedelegateTokensRequest = MsgBeginRedelegate;