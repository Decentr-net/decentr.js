import { bufferToBytes } from '@tendermint/belt';
import { Bech32String, Bytes } from '@tendermint/types';
import { bech32 } from 'bech32';
import { BIP32Interface, fromSeed as bip32fromSeed } from 'bip32';
import { mnemonicToSeedSync as bip39mnemonicToSeedSync } from 'bip39';
import { publicKeyCreate as secp256k1PublicKeyCreate } from 'secp256k1';

import { bytesToHex, hashBytes } from '../utils';
import { DECENTR_DERIVATION_PATH } from './constants';
import { KeyPairBytes, Wallet } from './types';

/**
 * Derive a BIP32 master key from a mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 *
 * @returns BIP32 master key
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createMasterKeyFromMnemonic(mnemonic: string): BIP32Interface {
  const seed = bip39mnemonicToSeedSync(mnemonic);

  return bip32fromSeed(seed);
}

/**
 * Derive a keypair from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 *
 * @returns derived public and private key pair
 * @throws  will throw if a private key cannot be derived
 */
export function createKeyPairFromMasterKey(
  masterKey: BIP32Interface,
): KeyPairBytes {
  const buffer = masterKey.derivePath(DECENTR_DERIVATION_PATH).privateKey;

  if (!buffer) {
    throw new Error('Could not derive private key');
  }

  const privateKeyBytes = bufferToBytes(buffer);
  const publicKeyBytes = secp256k1PublicKeyCreate(privateKeyBytes, true);

  return {
    privateKey: privateKeyBytes,
    publicKey: publicKeyBytes,
  };
}

/**
 * Derive a Bech32 address from a public key.
 *
 * @param   publicKey - public key bytes
 * @param   prefix    - Bech32 human readable part
 *
 * @returns Bech32-encoded address
 */
export function createAddress(publicKey: Bytes, prefix: string): Bech32String {
  const hash1 = hashBytes(publicKey, 'sha256');
  const hash2 = hashBytes(hash1, 'ripemd160');
  const words = bech32.toWords(hash2);

  return bech32.encode(prefix, words);
}

/**
 * Create a {@link Wallet|`Wallet`} from a known mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 *
 * @returns a keypair and address derived from the provided mnemonic
 * @throws  will throw if the provided mnemonic is invalid
 */
export function createWalletFromMnemonic(
  mnemonic: string,
): Wallet {
  const masterKey = createMasterKeyFromMnemonic(mnemonic);

  return createWalletFromMasterKey(masterKey);
}


/**
 * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 *
 * @returns a keypair and address derived from the provided master key
 */
export function createWalletFromMasterKey(masterKey: BIP32Interface): Wallet {
  const {
    privateKey: privateKeyBytes,
    publicKey: publicKeyBytes,
  } = createKeyPairFromMasterKey(masterKey);

  const address = createAddress(publicKeyBytes, 'decentr');
  const validatorAddress = createAddress(publicKeyBytes, 'decentrvaloper');

  return {
    address,
    validatorAddress,
    privateKey: bytesToHex(privateKeyBytes),
    publicKey: bytesToHex(publicKeyBytes),
  };
}
