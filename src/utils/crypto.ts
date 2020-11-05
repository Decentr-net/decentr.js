import { publicKeyCreate } from 'secp256k1';
import CryptoJS from 'crypto-js';
import { bytesToBase64, hexToBytes } from './convert';

export function encrypt<T>(data: T, encryptKey: string): string {
  const encryptTarget: string = typeof data === 'string'
    ? data
    : JSON.stringify(data);

  return CryptoJS.AES.encrypt(encryptTarget, encryptKey).toString();
}

export function decrypt<T>(data: string, decryptKey: string): T | undefined {
  const bytes = CryptoJS.AES.decrypt(atob(data), decryptKey);

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
