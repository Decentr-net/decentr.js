import { BroadcastTxResponse, Coin } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';
import { getMinGasPrice, resetAccount } from './api';

export class DecentrOperationsSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getMinGasPrice(): Promise<Coin> {
    return getMinGasPrice(this.nodeUrl);
  }

  public resetAccount(
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return resetAccount(
      this.nodeUrl,
      privateKey,
    );
  }
}
