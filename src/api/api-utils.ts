import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';
import { coin, EncodeObject } from '@cosmjs/proto-signing';
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
  minGasPrice: Coin,
  privateKey: string,
): Promise<BroadcastTxResponse> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  // const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

  // TODO: replace with gasPrice
  const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet);
  // const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet, { gasPrice });

  const accounts = await wallet.getAccounts();

  const result = await signingStargateClient.signAndBroadcast(
    accounts[0].address,
    coerceArray(messages),
    // TODO: change to 'auto'
    {
      amount: [createDecentrCoin(1)],
      gas: '1',
    },
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}
