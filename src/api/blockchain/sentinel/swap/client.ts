import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { QueryClient } from '@cosmjs/stargate';

import {
  QueryParamsRequest,
  QuerySwapRequest,
  QuerySwapsRequest,
} from '../../../../codec/sentinel/swap/v1/querier';
import { Params } from '../../../../codec/sentinel/swap/v1/params';
import { Swap } from '../../../../codec/sentinel/swap/v1/swap';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { setupSwapExtension } from './extension';
import { SwapRequest } from './types';

export class SwapClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupSwapExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getSwaps(request: QuerySwapsRequest): Promise<Swap[]> {
    return this.queryClient.swap.getSwaps(request);
  }

  public getSwap(request: QuerySwapRequest): Promise<Swap | undefined> {
    return this.queryClient.swap.getSwap(request);
  }

  public getParams(request: QueryParamsRequest): Promise<Params | undefined> {
    return this.queryClient.swap.getParams(request);
  }

  public swap(
    request: SwapRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.Swap,
      request,
    );

    return this.transactionSignerFactory(message);
  }
}
