import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, getSignature } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import {
  CerberusAddressResponse,
  PDV,
  PDVBroadcastOptions,
  PDVDetails,
  PDVHeaders,
  PDVListItem,
  PDVStatItem,
  QueryPDVAddressResponse,
  QueryPDVResponse,
} from './types';

function queryPDV(
  apiUrl: string,
  chainId: string,
  walletAddress: string,
  pdvAddress: string,
): Promise<QueryPDVResponse> {
  const url = `${apiUrl}/pdv`;

  const body = {
    base_req: {
      chain_id: chainId,
      from: walletAddress,
    },
    address: pdvAddress,
  };

  return fetchJson(url, { method: 'POST', body });
}

async function queryPDVAddress(apiUrl: string, pdv: PDV, keys: KeyPair): Promise<string> {
  const url = await getCerberusAddress(apiUrl) + 'v1/pdv';

  const headers = getPDVHeaders(pdv, keys);

  return fetchJson<QueryPDVAddressResponse, PDV>(url, {
    method: 'POST',
    body: pdv,
    headers,
  })
    .then(({ address }) => address);
}

function getCerberusAddress(apiUrl: string): Promise<string> {
  return blockchainFetch<CerberusAddressResponse>(`${apiUrl}/pdv/cerberus-addr`)
    .then(({ address }) => address);
}

export function getPDVList(apiUrl: string, walletAddress: Wallet['address']): Promise<PDVListItem[]> {
  return blockchainFetch(`${apiUrl}/pdv/${walletAddress}/list`);
}

export function getPDVStats(apiUrl: string, walletAddress: Wallet['address']): Promise<PDVStatItem> {
  return blockchainFetch(`${apiUrl}/pdv/${walletAddress}/stats`);
}

export async function getPDVDetails(apiUrl: string, pdvAddress: string, keys: KeyPair): Promise<PDVDetails> {
  const cerberusAddress = await getCerberusAddress(apiUrl);

  const url = `${cerberusAddress}/v1/pdv/${pdvAddress}`;

  const headers = getPDVHeaders(pdvAddress, keys);

  return fetchJson(url, { headers });
}

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV,
  wallet: Wallet,
): Promise<QueryPDVResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV,
  wallet: Wallet,
  broadcastOptions: PDVBroadcastOptions,
): Promise<BroadcastResponse>;

export async function sendPDV(
  apiUrl: string,
  chainId: string,
  pdv: PDV,
  wallet: Wallet,
  broadcastOptions?: PDVBroadcastOptions,
): Promise<QueryPDVResponse | BroadcastResponse> {
  const pdvAddress = await queryPDVAddress(apiUrl, pdv, wallet);
  const stdTxResponse = await queryPDV(apiUrl, chainId, pdvAddress, wallet.address);

  if (!broadcastOptions) {
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
    {
      mode: broadcastOptions.mode,
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
