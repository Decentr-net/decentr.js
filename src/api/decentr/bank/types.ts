import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';

export type SendTokensRequest = MsgSend;

export type SendIbcTokensRequest = Required<Omit<MsgTransfer, 'timeoutTimestamp' | 'timeoutHeight'>> & {
  timeoutSec: number;
};
