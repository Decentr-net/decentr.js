import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';
import { StdTxMessageType, StdTxResponse } from '../types';

export type QueryResetAccountResponse = StdTxResponse<StdTxMessageType.OperationsResetAccount>;

export interface ResetAccountBroadcastOptions extends BroadcastOptions {
  readonly broadcast: true;
  readonly privateKey: Wallet['privateKey'];
}
