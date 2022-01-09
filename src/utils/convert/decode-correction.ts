import { Decimal } from '@cosmjs/math'
import { Coin } from '@cosmjs/stargate';
import { fromUtf8 } from '@cosmjs/encoding';

const FRACTIONAL_DIGITS = 18;

export function correctDecodedFloatNumber(value: number | string): string {
  return Decimal.fromAtomics(value.toString(), FRACTIONAL_DIGITS).toString();
}

export function bytesToDecimalString(bytes: Uint8Array): string {
  return correctDecodedFloatNumber(fromUtf8(bytes));
}

export function correctDecodedCoin(coin: Coin): Coin {
  return {
    ...coin,
    amount: correctDecodedFloatNumber(coin.amount),
  };
}
