import { bufferToBytes } from '@tendermint/belt';
import { Bytes } from '@tendermint/types';
import createHash from 'create-hash';

export function hashBytes(bytes: Bytes | Buffer, alghorithm: createHash.algorithm): Bytes {
  const coercedBuffer = (bytes instanceof Buffer) ? bytes : Buffer.from(bytes);
  const hashBuffer = createHash(alghorithm).update(coercedBuffer).digest();
  return bufferToBytes(hashBuffer);
}

export function hashStringToBytes(target: string, alghorithm: createHash.algorithm = 'sha256'): Bytes {
  const hashBuffer = createHash(alghorithm).update(target).digest();
  return bufferToBytes(hashBuffer);
}

export function bytesToHex(bytes: Bytes): string {
  return Buffer.from(bytes).toString('hex');
}

export function bytesToBase64(bytes: Bytes): string {
  return Buffer.from(bytes).toString('base64');
}

export function hexToBytes(hex: string): Bytes {
  return new Uint8Array(Buffer.from(hex, 'hex'))
}

// export function utfStringToByteArray(target: string): number[] {
//   const byteArray = [];
//
//   const buffer = Buffer.from(target, 'utf8');
//
//   for (const value of buffer) {
//     byteArray.push(value);
//   }
//
//   return [...buffer.map((value) => value)];
// }
