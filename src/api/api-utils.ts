import { coin, decodeTxRaw } from '@cosmjs/proto-signing';
import { Coin } from '@cosmjs/stargate';

import { REGISTRY, TxMessageTypeUrl, TxMessageValueMap, TypedEncodeObject } from './registry';
import { DECENTR_DENOM, DecodedTx } from './types';

export function createDecentrCoin(amount: number | string): Coin {
  return coin(amount, DECENTR_DENOM);
}

export function decodeTx(tx: Uint8Array): DecodedTx {
  const decodedTxRaw = decodeTxRaw(tx);

  const decodedMessages = decodedTxRaw.body.messages
    .map((message) => ({
      typeUrl: message.typeUrl as TxMessageTypeUrl,
      value: REGISTRY.decode(message),
    }));

  return {
    ...decodedTxRaw,
    body: {
      ...decodedTxRaw.body,
      messages: decodedMessages,
    },
  };
}

export function createTypedEncodeObject<K extends keyof TxMessageValueMap>(
  typeUrl: K,
  value: TxMessageValueMap[K],
): TypedEncodeObject<K> {
  return {
    typeUrl,
    value,
  };
}
