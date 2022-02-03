import { QueryClientImpl } from 'cosmjs-types/cosmos/mint/v1beta1/query';
import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

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
