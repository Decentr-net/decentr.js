import { IndexedTx } from '@cosmjs/stargate';

import { decodeTx } from '../../api-utils';
import { DecodedIndexedTx } from './types';

export function decodeIndexedTx(indexedTx: IndexedTx): DecodedIndexedTx {
  return {
    ...indexedTx,
    tx: decodeTx(indexedTx.tx),
  };
}
