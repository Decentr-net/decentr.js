import { GeneratedType } from '@cosmjs/proto-signing';

import { MsgEndRequest, MsgStartRequest } from '../../../codec/sentinel/session/v1/msg';
import { MsgSubscribeToNodeRequest } from '../../../codec/sentinel/subscription/v1/msg';

export enum TxMessageTypeUrl {
  SubscribeToNode = '/sentinel.subscription.v1.MsgService/MsgSubscribeToNode',
  SessionEnd = '/sentinel.session.v1.MsgEndRequest',
  SessionStart = '/sentinel.session.v1.MsgStartRequest',
}

export const REGISTRY_MAP: Record<TxMessageTypeUrl, GeneratedType> = {
  [TxMessageTypeUrl.SubscribeToNode]: MsgSubscribeToNodeRequest,
  [TxMessageTypeUrl.SessionEnd]: MsgEndRequest,
  [TxMessageTypeUrl.SessionStart]: MsgStartRequest,
};

export interface TxMessageValueMap {
  [TxMessageTypeUrl.SubscribeToNode]: MsgSubscribeToNodeRequest;
  [TxMessageTypeUrl.SessionEnd]: MsgEndRequest,
  [TxMessageTypeUrl.SessionStart]: MsgStartRequest,
}
