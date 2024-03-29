import {
  MsgEndRequest,
  MsgStartRequest,
  MsgUpdateRequest,
} from '../../../../codec/sentinel/session/v1/msg';
import { AddSessionResponse } from './wireguard';

export {
  Params as SentinelSessionParams,
} from '../../../../codec/sentinel/session/v1/params';
export {
  Session as SentinelSession,
} from '../../../../codec/sentinel/session/v1/session';

export type StartSessionRequest = MsgStartRequest;

export type UpdateSessionRequest = MsgUpdateRequest;

export type EndSessionRequest = MsgEndRequest | MsgEndRequest[];

export interface SessionConnectInfo extends AddSessionResponse {
  wgPrivateKey: string;
}
