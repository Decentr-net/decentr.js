import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { getSignature } from '../api-utils';
import { SwapDestinationNetwork, SwapDetails, SwapHeaders, SwapListPaginationOptions } from './types';

export async function getFee(
  apiUrl: string,
  address: string,
  network: SwapDestinationNetwork,
  amount: number,
): Promise<string> {
  const url = `${apiUrl}/v1/fee`;

  return fetchJson<{ fee: string }>(url, {
    queryParameters: {
      address,
      network,
      amount,
    },
  }).then(({ fee }) => fee);
}

export async function getSwapById(
  apiUrl: string,
  wallet: Wallet,
  swapId: number,
): Promise<SwapDetails> {
  const url = `${apiUrl}/v1/swap/${swapId}`;

  const headers = getSwapHeaders(`/v1/swap/${swapId}`, wallet);

  return fetchJson(url, {
    headers,
  });
}

export async function getSwapList(
  apiUrl: string,
  wallet: Wallet,
  swapListPaginationOptions?: SwapListPaginationOptions,
): Promise<SwapDetails[]> {
  const url = `${apiUrl}/v1/swap`;

  const headers = getSwapHeaders(`/v1/swap`, wallet);

  return fetchJson(url, {
    headers,
    queryParameters: {
      ...swapListPaginationOptions,
    },
  });
}

export async function createSwap(
  apiUrl: string,
  wallet: Wallet,
  address: string,
  network: SwapDestinationNetwork,
): Promise<SwapDetails> {
  const url = `${apiUrl}/v1/swap`;

  const body = {
    destinationAddress: address,
    destinationNetwork: network,
  };

  const headers = getSwapHeaders(`${JSON.stringify(body)}/v1/swap`, wallet, { disableEncode: true });

  return fetchJson(url, {
    method: 'POST',
    body,
    headers,
  });
}

function getSwapHeaders<T>(data: T, keys: KeyPair, options?: { disableEncode?: boolean }): SwapHeaders {
  const signature = getSignature(data, keys.privateKey, options);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
