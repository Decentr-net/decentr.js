import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { QueryClientImpl } from '../../../codec/token/query';
import { Wallet } from '../../../wallet';

export interface TokenExtension {
  readonly token: {
    readonly getBalance: (address: Wallet['address']) => Promise<string | undefined>;
  };
}

export function setupTokenExtension(base: QueryClient): TokenExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryClientImpl(rpcClient);

  return {
    token: {
      getBalance: (address: Wallet['address']) => queryService.Balance({ address })
        .then((response) => response.balance?.dec),
    },
  };
}
