import { Fee } from './../types';
import {
  bufferToBytes,
} from '@tendermint/belt';

import {
  Bech32String,
  Bytes
} from '@tendermint/types';

import {
  encode as bech32Encode,
  toWords as bech32ToWords
} from 'bech32';

import {
  BIP32Interface,
  fromBase58,
  fromSeed as bip32FromSeed
} from 'bip32';

import { mnemonicToSeedSync as bip39MnemonicToSeed } from 'bip39';

import {
  publicKeyCreate as secp256k1PublicKeyCreate,
  ecdsaSign as secp256k1EcdsaSign,
  ecdsaVerify as secp256k1EcdsaVerify, publicKeyCreate,
  publicKeyVerify
} from 'secp256k1';

import {
  COSMOS_PREFIX,
  COSMOS_PATH,
  BROADCAST_MODE_SYNC
} from '../constants';

import createHash from 'create-hash';
import {
  KeyPair,
  Wallet,
} from '../types';
import CryptoJS from 'crypto-js';

// tslint:disable-next-line: no-duplicate-imports

 /**
  * Create a {@link Wallet|`Wallet`} from a known mnemonic.
  *
  * @param   mnemonic - BIP39 mnemonic seed
  * @param   prefix   - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
  * @param   path     - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
  *
  * @returns a keypair and address derived from the provided mnemonic
  * @throws  will throw if the provided mnemonic is invalid
  */
export function createWalletFromMnemonic (mnemonic: string, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
  const masterKey = createMasterKeyFromMnemonic(mnemonic);

  return createWalletFromMasterKey(masterKey, prefix, path);
}

 /**
  * Derive a BIP32 master key from a mnemonic.
  *
  * @param   mnemonic - BIP39 mnemonic seed
  *
  * @returns BIP32 master key
  * @throws  will throw if the provided mnemonic is invalid
  */
export function createMasterKeyFromMnemonic (mnemonic: string): BIP32Interface {
  const seed = bip39MnemonicToSeed(mnemonic);

  return bip32FromSeed(seed);
}

 /**
  * Create a {@link Wallet|`Wallet`} from a BIP32 master key.
  *
  * @param   masterKey - BIP32 master key
  * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
  * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
  *
  * @returns a keypair and address derived from the provided master key
  */
export function createWalletFromMasterKey (masterKey: BIP32Interface, prefix: string = COSMOS_PREFIX, path: string = COSMOS_PATH): Wallet {
  const { privateKeyBuff, publicKeyBuff } = createKeyPairFromMasterKey(masterKey, path);

  const address = createAddress(publicKeyBuff, prefix);

  const privateKey = Buffer.from(privateKeyBuff).toString('hex');
  const publicKey = Buffer.from(publicKeyBuff).toString('hex');

  return {
      privateKey,
      publicKey,
      address
  };
}

 /**
  * Derive a keypair from a BIP32 master key.
  *
  * @param   masterKey - BIP32 master key
  * @param   path      - BIP32 derivation path, defaulting to {@link COSMOS_PATH|`COSMOS_PATH`}
  *
  * @returns derived public and private key pair
  * @throws  will throw if a private key cannot be derived
  */
export function createKeyPairFromMasterKey (masterKey: BIP32Interface, path: string = COSMOS_PATH) {
  const buffer = masterKey.derivePath(path).privateKey;
  if (!buffer) {
      throw new Error('could not derive private key');
  }

  const privateKeyBuff = bufferToBytes(buffer);
  const publicKeyBuff  = secp256k1PublicKeyCreate(privateKeyBuff, true);

  return {
      privateKeyBuff,
      publicKeyBuff
  };
}

 /**
  * Derive a Bech32 address from a public key.
  *
  * @param   publicKey - public key bytes
  * @param   prefix    - Bech32 human readable part, defaulting to {@link COSMOS_PREFIX|`COSMOS_PREFIX`}
  *
  * @returns Bech32-encoded address
  */
export function createAddress (publicKey: Bytes, prefix: string = COSMOS_PREFIX): Bech32String {
  const hash1 = sha256(publicKey);
  const hash2 = ripemd160(hash1);
  const words = bech32ToWords(hash2);

  return bech32Encode(prefix, words);
}



/**
 * Hash bytes using SHA256.
 *
 * @param   bytes - bytes to hash
 *
 * @returns hashed bytes
 */
export function sha256 (bytes: Bytes): Bytes {
  const buffer1 = (bytes instanceof Buffer) ? bytes : Buffer.from(bytes);
  const buffer2 = createHash('sha256').update(buffer1).digest();

  return bufferToBytes(buffer2);
}

 /**
  * Hash bytes using RIPEMD160.
  *
  * @param   bytes - bytes to hash
  *
  * @returns hashed bytes
  */
