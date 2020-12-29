import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { addGas, blockchainFetch, getSignature } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import {
  CerberusAddressResponse,
  PDV,
  PDVBroadcastOptions,
  PDVDetails,
  PDVHeaders,
  PDVListItem, PDVListPaginationOptions,
  PDVStatItem, PDVType,
  QueryPDVAddressResponse,
  QueryPDVResponse
} from './types'

async function queryPDV(
  apiUrl: string,
  chainId: string,
  pdvAddress: string,
  pdvType: PDVType,
  walletAddress: string,
): Promise<QueryPDVResponse> {
  const url = `${apiUrl}/pdv`;

  const queryParam = {
    address: pdvAddress,
    type: pdvType,
  };

  const body = await addGas(queryParam, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

async function queryPDVAddress(
  apiUrl: string,
  pdv: PDV,
  keys: KeyPair,
): Promise<string> {
  const url = await getCerberusAddress(apiUrl) + '/v1/pdv';

  const headers = getPDVHeaders(`${JSON.stringify(pdv)}/v1/pdv`, keys);

  return fetchJson<QueryPDVAddressResponse, PDV>(url, {
    method: 'POST',
    body: pdv,
    headers,
  })
    .then(({ address }) => address);
}

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
  pdv: PDV,
  pdvType: PDVType,
  wallet: Wallet,
): Promise<QueryPDVResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV,
  pdvType: PDVType,
  wallet: Wallet,
  broadcastOptions: PDVBroadcastOptions,
): Promise<BroadcastResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV,
  pdvType: PDVType,
  wallet: Wallet,
  broadcastOptions?: PDVBroadcastOptions,
): Promise<QueryPDVResponse | BroadcastResponse> {
  const pdvAddress = await queryPDVAddress(apiUrl, pdv, wallet);
  const stdTxResponse = await queryPDV(apiUrl, chainId, pdvAddress, pdvType, wallet.address);

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

function getPDVHeaders<T>(data: T, keys: KeyPair): PDVHeaders {
  const signature = getSignature(data, keys.privateKey);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
