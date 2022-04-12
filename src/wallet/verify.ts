import { bech32 } from 'bech32';

import { DECENTR_WALLET_PREFIX } from './constants';
import { Wallet } from './types';

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
      return bech32.decode(address).prefix === DECENTR_WALLET_PREFIX;
    } catch {
      return false;
    }
  }
}
