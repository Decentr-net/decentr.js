import * as bip39 from 'bip39'

export function generateMnemonic() {
  return bip39.generateMnemonic();
}
