import { bufferToBytes } from '@tendermint/belt';
import { Bytes } from '@tendermint/types';
import createHash from 'create-hash';

export function hashBody(
  body: Bytes | Buffer | string,
  alghorithm: createHash.algorithm = 'sha256',
): Bytes {
  const target = typeof body === 'string' ? body : Buffer.from(body);
  const hashBuffer = createHash(alghorithm).update(target).digest();
  return bufferToBytes(hashBuffer);
}

export function bytesToString(bytes: Bytes, encoding: 'hex' | 'base64'): string {
  return Buffer.from(bytes).toString(encoding);
}

export function hexToBytes(hex: string): Bytes {
  return new Uint8Array(Buffer.from(hex, 'hex'));
}

export function getUnicode(target: string): string {
  return [...target].map((character) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hex = character.codePointAt(0)!.toString(16);
    const zeroCharacter = '0000';
    return '\\u' + zeroCharacter.slice(0, zeroCharacter.length - hex.length) + hex;
  }).join('');
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => resolve(fileReader.result as string);
    fileReader.readAsDataURL(blob);
  }) as Promise<string>;
}
