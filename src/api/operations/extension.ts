import { Coin, createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { QueryClientImpl } from '../../codec/operations/query';

export interface OperationsExtension {
  readonly operations: {
    readonly getMinGasPrice: () => Promise<Coin>;
  };
}

export function setupOperationsExtension(base: QueryClient): OperationsExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryClientImpl(rpcClient);

  return {
    operations: {
      getMinGasPrice: () => queryService.MinGasPrice({})
        .then((response) => response.minGasPrice as Coin),
    },
  };
}
