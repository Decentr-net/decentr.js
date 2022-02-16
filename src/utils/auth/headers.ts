import { KeyPair } from '../../wallet';
import { bytesToString } from '../convert';
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
  const signatureHex = bytesToString(signature, 'hex');

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
