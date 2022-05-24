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
  NodeRegister = '/sentinel.node.v1.MsgRegisterRequest',
  NodeSetStatus = '/sentinel.node.v1.MsgSetStatusRequest',
  NodeUpdate = '/sentinel.node.v1.MsgUpdateRequest',
  PlanAdd = '/sentinel.plan.v1.MsgAddRequest',
  PlanAddNode = '/sentinel.plan.v1.MsgAddNodeRequest',
  PlanRemoveNode = '/sentinel.plan.v1.MsgRemoveNodeRequest',
  PlanSetStatus = '/sentinel.plan.v1.MsgSetStatusRequest',
  ProviderRegister = '/sentinel.provider.v1.MsgRegisterRequest',
  ProviderUpdate = '/sentinel.provider.v1.MsgUpdateRequest',
  SubscriptionAddQuota =  '/sentinel.subscription.v1.MsgAddQuotaRequest',
  SubscriptionCancel = '/sentinel.subscription.v1.MsgCancelRequest',
  SubscriptionSubscribeToNode = '/sentinel.subscription.v1.MsgSubscribeToNodeRequest',
  SubscriptionSubscribeToPlan = '/sentinel.subscription.v1.MsgSubscribeToPlanRequest',
  SubscriptionUpdateQuota =  '/sentinel.subscription.v1.MsgUpdateQuotaRequest',
  SessionEnd = '/sentinel.session.v1.MsgEndRequest',
  SessionStart = '/sentinel.session.v1.MsgStartRequest',
  SessionUpdate = '/sentinel.session.v1.MsgUpdateRequest',
  Swap = '/sentinel.swap.v1.MsgSwapRequest',
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
