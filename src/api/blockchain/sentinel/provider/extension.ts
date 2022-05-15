import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Params } from '../../../../codec/sentinel/provider/v1/params';
import { Provider } from '../../../../codec/sentinel/provider/v1/provider';
import {
  QueryParamsRequest,
  QueryProviderRequest,
  QueryProvidersRequest,
  QueryServiceClientImpl,
} from '../../../../codec/sentinel/provider/v1/querier';

export interface ProviderExtension {
  readonly provider: {
    readonly getProviders: (request: QueryProvidersRequest) => Promise<Provider[]>;
    readonly getProvider: (request: QueryProviderRequest) => Promise<Provider | undefined>;
    readonly getParams: (request: QueryParamsRequest) => Promise<Params | undefined>;
  };
}

export function setupProviderExtension(base: QueryClient): ProviderExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    provider: {
      getProviders: (request: QueryProvidersRequest) => queryService.QueryProviders(request)
        .then((response) => response.providers),

      getProvider: (request: QueryProviderRequest) => queryService.QueryProvider(request)
        .then((response) => response.provider),

      getParams: (request: QueryParamsRequest) => queryService.QueryParams(request)
        .then((response) => response.params),
    },
  };
}
