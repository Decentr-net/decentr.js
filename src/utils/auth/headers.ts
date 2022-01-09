import { KeyPair } from '../../wallet';
import { bytesToHex } from '../convert';
import { getSignature } from './signature';

export interface AuthHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
}

export function getAuthHeaders<T>(
  data: T,
  keys: KeyPair,
  options?: { disableEncode?: boolean },
): AuthHeaders {
  const signature = getSignature(data, keys.privateKey, options);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
