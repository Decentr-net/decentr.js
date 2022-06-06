import { Coin, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { correctDecodedCoin } from '../../../../utils';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { setupOperationsExtension } from './extension';
import { ResetAccountRequest } from './types';

export class OperationsClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupOperationsExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getMinGasPrice(): Promise<Coin> {
    return this.queryClient.operations.getMinGasPrice()
      .then(correctDecodedCoin);
  }

  public resetAccount(
    request: ResetAccountRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.OperationsResetAccount,
      request,
    );

    return this.transactionSignerFactory(message);
  }
}
