import { bech32 } from 'bech32';

import { Wallet, WalletPrefix } from './types';

export class WalletAddressVerifier {
  public static verify(address: Wallet['address']): boolean {
    try {
      return !!bech32.decode(address);
    } catch {
      return false;
    }
  }

  public static verifyDecentr(address: Wallet['address']): boolean {
    try {
      return bech32.decode(address).prefix === WalletPrefix.Decentr;
    } catch {
      return false;
    }
  }
}
