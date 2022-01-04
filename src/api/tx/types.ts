import { IndexedTx } from '@cosmjs/stargate';

import { DecodedTx } from '../types';

export {
  SearchTxFilter,
  SearchTxQuery,
} from '@cosmjs/stargate';

export interface DecodedIndexedTx extends Omit<IndexedTx, 'tx'> {
  tx: DecodedTx;
}
