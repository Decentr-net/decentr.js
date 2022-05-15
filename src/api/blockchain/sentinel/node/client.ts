import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Node } from '../../../../codec/sentinel/node/v1/node';
import { Params } from '../../../../codec/sentinel/node/v1/params';
import {
  QueryNodesForProviderRequest,
  QueryNodesRequest,
} from '../../../../codec/sentinel/node/v1/querier';
import { Wallet } from '../../../../wallet';
import { setupNodeExtension } from './extension';

export class NodeClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupNodeExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getNodes(request: QueryNodesRequest): Promise<Node[]> {
    return this.queryClient.node.getNodes(request);
  }

  public getNodesForProvider(request: QueryNodesForProviderRequest): Promise<Node[]> {
    return this.queryClient.node.getNodesForProvider(request);
  }

  public getNode(address: Wallet['address']): Promise<Node | undefined> {
    return this.queryClient.node.getNode({ address });
  }

  public getParams(): Promise<Params> {
    return this.queryClient.node.getParams({ });
  }
}
