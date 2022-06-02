import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Deposit } from '../../../../codec/sentinel/deposit/v1/deposit';
import {
  QueryDepositRequest,
  QueryDepositsRequest,
  QueryServiceClientImpl,
} from '../../../../codec/sentinel/deposit/v1/querier';

export interface DepositExtension {
  readonly deposit: {
    readonly getDeposits: (request: QueryDepositsRequest) => Promise<Deposit[]>;
    readonly getDeposit: (request: QueryDepositRequest) => Promise<Deposit | undefined>;
  };
}

export function setupDepositExtension(base: QueryClient): DepositExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryServiceClientImpl(rpcClient);

  return {
    deposit: {
      getDeposits: (request: QueryDepositsRequest) => queryService.QueryDeposits(request)
        .then((response) => response.deposits),

      getDeposit: (request: QueryDepositRequest) => queryService.QueryDeposit(request)
        .then((response) => response.deposit),
    },
  };
}
