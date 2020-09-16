import { generateMnemonic } from 'bip39';

export class Mnemonic {
  generate(): string {
    return generateMnemonic();
  }
}
