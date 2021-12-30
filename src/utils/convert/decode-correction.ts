import { Coin } from '@cosmjs/stargate';

export function correctDecodedFloatNumber(value: number | string): string {
  return (+value / 1e+18).toString();
}

export function correctDecodedCoin(coin: Coin): Coin {
  return {
    ...coin,
    amount: correctDecodedFloatNumber(coin.amount),
  };
}
