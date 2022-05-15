import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Node } from '../../../../codec/sentinel/node/v1/node';
import { Plan } from '../../../../codec/sentinel/plan/v1/plan';
import {
  QueryNodesForPlanRequest,
  QueryPlanRequest,
  QueryPlansForProviderRequest,
  QueryPlansRequest,
  QueryServiceClientImpl,
} from '../../../../codec/sentinel/plan/v1/querier';

export interface PlanExtension {
  readonly plan: {
    readonly getPlans: (request: QueryPlansRequest) => Promise<Plan[]>;
    readonly getPlansForProvider: (request: QueryPlansForProviderRequest) => Promise<Plan[]>;
    readonly getPlan: (request: QueryPlanRequest) => Promise<Plan | undefined>;
    readonly getNodesForPlan: (request: QueryNodesForPlanRequest) => Promise<Node[]>;
  };
}

export function setupPlanExtension(base: QueryClient): PlanExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    plan: {
      getPlans: (request: QueryPlansRequest) => queryService.QueryPlans(request)
        .then((response) => response.plans),

      getPlansForProvider: (request: QueryPlansForProviderRequest) => queryService.QueryPlansForProvider(request)
        .then((response) => response.plans),

      getPlan: (request: QueryPlanRequest) => queryService.QueryPlan(request)
        .then((response) => response.plan),

      getNodesForPlan: (request: QueryNodesForPlanRequest) => queryService.QueryNodesForPlan(request)
        .then((response) => response.nodes),
    },
  };
}
