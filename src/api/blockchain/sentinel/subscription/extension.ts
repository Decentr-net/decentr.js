import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Params } from '../../../../codec/sentinel/subscription/v1/params';
import { Quota } from '../../../../codec/sentinel/subscription/v1/quota';
import { Subscription } from '../../../../codec/sentinel/subscription/v1/subscription';
import {
  QueryParamsRequest,
  QueryQuotaRequest,
  QueryQuotasRequest,
  QueryServiceClientImpl,
  QuerySubscriptionRequest,
  QuerySubscriptionsForAddressRequest,
  QuerySubscriptionsRequest,
} from '../../../../codec/sentinel/subscription/v1/querier';

export interface SubscriptionExtension {
  readonly subscription: {
    readonly getSubscriptions: (request: QuerySubscriptionsRequest) => Promise<Subscription[]>;
    readonly getSubscriptionsForAddress: (request: QuerySubscriptionsForAddressRequest) => Promise<Subscription[]>;
    readonly getSubscription: (request: QuerySubscriptionRequest) => Promise<Subscription | undefined>;
    readonly getQuotas: (request: QueryQuotasRequest) => Promise<Quota[]>;
    readonly getQuota: (request: QueryQuotaRequest) => Promise<Quota | undefined>;
    readonly getParams: (request: QueryParamsRequest) => Promise<Params | undefined>;
  };
}

export function setupSubscriptionExtension(base: QueryClient): SubscriptionExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    subscription: {
      getSubscriptions: (request: QuerySubscriptionsRequest) => queryService.QuerySubscriptions(request)
        .then((response) => response.subscriptions),

      getSubscriptionsForAddress: (request: QuerySubscriptionsForAddressRequest) => queryService.QuerySubscriptionsForAddress(request)
        .then((response) => response.subscriptions),

      getSubscription: (request: QuerySubscriptionRequest) => queryService.QuerySubscription(request)
        .then((response) => response.subscription),

      getQuotas: (request: QueryQuotasRequest) => queryService.QueryQuotas(request)
        .then((response) => response.quotas),

      getQuota: (request: QueryQuotaRequest) => queryService.QueryQuota(request)
        .then((response) => response.quota),

      getParams: (request: QueryParamsRequest) => queryService.QueryParams(request)
        .then((response) => response.params),
    },
  };
}
