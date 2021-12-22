import { BroadcastTxResponse, Coin, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { MsgResetAccount } from '../../../codec/operations/tx';
import { Wallet } from '../../wallet';
import { signAndBroadcast } from '../api-utils';
import { getMinGasPrice } from './api';
import { OperationsExtension, setupOperationsExtension } from './extension';
import { MessageTypeUrl, REGISTRY } from './registry';

export class DecentrOperationsSDK {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & OperationsExtension,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrOperationsSDK> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupOperationsExtension,
    );

    return new DecentrOperationsSDK(nodeUrl, queryClient);
  }

  public getMinGasPrice(): Promise<Coin> {
    return this.queryClient.operations.getMinGasPrice();
  }

  public async resetAccount(
    request: MsgResetAccount,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.ResetAccount,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }
}
