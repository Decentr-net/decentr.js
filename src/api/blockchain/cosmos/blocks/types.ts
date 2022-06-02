import { Block as StargateBlock } from '@cosmjs/stargate';

import { DecodedTx } from '../../types';

export { BlockHeader } from '@cosmjs/stargate';

export interface Block extends Omit<StargateBlock, 'txs'> {
  readonly txs: DecodedTx[];
}
