import { GeneratedType } from '@cosmjs/proto-signing';

import {
  MsgRegisterRequest as NodeMsgRegisterRequest,
  MsgSetStatusRequest as NodeMsgSetStatusRequest,
  MsgUpdateRequest as NodeMsgUpdateRequest,
} from '../../../codec/sentinel/node/v1/msg';
import {
  MsgAddNodeRequest as PlanMsgAddNodeRequest,
  MsgAddRequest as PlanMsgAddRequest,
  MsgRemoveNodeRequest as PlanMsgRemoveNodeRequest,
  MsgSetStatusRequest as PlanMsgSetStatusRequest,
} from '../../../codec/sentinel/plan/v1/msg';
import {
  MsgRegisterRequest as ProviderMsgRegisterRequest,
  MsgUpdateRequest as ProviderMsgUpdateRequest,
} from '../../../codec/sentinel/provider/v1/msg';
import {
  MsgEndRequest as SessionMsgEndRequest,
  MsgStartRequest as SessionMsgStartRequest,
  MsgUpdateRequest as SessionMsgUpdateRequest,
} from '../../../codec/sentinel/session/v1/msg';
import {
  MsgAddQuotaRequest as SubscriptionMsgAddQuotaRequest,
  MsgCancelRequest as SubscriptionMsgCancelRequest,
  MsgSubscribeToNodeRequest as SubscriptionMsgSubscribeToNodeRequest,
  MsgSubscribeToPlanRequest as SubscriptionMsgSubscribeToPlanRequest,
  MsgUpdateQuotaRequest as SubscriptionMsgUpdateQuotaRequest,
} from '../../../codec/sentinel/subscription/v1/msg';
import { MsgSwapRequest } from '../../../codec/sentinel/swap/v1/msg';

export enum TxMessageTypeUrl {
  NodeRegister = '/sentinel.node.v1.MsgService/MsgRegister',
  NodeSetStatus = '/sentinel.node.v1.MsgService/MsgSetStatus',
  NodeUpdate = '/sentinel.node.v1.MsgService/MsgUpdate',
  PlanAdd = '/sentinel.plan.v1.MsgService/MsgAdd',
  PlanAddNode = '/sentinel.plan.v1.MsgService/MsgAddNode',
  PlanRemoveNode = '/sentinel.plan.v1.MsgService/MsgRemoveNode',
  PlanSetStatus = '/sentinel.plan.v1.MsgService/MsgSetStatus',
  ProviderRegister = '/sentinel.provider.v1.MsgService/MsgRegister',
  ProviderUpdate = '/sentinel.provider.v1.MsgService/MsgUpdate',
  SubscriptionAddQuota =  '/sentinel.subscription.v1.MsgService/MsgAddQuota',
  SubscriptionCancel = '/sentinel.subscription.v1.MsgService/MsgCancel',
  SubscriptionSubscribeToNode = '/sentinel.subscription.v1.MsgService/MsgSubscribeToNode',
  SubscriptionSubscribeToPlan = '/sentinel.subscription.v1.MsgService/MsgSubscribeToPlan',
  SubscriptionUpdateQuota =  '/sentinel.subscription.v1.MsgService/MsgUpdateQuota',
  SessionEnd = '/sentinel.session.v1.MsgEndRequest',
  SessionStart = '/sentinel.session.v1.MsgStartRequest',
  SessionUpdate = '/sentinel.session.v1.MsgService/MsgUpdate',
  Swap = '/sentinel.swap.v1.MsgService/MsgSwap',
}

export const REGISTRY_MAP: Record<TxMessageTypeUrl, GeneratedType> = {
  [TxMessageTypeUrl.NodeRegister]: NodeMsgRegisterRequest,
  [TxMessageTypeUrl.NodeSetStatus]: NodeMsgSetStatusRequest,
  [TxMessageTypeUrl.NodeUpdate]: NodeMsgUpdateRequest,
  [TxMessageTypeUrl.PlanAdd]: PlanMsgAddRequest,
  [TxMessageTypeUrl.PlanAddNode]: PlanMsgAddNodeRequest,
  [TxMessageTypeUrl.PlanRemoveNode]: PlanMsgRemoveNodeRequest,
  [TxMessageTypeUrl.PlanSetStatus]: PlanMsgSetStatusRequest,
  [TxMessageTypeUrl.ProviderRegister]: ProviderMsgRegisterRequest,
  [TxMessageTypeUrl.ProviderUpdate]: ProviderMsgUpdateRequest,
  [TxMessageTypeUrl.SubscriptionAddQuota]: SubscriptionMsgAddQuotaRequest,
  [TxMessageTypeUrl.SubscriptionCancel]: SubscriptionMsgCancelRequest,
  [TxMessageTypeUrl.SubscriptionSubscribeToNode]: SubscriptionMsgSubscribeToNodeRequest,
  [TxMessageTypeUrl.SubscriptionSubscribeToPlan]: SubscriptionMsgSubscribeToPlanRequest,
  [TxMessageTypeUrl.SubscriptionUpdateQuota]: SubscriptionMsgUpdateQuotaRequest,
  [TxMessageTypeUrl.SessionEnd]: SessionMsgEndRequest,
  [TxMessageTypeUrl.SessionStart]: SessionMsgStartRequest,
  [TxMessageTypeUrl.SessionUpdate]: SessionMsgUpdateRequest,
  [TxMessageTypeUrl.Swap]: MsgSwapRequest,
};

export interface TxMessageValueMap {
  [TxMessageTypeUrl.NodeRegister]: NodeMsgRegisterRequest,
  [TxMessageTypeUrl.NodeSetStatus]: NodeMsgSetStatusRequest,
  [TxMessageTypeUrl.NodeUpdate]: NodeMsgUpdateRequest,
  [TxMessageTypeUrl.PlanAdd]: PlanMsgAddRequest,
  [TxMessageTypeUrl.PlanAddNode]: PlanMsgAddNodeRequest,
  [TxMessageTypeUrl.PlanRemoveNode]: PlanMsgRemoveNodeRequest,
  [TxMessageTypeUrl.PlanSetStatus]: PlanMsgSetStatusRequest,
  [TxMessageTypeUrl.ProviderRegister]: ProviderMsgRegisterRequest,
  [TxMessageTypeUrl.ProviderUpdate]: ProviderMsgUpdateRequest,
  [TxMessageTypeUrl.SubscriptionAddQuota]: SubscriptionMsgAddQuotaRequest,
  [TxMessageTypeUrl.SubscriptionCancel]: SubscriptionMsgCancelRequest,
  [TxMessageTypeUrl.SubscriptionSubscribeToNode]: SubscriptionMsgSubscribeToNodeRequest,
  [TxMessageTypeUrl.SubscriptionSubscribeToPlan]: SubscriptionMsgSubscribeToPlanRequest,
  [TxMessageTypeUrl.SubscriptionUpdateQuota]: SubscriptionMsgUpdateQuotaRequest,
  [TxMessageTypeUrl.SessionEnd]: SessionMsgEndRequest,
  [TxMessageTypeUrl.SessionStart]: SessionMsgStartRequest,
  [TxMessageTypeUrl.SessionUpdate]: SessionMsgUpdateRequest,
  [TxMessageTypeUrl.Swap]: MsgSwapRequest,
}
