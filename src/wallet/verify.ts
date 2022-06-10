import { bech32 } from 'bech32';

import { Wallet, WalletPrefix } from './types';

export class WalletAddressVerifier {
  public static verify(address: Wallet['address'], prefix?: WalletPrefix | string): boolean {
    try {
      const decoded = bech32.decode(address);

      return prefix ? decoded.prefix === prefix : !!decoded;
    } catch {
      return false;
    }
  }
}
