import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Params } from '../../../../codec/sentinel/provider/v1/params';
import { Provider } from '../../../../codec/sentinel/provider/v1/provider';
import {
  QueryParamsRequest,
  QueryProviderRequest,
  QueryProvidersRequest,
} from '../../../../codec/sentinel/provider/v1/querier';
import { setupProviderExtension } from './extension';

export class ProviderClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupProviderExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getProviders(request: QueryProvidersRequest): Promise<Provider[]> {
    return this.queryClient.provider.getProviders(request);
  }

  public getProvider(request: QueryProviderRequest): Promise<Provider | undefined> {
    return this.queryClient.provider.getProvider(request);
  }

  public getParams(request: QueryParamsRequest): Promise<Params | undefined> {
    return this.queryClient.provider.getParams(request);
  }
}
