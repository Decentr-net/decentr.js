import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import Long from 'long';

import { PageRequest } from '../../../../codec/cosmos/base/query/v1beta1/pagination';
import { Node } from '../../../../codec/sentinel/node/v1/node';
import { Params } from '../../../../codec/sentinel/node/v1/params';
import { QueryNodesForProviderRequest } from '../../../../codec/sentinel/node/v1/querier';
import { Status } from '../../../../codec/sentinel/types/v1/status';
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

  public getNodes(status: Status): Promise<Node[]> {
    const pagination = PageRequest.fromPartial({
      limit: Long.fromValue('10000'),
    });

    return this.queryClient.node.getNodes({
      status,
      pagination,
    });
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
