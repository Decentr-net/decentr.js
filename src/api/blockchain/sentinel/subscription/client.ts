import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Params } from '../../../../codec/sentinel/subscription/v1/params';
import { Quota } from '../../../../codec/sentinel/subscription/v1/quota';
import { Subscription } from '../../../../codec/sentinel/subscription/v1/subscription';
import {
  QueryParamsRequest,
  QueryQuotaRequest,
  QueryQuotasRequest,
  QuerySubscriptionRequest,
  QuerySubscriptionsForAddressRequest,
  QuerySubscriptionsRequest
} from '../../../../codec/sentinel/subscription/v1/querier';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { setupSubscriptionExtension } from './extension';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { SubscribeToNodeRequest } from './types';

export class SubscriptionClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupSubscriptionExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getSubscriptions(request: QuerySubscriptionsRequest): Promise<Subscription[]> {
    return this.queryClient.subscription.getSubscriptions(request);
  }

  public getSubscriptionsForAddress(request: QuerySubscriptionsForAddressRequest): Promise<Subscription[]> {
    return this.queryClient.subscription.getSubscriptionsForAddress(request);
  }

  public getSubscription(request: QuerySubscriptionRequest): Promise<Subscription | undefined> {
    return this.queryClient.subscription.getSubscription(request);
  }

  public getQuotas(request: QueryQuotasRequest): Promise<Quota[]> {
    return this.queryClient.subscription.getQuotas(request);
  }

  public getQuota(request: QueryQuotaRequest): Promise<Quota | undefined> {
    return this.queryClient.subscription.getQuota(request);
  }

  public getParams(request: QueryParamsRequest): Promise<Params | undefined> {
    return this.queryClient.subscription.getParams(request);
  }

  public subscribeToNode(
    request: SubscribeToNodeRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SubscriptionSubscribeToNode,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }
}
