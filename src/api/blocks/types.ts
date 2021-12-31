import { Block } from '@cosmjs/stargate';

import { DecodedTx } from '../types';

export interface DecodedBlock extends Omit<Block, 'txs'> {
  readonly txs: DecodedTx[];
}
