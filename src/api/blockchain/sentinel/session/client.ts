import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Params } from '../../../../codec/sentinel/session/v1/params';
import { Session } from '../../../../codec/sentinel/session/v1/session';
import {
  QueryParamsRequest,
  QuerySessionRequest,
  QuerySessionsForAddressRequest,
  QuerySessionsRequest,
} from '../../../../codec/sentinel/session/v1/querier';
import { setupSessionExtension } from './extension';

export class SessionClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupSessionExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getSessions(request: QuerySessionsRequest): Promise<Session[]> {
    return this.queryClient.session.getSessions(request);
  }

  public getSessionsForAddress(request: QuerySessionsForAddressRequest): Promise<Session[]> {
    return this.queryClient.session.getSessionsForAddress(request);
  }

  public getSession(request: QuerySessionRequest): Promise<Session | undefined> {
    return this.queryClient.session.getSession(request);
  }

  public getParams(request: QueryParamsRequest): Promise<Params | undefined> {
    return this.queryClient.session.getParams(request);
  }
}
