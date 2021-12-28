import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';
import { coin, EncodeObject, GeneratedType } from '@cosmjs/proto-signing';
import { Registry } from '@cosmjs/proto-signing/build/registry';
import { BroadcastTxSuccess } from '@cosmjs/stargate/build/stargateclient';
import {
  BroadcastTxResponse,
  Coin,
  isBroadcastTxFailure,
  SigningStargateClient,
} from '@cosmjs/stargate';

import {
  bytesToHex,
  coerceArray,
  encodeObjectCharactersToUnicode,
  hashStringToBytes,
  hexToBytes,
  sortObjectKeys,
} from '../utils';
import { createSecp256k1WalletFromPrivateKey, KeyPair, Wallet } from '../wallet';
import { AuthHeaders, BroadcastClientError, DECENTR_DENOM } from './types';

export function createDecentrCoin(amount: number | string): Coin {
  return coin(amount, DECENTR_DENOM);
}

export function getSignature<T>(
  target: T,
  privateKey: Wallet['privateKey'],
  options?: {
    disableEncode?: boolean,
  },
): Bytes {
  let stringToHash = typeof target === 'string'
    ? target
    : JSON.stringify(sortObjectKeys(target));

  if (!options?.disableEncode) {
    stringToHash = encodeObjectCharactersToUnicode(stringToHash, ['>', '<', '&']);
  }

  const hashBytes = hashStringToBytes(stringToHash);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);
  return signedObject.signature;
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

export function assertIsBroadcastSuccess(result: BroadcastTxResponse): void {
  if (isBroadcastTxFailure(result)) {
    throw new BroadcastClientError(result.code);
  }
}

export async function signAndBroadcast(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
  },
): Promise<BroadcastTxSuccess> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  // const minGasPrice = await getMinGasPrice(nodeUrl);

  // const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

  // TODO: replace with gasPrice
  const signingStargateClient = await SigningStargateClient
    .connectWithSigner(nodeUrl, wallet, { registry: options?.registry });
  // const signingStargateClient = await SigningStargateClient
  //   .connectWithSigner(nodeUrl, wallet, { gasPrice }, { registry });

  const accounts = await wallet.getAccounts();

  const result = await signingStargateClient.signAndBroadcast(
    accounts[0].address,
    coerceArray(messages),
    // TODO: change to 'auto'
    {
      amount: [createDecentrCoin(1)],
      gas: '1',
    },
    options?.memo,
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result as BroadcastTxSuccess;
}

export function createCustomRegistry(msgMap: Map<GeneratedType, string>): Registry {
  return new Registry([
    ...[...msgMap.entries()]
      .map(([msg, url]) => [url, msg] as [string, GeneratedType]),
  ]);
}
