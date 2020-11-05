import { Bech32String, Bytes } from '@tendermint/types';

/**
 * A private and public key pair.
 */
export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

/**
 * A private and public key buffers pair.
 */
export interface KeyPairBytes {
  privateKey: Bytes;
  publicKey: Bytes;
}

/**
 * A {@link KeyPair|`KeyPair`} with a Bech32-encoded address derived from the public key.
 */
export interface Wallet extends KeyPair {
  address: Bech32String;
}
