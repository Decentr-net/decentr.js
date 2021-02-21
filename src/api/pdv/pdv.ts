import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, getSignature } from '../api-utils'
import {
  PDV,
  PDVDetails,
  PDVHeaders,
  PDVListItem,
  PDVListPaginationOptions,
  PDVResponse,
  PDVStatItem,
} from './types';

export async function getPDVList(
  apiUrl: string,
  cerberusUrl: string,
  walletAddress: Wallet['address'],
  paginationOptions?: PDVListPaginationOptions,
): Promise<PDVListItem[]> {
  return fetchJson(`${cerberusUrl}/v1/pdv/${walletAddress}`, {
    queryParameters: {
      ...paginationOptions,
    },
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
  cerberusUrl: string,
  pdvAddress: number,
  wallet: Wallet,
): Promise<PDVDetails> {
  const url = `${cerberusUrl}/v1/pdv/${wallet.address}/${pdvAddress}`;

  const headers = getPDVHeaders(`/v1/pdv/${wallet.address}/${pdvAddress}`, wallet);

  return fetchJson(url, { headers });
}

export async function sendPDV(
  apiUrl: string,
  cerberusUrl: string,
  chainId: string,
  pdv: PDV[],
  wallet: Wallet,
): Promise<PDVResponse> {
  const cerberusAddress = `${cerberusUrl}/v1/pdv`;

  const body = {
    version: 'v1',
    pdv,
  };

  const headers = getPDVHeaders(`${JSON.stringify(body)}/v1/pdv`, wallet, { disableEncode: true });

  const pdvAddress = await fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(cerberusAddress, {
    method: 'POST',
    body,
    headers,
  }).then(({ id }) => id);

  return pdvAddress;
}

function getPDVHeaders<T>(data: T, keys: KeyPair, options?: { disableEncode?: boolean }): PDVHeaders {
  const signature = getSignature(data, keys.privateKey, options);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
