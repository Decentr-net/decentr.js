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
import { createTypedEncodeObject } from '../../api-utils';
import { setupSessionExtension } from './extension';
import { EndSessionRequest, StartSessionRequest, UpdateSessionRequest } from './types';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { TxMessageTypeUrl } from '../registry';

export class SessionClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupSessionExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
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

  public startSession(
    request: StartSessionRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SessionStart,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public updateSession(
    request: UpdateSessionRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SessionUpdate,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public endSession(
    request: EndSessionRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.SessionEnd,
      request,
    );

    return this.transactionSignerFactory(message);
  }
}
