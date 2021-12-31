import { IndexedTx } from '@cosmjs/stargate';

import { DecodedTx } from '../types';

export interface DecodedIndexedTx extends Omit<IndexedTx, 'tx'> {
  tx: DecodedTx;
}
