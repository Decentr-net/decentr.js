import { DecodedTxRaw } from '@cosmjs/proto-signing';
import { Block } from '@cosmjs/stargate';

export interface DecodedBlock extends Omit<Block, 'txs'> {
  readonly txs: DecodedTxRaw[];
}
