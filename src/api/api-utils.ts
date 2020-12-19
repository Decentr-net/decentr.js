import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import {
  encodeObjectCharactersToUnicode,
  fetchJson,
  hashStringToBytes,
  hasOwnProperty,
  hexToBytes,
  sortObjectKeys
} from '../utils'
import { Wallet } from '../wallet';
import { BaseRequest } from './types';

const GAS_ADJUSTMENT: string = "1.35";
const GAS_LIMIT: string = "400000";

export async function blockchainFetch<T>(url: string, queryParameters?: Partial<Record<string, string | number>>): Promise<T> {
  const response = await fetchJson<{ height: string; result: T } | T>(url, { queryParameters });

  if (hasOwnProperty(response, 'height') &&
    hasOwnProperty(response, 'result')
  ) {
    return (response as { result: T }).result;
  }

  return response as T;
}

export function getSignature<T>(
  target: T,
  privateKey: Wallet['privateKey'],
): Bytes {
  const stringToHash = typeof target === 'string'
    ? target
    : JSON.stringify(sortObjectKeys(target));

  const encodedToUnicode = encodeObjectCharactersToUnicode(stringToHash, ['>', '<', '&']);

  const hashBytes = hashStringToBytes(encodedToUnicode);

  const privateKeyBytes = hexToBytes(privateKey);

  const signedObject = secp256k1EcdsaSign(hashBytes, privateKeyBytes);
  return signedObject.signature;
}

export function createBaseRequest({
    chainId: chain_id,
    gas,
    gas_adjustment: gasAdjustment,
    simulate,
    walletAddress: from,
  }: {
    chainId: string;
    gas?: string;
    gas_adjustment?: string;
    simulate?: boolean;
    walletAddress: Wallet['address'];
  }): {
   base_req: {
     chain_id: string,
     from: Wallet['address'],
     gas?: string,
     gas_adjustment?: string,
     simulate?: boolean,
  },
} {
  return {
    base_req: {
      chain_id,
      from,
      gas,
      gas_adjustment: gasAdjustment,
      simulate: simulate,
    },
  };
}

export async function addGas<T>(body: T, chainId: string, url: string, walletAddress: Wallet['address']): Promise<(BaseRequest & T)> {
  const bodyToEstimate = {
    ...createBaseRequest({ chainId, walletAddress }),
    ...body
  };

  const gasEstimated = await getGasEstimated(bodyToEstimate, chainId, walletAddress, url);
  const gas = String((Number(gasEstimated) > Number(GAS_LIMIT)) ? GAS_LIMIT : gasEstimated);

  return {
    ...createBaseRequest({ chainId, walletAddress, gas }),
    ...body,
  }
}

async function getGasEstimated<T>(bodyToEstimate: T, chainId: string, walletAddress: Wallet['address'], url: string) {
  const gasEstimateRequest = createBaseRequest({
    chainId,
    gas_adjustment: GAS_ADJUSTMENT,
    simulate: true,
    walletAddress
  });

  const body = {
    ...bodyToEstimate,
    ...gasEstimateRequest,
  };

  return fetchJson<{ gas_estimate: string }>(url, { method: 'POST', body }).then(res => res.gas_estimate);
}
