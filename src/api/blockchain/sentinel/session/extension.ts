import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Params } from '../../../../codec/sentinel/session/v1/params';
import { Session } from '../../../../codec/sentinel/session/v1/session';
import {
  QueryParamsRequest,
  QueryServiceClientImpl,
  QuerySessionRequest,
  QuerySessionsForAddressRequest,
  QuerySessionsRequest,
} from '../../../../codec/sentinel/session/v1/querier';

export interface SessionExtension {
  readonly session: {
    readonly getSessions: (request: QuerySessionsRequest) => Promise<Session[]>;
    readonly getSessionsForAddress: (request: QuerySessionsForAddressRequest) => Promise<Session[]>;
    readonly getSession: (request: QuerySessionRequest) => Promise<Session | undefined>;
    readonly getParams: (request: QueryParamsRequest) => Promise<Params | undefined>;
  };
}

export function setupSessionExtension(base: QueryClient): SessionExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    session: {
      getSessions: (request: QuerySessionsRequest) => queryService.QuerySessions(request)
        .then((response) => response.sessions),

      getSessionsForAddress: (request: QuerySessionsForAddressRequest) => queryService.QuerySessionsForAddress(request)
        .then((response) => response.sessions),

      getSession: (request: QuerySessionRequest) => queryService.QuerySession(request)
        .then((response) => response.session),

      getParams: (request: QueryParamsRequest) => queryService.QueryParams(request)
        .then((response) => response.params),
    },
  };
}
