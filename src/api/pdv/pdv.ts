import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, createBaseRequest, getSignature } from '../api-utils'
import {
  CerberusAddressResponse,
  PDV,
  PDVBroadcastOptions,
  PDVDetails,
  PDVHeaders,
  PDVListItem,
  PDVListPaginationOptions,
  PDVStatItem,
  QueryPDVResponse,
} from './types';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';

function getCerberusAddress(apiUrl: string): Promise<string> {
  return blockchainFetch<CerberusAddressResponse>(
    `${apiUrl}/pdv/cerberus-addr`,
  )
    .then(({ address }) => address);
}

async function queryPDV(
  apiUrl: string,
  chainId: string,
  pdvAddress: string | number,
  walletAddress: string,
): Promise<QueryPDVResponse> {
  const url = `${apiUrl}/pdv`;

  const body = {
    ...createBaseRequest({ chainId, walletAddress }),
    id: pdvAddress.toString(),
  };

  return fetchJson(url, { method: 'POST', body });
}

export async function getPDVList(
  apiUrl: string,
  walletAddress: Wallet['address'],
  paginationOptions?: PDVListPaginationOptions,
): Promise<PDVListItem[]> {
  const cerberusAddress = await getCerberusAddress(apiUrl);

  return fetchJson(`${cerberusAddress}/v1/pdv/${walletAddress}`, {
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
  pdvAddress: number,
  wallet: Wallet,
): Promise<PDVDetails> {
  const cerberusAddress = await getCerberusAddress(apiUrl);

  const url = `${cerberusAddress}/v1/pdv/${wallet.address}/${pdvAddress}`;

  const headers = getPDVHeaders(`/v1/pdv/${wallet.address}/${pdvAddress}`, wallet);

  return fetchJson(url, { headers });
}

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV[],
  wallet: Wallet,
): Promise<QueryPDVResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV[],
  wallet: Wallet,
  broadcastOptions: PDVBroadcastOptions,
): Promise<BroadcastResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV[],
  wallet: Wallet,
  broadcastOptions?: PDVBroadcastOptions,
): Promise<QueryPDVResponse | BroadcastResponse> {
  const url = await getCerberusAddress(apiUrl) + '/v1/pdv';

  const body = {
    version: 'v1',
    pdv,
  };

  const headers = getPDVHeaders(`${JSON.stringify(body)}/v1/pdv`, wallet, { disableEncode: true });

  const pdvAddress = await fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(url, {
    method: 'POST',
    body,
    headers,
  }).then(({ id }) => id);

  const stdTxResponse = await queryPDV(apiUrl, chainId, pdvAddress, wallet.address);

  if (!broadcastOptions?.broadcast) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, wallet.address) as Account;

  return broadcast(
    apiUrl,
    chainId,
    stdTxResponse.value,
    {
      ...account,
      privateKey: wallet.privateKey,
    },
    broadcastOptions,
  );
}

function getPDVHeaders<T>(data: T, keys: KeyPair, options?: { disableEncode?: boolean }): PDVHeaders {
  const signature = getSignature(data, keys.privateKey, options);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
