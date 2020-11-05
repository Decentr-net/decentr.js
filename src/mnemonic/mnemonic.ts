import { entropyToMnemonic } from 'bip39';

const ENTROPY_LENGTH = 32;

function getWebCryptoRandomBytesBuffer(): Buffer {
  const chunkSize: number = ENTROPY_LENGTH / 4;
  const randomValuesContainer = new Uint32Array(chunkSize);
  window.crypto.getRandomValues(randomValuesContainer);

  let hexString = '';
  randomValuesContainer.forEach((value) => {
    hexString += value.toString(16).padStart(chunkSize, '0');
  });

  return Buffer.from(hexString, 'hex');
}

function getRandomBytesBuffer(): Buffer {
  try {
    return getWebCryptoRandomBytesBuffer();
  } catch {
    throw new Error(
      'There is no native support for random bytes on this system. Key generation is not safe here.'
    );
  }
}

export function generateMnemonic(entropy: Buffer = getRandomBytesBuffer()): string {
  if (entropy.length < ENTROPY_LENGTH) {
    throw new Error('Entropy has incorrect length');
  }

  return entropyToMnemonic(entropy.toString('hex'));
}
