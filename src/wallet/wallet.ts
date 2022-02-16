import { bufferToBytes } from '@tendermint/belt';
import { Bech32String, Bytes } from '@tendermint/types';
import { bech32 } from 'bech32';
import { BIP32Interface, fromSeed as bip32fromSeed } from 'bip32';
import { mnemonicToSeedSync as bip39mnemonicToSeedSync } from 'bip39';
import { publicKeyCreate as secp256k1PublicKeyCreate } from 'secp256k1';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';

import { bytesToString, hashBody, hexToBytes } from '../utils';
import {
  DECENTR_DERIVATION_PATH,
  DECENTR_VALIDATOR_WALLET_PREFIX,
  DECENTR_WALLET_PREFIX,
} from './constants';
import { KeyPairBytes, Wallet } from './types';

/**
 * Derive a BIP32 master key from a mnemonic.
 *
 * @param   mnemonic - BIP39 mnemonic seed
 *
 * @returns BIP32 master key
 * @throws  will throw if the provided mnemonic is invalid
 */
function createMasterKeyFromMnemonic(mnemonic: string): BIP32Interface {
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
function createKeyPairFromMasterKey(
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
function createAddress(publicKey: Bytes, prefix: string): Bech32String {
  const hash1 = hashBody(publicKey, 'sha256');
  const hash2 = hashBody(hash1, 'ripemd160');
  const words = bech32.toWords(hash2);

  return bech32.encode(prefix, words);
}

/**
 * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
 *
 * @param   masterKey - BIP32 master key
 *
 * @returns a keypair and address derived from the provided master key
 */
function createWalletFromMasterKey(masterKey: BIP32Interface): Wallet {
  const {
    privateKey: privateKeyBytes,
    publicKey: publicKeyBytes,
  } = createKeyPairFromMasterKey(masterKey);

  const address = createAddress(publicKeyBytes, DECENTR_WALLET_PREFIX);
  const validatorAddress = createAddress(publicKeyBytes, DECENTR_VALIDATOR_WALLET_PREFIX);

  return {
    address,
    validatorAddress,
    privateKey: bytesToString(privateKeyBytes, 'hex'),
    publicKey: bytesToString(publicKeyBytes, 'hex'),
  };
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

export function createSecp256k1WalletFromPrivateKey(
  privateKey: string,
  validator = false,
): Promise<DirectSecp256k1Wallet> {
  return DirectSecp256k1Wallet.fromKey(
    hexToBytes(privateKey),
    validator ? DECENTR_VALIDATOR_WALLET_PREFIX : DECENTR_WALLET_PREFIX,
  );
}

export async function createWalletFromPrivateKey(privateKey: string): Promise<Wallet> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  const validatorWallet = await createSecp256k1WalletFromPrivateKey(privateKey, true);

  const account = await wallet.getAccounts()
    .then((accounts) => accounts[0]);

  const validatorAccount = await validatorWallet.getAccounts()
    .then((accounts) => accounts[0]);

  return {
    address: account.address,
    validatorAddress: validatorAccount.address,
    publicKey: bytesToString(account.pubkey, 'hex'),
    privateKey,
  };
}
