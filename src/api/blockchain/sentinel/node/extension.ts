import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Node } from '../../../../codec/sentinel/node/v1/node';
import { Params } from '../../../../codec/sentinel/node/v1/params';
import {
  QueryNodeRequest,
  QueryNodesForProviderRequest,
  QueryNodesRequest,
  QueryParamsRequest,
  QueryServiceClientImpl,
} from '../../../../codec/sentinel/node/v1/querier';

export interface NodeExtension {
  readonly node: {
    readonly getNodes: (request: QueryNodesRequest) => Promise<Node[]>;
    readonly getNodesForProvider: (request: QueryNodesForProviderRequest) => Promise<Node[]>;
    readonly getNode: (request: QueryNodeRequest) => Promise<Node | undefined>;
    readonly getParams: (request: QueryParamsRequest) => Promise<Params>;
  };
}

export function setupNodeExtension(base: QueryClient): NodeExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    node: {
      getNodes: (request: QueryNodesRequest) => queryService.QueryNodes(request)
        .then((response) => response.nodes),

      getNodesForProvider: (request: QueryNodesForProviderRequest) => queryService.QueryNodesForProvider(request)
        .then((response) => response.nodes),

      getNode: (request: QueryNodeRequest) => queryService.QueryNode(request)
        .then((response) => response.node),

      getParams: (request: QueryParamsRequest) => queryService.QueryParams(request)
        .then((response) => response.params as Params),
    },
  };
}
