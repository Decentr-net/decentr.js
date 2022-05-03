// Example
import { generateMnemonic } from './mnemonic';
import { createWalletFromMnemonic } from './wallet';

const mnemonic = generateMnemonic();

console.log('Mnemonic:', mnemonic);
console.log('-----------------------');

const wallet = createWalletFromMnemonic(mnemonic);

console.log(wallet);
