import createHash from 'create-hash';

import { createPublicKeyFromPrivateKey, Wallet } from '../../wallet';
import { bytesToString } from '../convert';
import { getSignature } from './signature';

export interface AuthHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
}

export function getAuthHeaders<T>(
  data: T,
  privateKey: Wallet['privateKey'],
  options?: {
    algorithm?: createHash.algorithm | 'keccak256',
    disableEncode?: boolean,
  },
): AuthHeaders {
  const signature = getSignature(data, privateKey, options);
  const signatureHex = bytesToString(signature, 'hex');

  return {
    'Public-Key': createPublicKeyFromPrivateKey(privateKey),
    Signature: signatureHex,
  };
}
