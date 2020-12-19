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
import { BaseRequest, QuerySimulateGasResponse } from './types';

const GAS_ADJUSTMENT: string = "1.35";
const GAS_LIMIT: string = "1000000";

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

  const estimatedGas = await querySimulateGas(bodyToEstimate, chainId, walletAddress, url);
  const gas = String((Number(estimatedGas) > Number(GAS_LIMIT)) ? GAS_LIMIT : estimatedGas);

  return {
    ...createBaseRequest({ chainId, walletAddress, gas }),
    ...body,
  }
}

async function querySimulateGas<T>(
    bodyToEstimate: T,
    chainId: string,
    walletAddress: Wallet['address'],
    url: string
): Promise<QuerySimulateGasResponse['gas_estimate']> {
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

  return fetchJson<QuerySimulateGasResponse>(url, {
    method: 'POST',
    body
  })
      .then(({ gas_estimate }) => gas_estimate);
}
