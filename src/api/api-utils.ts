import { coin, EncodeObject, Registry } from '@cosmjs/proto-signing';
import {
  Coin,
  DeliverTxResponse,
  GasPrice,
  isDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';

import { coerceArray } from '../utils';
import { createSecp256k1WalletFromPrivateKey } from '../wallet';
import { getMinGasPrice } from './operations/standalone';
import { BroadcastClientError, DECENTR_DENOM } from './types';

interface SignerWrapper {
  readonly disconnect: () => void;

  readonly signAndBroadcast: () => Promise<DeliverTxResponse>;

  readonly simulate: () => Promise<number>;
}

export function createDecentrCoin(amount: number | string): Coin {
  return coin(amount, DECENTR_DENOM);
}

function assertIsBroadcastSuccess(result: DeliverTxResponse): void {
  if (isDeliverTxSuccess(result)) {
    throw new BroadcastClientError(result.code);
  }
}

async function createSignerWrapper(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
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
      registry: options?.registry,
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

async function signAndBroadcast(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
  },
): Promise<DeliverTxResponse> {
  const signer = await createSignerWrapper(nodeUrl, messages, privateKey, options);

  const result = await signer.signAndBroadcast();

  signer.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}

export async function broadcastOrSimulate(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
    simulate?: boolean,
  },
): Promise<DeliverTxResponse | number> {
  return options?.simulate
    ? simulate(nodeUrl, messages, privateKey, options)
    : signAndBroadcast(nodeUrl, messages, privateKey, options);
}

export interface SignerOrSimulator {
  readonly signAndBroadcast: () => Promise<DeliverTxResponse>;

  readonly simulate: () => Promise<number>;
}

export function createSignerOrSimulator(
  nodeUrl: string,
  messages: EncodeObject | EncodeObject[],
  privateKey: string,
  options?: {
    memo?: string,
    registry?: Registry,
  },
): SignerOrSimulator {
  return {
    signAndBroadcast: () => signAndBroadcast(nodeUrl, messages, privateKey, options),

    simulate: () => simulate(nodeUrl, messages, privateKey, options),
  };
}
