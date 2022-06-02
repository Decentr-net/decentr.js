import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Plan } from '../../../../codec/sentinel/plan/v1/plan';
import { Node } from '../../../../codec/sentinel/node/v1/node';
import { setupPlanExtension } from './extension';
import {
  QueryNodesForPlanRequest,
  QueryPlanRequest,
  QueryPlansForProviderRequest,
  QueryPlansRequest,
} from '../../../../codec/sentinel/plan/v1/querier';

export class PlanClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupPlanExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getPlans(request: QueryPlansRequest): Promise<Plan[]> {
    return this.queryClient.plan.getPlans(request);
  }

  public getPlansForProvider(request: QueryPlansForProviderRequest): Promise<Plan[]> {
    return this.queryClient.plan.getPlansForProvider(request);
  }

  public getPlan(request: QueryPlanRequest): Promise<Plan | undefined> {
    return this.queryClient.plan.getPlan(request);
  }

  public getNodesForPlan(request: QueryNodesForPlanRequest): Promise<Node[]> {
    return this.queryClient.plan.getNodesForPlan(request);
  }
}
