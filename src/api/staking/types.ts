import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';

export type DelegateTokensRequest = MsgDelegate;
export type UndelegateTokensRequest = MsgUndelegate;
export type RedelegateTokensRequest = MsgBeginRedelegate;
