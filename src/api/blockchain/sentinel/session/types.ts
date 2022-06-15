import { MsgEndRequest, MsgStartRequest, MsgUpdateRequest } from '../../../../codec/sentinel/session/v1/msg';

export {
  Params as SentinelSessionParams,
} from '../../../../codec/sentinel/session/v1/params';
export {
  Session as SentinelSession,
} from '../../../../codec/sentinel/session/v1/session';

export type StartSessionRequest = MsgStartRequest;

export type UpdateSessionRequest = MsgUpdateRequest;

export type EndSessionRequest = MsgEndRequest | MsgEndRequest[];

export interface AddSessionResponse {
  ipV4: string;
  ipV6: string;
  host: string;
  port: number;
  hostPublicKey: string;
  wgPrivateKey: string;
}
