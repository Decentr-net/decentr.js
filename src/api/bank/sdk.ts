import { Wallet } from '../../wallet';
import { BroadcastResponse } from '../messages';
import { getBankBalances, sendCoin } from './bank';
import { StdTxMessageType } from '../types';
import {
  BankBroadcastOptions,
  BankCoin,
  QueryTransferResponse,
  TransferData,
} from './types';

export class DecentrBankSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getBankBalances(
    walletAddress: Wallet['address'],
  ): Promise<BankCoin[]> {
    return getBankBalances(
      this.apiUrl,
      walletAddress,
    );
  }

  public sendCoin(
    transferData: TransferData,
  ): Promise<QueryTransferResponse>;

  public sendCoin(
    transferData: TransferData,
    broadcastOptions: BankBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosSend>>;

  public sendCoin(
    transferData: TransferData,
    broadcastOptions?: BankBroadcastOptions,
  ): Promise<QueryTransferResponse | BroadcastResponse<StdTxMessageType.CosmosSend>> {
    return sendCoin(
      this.apiUrl,
      this.chainId,
      transferData,
      broadcastOptions as BankBroadcastOptions,
    );
  }
}