export function ripemd160 (bytes: Bytes): Bytes {
  const buffer1 = (bytes instanceof Buffer) ? bytes : Buffer.from(bytes);
  const buffer2 = createHash('ripemd160').update(buffer1).digest();

  return bufferToBytes(buffer2);
}

export function msgData(tx: any, acc: any, chain: string, fee?: Fee){
  return {
    msgs: [
      {
            type: tx.value.msg[0].type,
            value: tx.value.msg[0].value
          }
    ],
    chain_id: chain,
    fee: { amount: [ { amount: String(fee?.amount || 5000), denom: fee?.denom || "udec" } ], gas: String(200000) },
    memo: "",
    account_number: String(acc.account_number),
    sequence: String(acc.sequence)
  }
}

export function newStdMsg(input: any) {
	const stdSignMsg: any = {};
	stdSignMsg.json = input;
	stdSignMsg.bytes = convertStringToBytes(JSON.stringify(sortObject(stdSignMsg.json)));
	return stdSignMsg;
}

function getPubKeyBase64(ecpairPriv: any) {
	const pubKeyByte = publicKeyCreate(ecpairPriv);
	return Buffer.from(pubKeyByte).toString('base64');
}

export function getKeyBytes(strKey: any) {
  const key = new Uint8Array(Buffer.from(strKey, 'hex'))
  return key;
}

export function signMessage(stdSignMsg: any, ecpairPriv: any, modeType = "block") {
	// The supported return types includes "block"(return after tx commit), "sync"(return after CheckTx) and "async"(return right away).
  let signMessage = new Object;
  const priv = getKeyBytes(ecpairPriv)
	signMessage = stdSignMsg.json;
	const hash = createHash('sha256').update(JSON.stringify(sortObject(signMessage))).digest('hex');
	const buf = Buffer.from(hash, 'hex');
	let signObj = secp256k1EcdsaSign(buf, priv);
	let signatureBase64 = Buffer.from(signObj.signature).toString('base64');
	let signedTx = new Object;
		signedTx = {
		    "tx": {
		        "msg": stdSignMsg.json.msgs,
		        "fee": stdSignMsg.json.fee,
		        "signatures": [
		            {
		            	"account_number": stdSignMsg.json.account_number,
		            	"sequence": stdSignMsg.json.sequence,
		                "signature": signatureBase64,
		                "pub_key": {
		                    "type": "tendermint/PubKeySecp256k1",
		                    "value": getPubKeyBase64(priv)
		                }
		            }
		        ],
		        "memo": stdSignMsg.json.memo
		    },
		    "mode": modeType
		}


	return signedTx;
}

function convertStringToBytes(str: string) {
	// tslint:disable-next-line: strict-type-predicates
	if (typeof str !== "string") {
	    throw new Error("str expects a string")
	}
	let myBuffer = [];
	let buffer = Buffer.from(str, 'utf8');
	for (let i = 0; i < buffer.length; i++) {
	    myBuffer.push(buffer[i]);
	}
	return myBuffer;
}

function sortObject(obj: any): any {
	if (obj === null) return null;
	if (typeof obj !== "object") return obj;
	if (Array.isArray(obj)) return obj.map(sortObject);
	const sortedKeys = Object.keys(obj).sort();
	const result: any = {};
	sortedKeys.forEach((key: any) => {
		result[key] = sortObject(obj[key])
	});
	return result;
}

export function encryptWithPrivatekey(data: any, privateKey: any){
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), privateKey).toString();
  return encryptedData
}

export function decryptWithPrivatekey(data: any, privateKey: any){
  const bytes  = CryptoJS.AES.decrypt(atob(data), privateKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}


export function getPdvHeaders(data: any, wallet: any){
  let hash;
  const hackPubKey = wallet.publicKey
  const publicKey = getKeyBytes(hackPubKey);
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const priv = getKeyBytes(wallet.privateKey);
  if (data instanceof Object) {
    hash = createHash('sha256').update(JSON.stringify(data) + '/v1/pdv').digest('hex');
  } else {
    hash = createHash('sha256').update('/v1/pdv/' + data).digest('hex');
  }
  const buf = Buffer.from(hash, 'hex');
  let signObj = secp256k1EcdsaSign(buf, priv);
  let signatureString = Buffer.from(signObj.signature).toString('hex');
  return {publicKeyHex, signatureString}
}
