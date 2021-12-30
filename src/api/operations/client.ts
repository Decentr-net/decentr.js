import { Coin, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { createSignerOrSimulator, createTypedEncodeObject, SignerOrSimulator } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { OperationsExtension, setupOperationsExtension } from './extension';
import { ResetAccountRequest } from './types';

export class DecentrOperationsClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & OperationsExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrOperationsClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupOperationsExtension,
    );

    return new DecentrOperationsClient(nodeUrl, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getMinGasPrice(): Promise<Coin> {
    return this.queryClient.operations.getMinGasPrice();
  }

  public resetAccount(
    request: ResetAccountRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.OperationsResetAccount,
      request,
    );

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }
}
