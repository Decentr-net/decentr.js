import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, getSignature } from '../api-utils'
import {
  CerberusAddressResponse,
  PDV,
  PDVDetails,
  PDVHeaders,
  PDVListItem,
  PDVListPaginationOptions,
  PDVStatItem,
} from './types';

function getCerberusAddress(apiUrl: string): Promise<string> {
  return blockchainFetch<CerberusAddressResponse>(
    `${apiUrl}/pdv/cerberus-addr`,
  )
    .then(({ address }) => address);
}

export function getPDVList(
  apiUrl: string,
  walletAddress: Wallet['address'],
  paginationOptions?: PDVListPaginationOptions,
): Promise<PDVListItem[]> {
  return blockchainFetch(`${apiUrl}/pdv/${walletAddress}/list`, {
    ...paginationOptions,
  });
}

export function getPDVStats(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<PDVStatItem[]> {
  return blockchainFetch(`${apiUrl}/token/stats/${walletAddress}`);
}

export async function getPDVDetails(
  apiUrl: string,
  pdvAddress: string,
  keys: KeyPair,
): Promise<PDVDetails> {
  const cerberusAddress = await getCerberusAddress(apiUrl);

  const url = `${cerberusAddress}/v1/pdv/${pdvAddress}`;

  const headers = getPDVHeaders(`/v1/pdv/${pdvAddress}`, keys);

  return fetchJson(url, { headers });
}

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV[],
  keys: KeyPair,
): Promise<string> {
  const url = await getCerberusAddress(apiUrl) + '/v1/pdv';

  const body = {
    version: 'v1',
    pdv,
  };

  const headers = getPDVHeaders(`${JSON.stringify(body)}/v1/pdv`, keys);

  return fetchJson<string, { version: string; pdv: PDV[] }>(url, {
    method: 'POST',
    body,
    headers,
  });
}

function getPDVHeaders<T>(data: T, keys: KeyPair): PDVHeaders {
  const signature = getSignature(data, keys.privateKey);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
