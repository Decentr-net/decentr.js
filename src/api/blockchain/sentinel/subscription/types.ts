import {
  MsgAddQuotaRequest,
  MsgCancelRequest,
  MsgSubscribeToNodeRequest,
} from '../../../../codec/sentinel/subscription/v1/msg';

export {
  Params as SentinelSubscriptionParams,
} from '../../../../codec/sentinel/subscription/v1/params';
export {
  Quota as SentinelQuota,
} from '../../../../codec/sentinel/subscription/v1/quota';
export {
  Subscription as SentinelSubscription,
} from '../../../../codec/sentinel/subscription/v1/subscription';

export type SubscribeToNodeRequest = MsgSubscribeToNodeRequest;

export type CancelSubscriptionRequest = MsgCancelRequest;

export type SubscriptionAddQuotaRequest = MsgAddQuotaRequest;
