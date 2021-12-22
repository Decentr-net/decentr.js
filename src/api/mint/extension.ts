import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { QueryClientImpl, } from '../../codec/cosmos/mint/v1beta1/query';

export interface MintExtension {
  readonly mint: {
    readonly getInflation: () => Promise<Uint8Array>;
  };
}

export function setupMintExtension(base: QueryClient): MintExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryClientImpl(rpcClient);

  return {
    mint: {
      getInflation: () => queryService.Inflation({})
        .then((response) => response.inflation),
    },
  };
}
