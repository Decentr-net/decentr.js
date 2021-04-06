import { publicKeyCreate } from 'secp256k1';
import CryptoJS from 'crypto-js';

import { bytesToBase64, getUnicode, hexToBytes } from '../convert'
import { deepMapObjectStrings } from '../object'

export function encrypt<T>(data: T, encryptKey: string): string {
  const encryptTarget: string = typeof data === 'string'
    ? data
    : JSON.stringify(data);

  return CryptoJS.AES.encrypt(encryptTarget, encryptKey).toString();
}

export function decrypt<T>(data: string, decryptKey: string): T | undefined {
  const bytes = CryptoJS.AES.decrypt(data, decryptKey);

  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return;
  }
}

export function getPublicKeyBase64(privateKeyHex: string): string {
  const privateKeyBytes = hexToBytes(privateKeyHex);
  const publicKeyBytes = publicKeyCreate(privateKeyBytes);

  return bytesToBase64(publicKeyBytes);
}

export function encodeObjectCharactersToUnicode<T>(
  target: T,
  characters: string[],
): T {
  const mapFunction = (value: string) => {
    return value.split('').map((character) => {
      return characters.includes(character)
        ? getUnicode(character)
        : character;
    }).join('');
  };

  return deepMapObjectStrings(target, mapFunction);
}

export function decodeObjectUnicode<T>(target: T): T {
  return deepMapObjectStrings(target, (value: string) => {
    return JSON.parse('"' + value.replace('"', '\\"') + '"');
  });
}
