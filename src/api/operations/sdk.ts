import { Wallet } from '../../wallet';
import { BroadcastResponse } from '../messages';
import { Fee, StdTxMessageType } from '../types';
import { getMinGasPrice, resetAccount } from './operations';
import { QueryResetAccountResponse, ResetAccountBroadcastOptions } from './types';

export class DecentrOperationsSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getMinGasPrice(): Promise<Fee> {
    return getMinGasPrice(this.apiUrl);
  }

  public resetAccount(
    walletAddress: Wallet['address'],
    initiator: Wallet['address'],
  ): Promise<QueryResetAccountResponse>;

  public resetAccount(
    walletAddress: Wallet['address'],
    initiator: Wallet['address'],
    broadcastOptions: ResetAccountBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.OperationsResetAccount>>;

  public resetAccount(
    walletAddress: Wallet['address'],
    initiator: Wallet['address'],
    broadcastOptions?: ResetAccountBroadcastOptions,
  ): Promise<QueryResetAccountResponse | BroadcastResponse<StdTxMessageType.OperationsResetAccount>> {
    return resetAccount(
      this.apiUrl,
      this.chainId,
      walletAddress,
      initiator,
      broadcastOptions as ResetAccountBroadcastOptions,
    );
  }
}
