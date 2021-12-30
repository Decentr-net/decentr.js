import { coin, EncodeObject, Registry } from '@cosmjs/proto-signing';
import {
  Coin,
  DeliverTxResponse,
  GasPrice,
  isDeliverTxFailure,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { coerceArray } from '../utils';
import { createSecp256k1WalletFromPrivateKey } from '../wallet';
import { getMinGasPrice } from './operations/standalone';
import { REGISTRY, TxMessageValueMap, TypedEncodeObject } from './registry';
import { BroadcastClientError, DECENTR_DENOM } from './types';

interface SignerWrapper {
  readonly disconnect: () => void;

  readonly signAndBroadcast: () => Promise<DeliverTxResponse>;

  readonly simulate: () => Promise<number>;
}

export function createDecentrCoin(amount: number | string): Coin {
  return coin(amount, DECENTR_DENOM);
}

export function createTypedEncodeObject<K extends keyof TxMessageValueMap>(
  typeUrl: K,
  value: TxMessageValueMap[K],
): TypedEncodeObject<K> {
  return {
    typeUrl,
    value,
  };
}

function assertIsBroadcastSuccess(result: DeliverTxResponse): void {
  if (isDeliverTxFailure(result)) {
    throw new BroadcastClientError(result.code);
  }
}

async function createSignerWrapper(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
  },
): Promise<SignerWrapper> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const gasPrice = GasPrice.fromString(minGasPrice.amount + minGasPrice.denom);

  const signingStargateClient = await SigningStargateClient.connectWithSigner(
    nodeUrl,
    wallet,
    {
      gasPrice,
      registry: REGISTRY,
    },
  );

  const accounts = await wallet.getAccounts();

  const address = accounts[0].address;

  const messagesArray = coerceArray(messages);

  return {
    disconnect: () => signingStargateClient.disconnect(),

    simulate: () => signingStargateClient
      .simulate(address, messagesArray, options?.memo),

    signAndBroadcast: () => signingStargateClient
      .signAndBroadcast(address, messagesArray, 'auto', options?.memo),
  };
}

async function simulate(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
  },
): Promise<number> {
  const signer = await createSignerWrapper(nodeUrl, messages, privateKey, options);

  const gas = await signer.simulate();

  signer.disconnect();

  return gas;
}

async function signAndBroadcast<K extends keyof TxMessageValueMap>(
  nodeUrl: string,
  messages: TypedEncodeObject<K> | TypedEncodeObject<K>[],
  privateKey: string,
  options?: {
    memo?: string,
  },
): Promise<DeliverTxResponse> {
  const signer = await createSignerWrapper(nodeUrl, messages, privateKey, options);

  const result = await signer.signAndBroadcast();

  signer.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}

export interface SignerOrSimulator {
  readonly signAndBroadcast: () => Promise<DeliverTxResponse>;

  readonly simulate: () => Promise<number>;
}

export function createSignerOrSimulator<K extends keyof TxMessageValueMap>(
  nodeUrl: string,
  messages: TypedEncodeObject<K> | TypedEncodeObject<K>[],
  privateKey: string,
  options?: {
    memo?: string,
  },
): SignerOrSimulator {
  return {
    signAndBroadcast: () => signAndBroadcast(nodeUrl, messages, privateKey, options),

    simulate: () => simulate(nodeUrl, messages, privateKey, options),
  };
}
