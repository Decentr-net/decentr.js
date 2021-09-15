import { Bytes } from '@tendermint/types';
import { ecdsaSign as secp256k1EcdsaSign } from 'secp256k1';

import {
  bytesToHex,
  encodeObjectCharactersToUnicode,
  fetchJson,
  hashStringToBytes,
  hasOwnProperty,
  hexToBytes,
  sortObjectKeys,
} from '../utils';
import { KeyPair, Wallet } from '../wallet';
import { AuthHeaders, BaseRequest, Fee, QuerySimulateGasResponse } from './types';
import { getMinGasPrice } from './operations';

const GAS_ADJUSTMENT = 1.35;
const GAS_LIMIT = 1000000;

export async function blockchainFetch<T>(url: string, queryParameters?: Record<string, string | number>): Promise<T> {
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

export function createBaseRequest({
    chainId: chain_id,
    gas,
    simulate,
    walletAddress: from,
  }: {
    chainId: string;
    gas?: string;
    simulate?: boolean;
    walletAddress: Wallet['address'];
  }): BaseRequest {
  return {
    base_req: {
      chain_id,
      from,
      gas,
      simulate,
    },
  };
}

export async function addGas<T>(
  body: T,
  chainId: string,
  url: string,
  walletAddress: Wallet['address'],
): Promise<(BaseRequest & T)> {
  const bodyToEstimate = {
    ...createBaseRequest({ chainId, walletAddress }),
    ...body
  };

  const estimatedGas = await querySimulateGas(bodyToEstimate, chainId, walletAddress, url);

  const gasWanted = Math.ceil(+estimatedGas * GAS_ADJUSTMENT);
  const gas = Math.min(gasWanted, GAS_LIMIT).toString();

  return {
    ...createBaseRequest({ chainId, walletAddress, gas }),
    ...body,
  };
}

async function querySimulateGas<T>(
  bodyToEstimate: T,
  chainId: string,
  walletAddress: Wallet['address'],
  url: string
): Promise<QuerySimulateGasResponse['gas_estimate']> {
  const gasEstimateRequest = createBaseRequest({
    chainId,
    simulate: true,
    walletAddress,
  });

  const body = {
    ...bodyToEstimate,
    ...gasEstimateRequest,
  };

  return fetchJson<QuerySimulateGasResponse, BaseRequest & T>(url, {
    method: 'POST',
    body
  })
      .then(({ gas_estimate }) => gas_estimate);
}

export async function calculateTransactionFeeAmount(
  apiUrl: string,
  gas: string,
): Promise<Fee[]> {
  const minGasPrice = await getMinGasPrice(apiUrl).then((price) => price.amount);

  const decAmount = Math.ceil(+minGasPrice * +gas).toString();

  return [{
    amount: decAmount,
    denom: 'udec',
  }];
}
