import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
import {
  QueryParamsRequest, QueryServiceClientImpl,
  QuerySwapRequest,
  QuerySwapsRequest
} from '../../../../codec/sentinel/swap/v1/querier';
import { Swap } from '../../../../codec/sentinel/swap/v1/swap';
import { Params } from '../../../../codec/sentinel/swap/v1/params';

export interface SwapExtension {
  readonly swap: {
    readonly getSwaps: (request: QuerySwapsRequest) => Promise<Swap[]>;
    readonly getSwap: (request: QuerySwapRequest) => Promise<Swap | undefined>;
    readonly getParams: (request: QueryParamsRequest) => Promise<Params | undefined>;
  };
}

export function setupSwapExtension(base: QueryClient): SwapExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    swap: {
      getSwaps: (request: QuerySwapsRequest) => queryService.QuerySwaps(request)
        .then((response) => response.swaps),

      getSwap: (request: QuerySwapRequest) => queryService.QuerySwap(request)
        .then((response) => response.swap),

      getParams: (request: QueryParamsRequest) => queryService.QueryParams(request)
        .then((response) => response.params),
    },
  };
}
