import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, getSignature } from '../api-utils';
import {
  PDV,
  PDVDetails,
  PDVHeaders,
  PDVListItem,
  PDVListPaginationOptions,
  PDVMeta,
  PDVAddress,
  TokenBalanceResponse,
  PDVType,
} from './types';

export function getTokenBalance(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<TokenBalanceResponse['balance']> {
  return blockchainFetch<TokenBalanceResponse>(
    `${apiUrl}/token/balance/${walletAddress}`
  )
    .then(({ balance }) => balance);
}

export function getRewards(
  cerberusUrl: string,
): Promise<Record<PDVType, number>> {
  return fetchJson(`${cerberusUrl}/v1/configs/rewards`);
}

export async function getPDVList(
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

export async function getPDVMeta(
  cerberusUrl: string,
  pdvAddress: number,
  walletAddress: Wallet['address'],
): Promise<PDVMeta> {
  return fetchJson(`${cerberusUrl}/v1/pdv/${walletAddress}/${pdvAddress}/meta`);
}

export async function getPDVDetails(
  cerberusUrl: string,
  pdvAddress: number,
  wallet: Wallet,
): Promise<PDVDetails> {
  const url = `${cerberusUrl}/v1/pdv/${wallet.address}/${pdvAddress}`;

  const headers = getPDVHeaders(`/v1/pdv/${wallet.address}/${pdvAddress}`, wallet);

  return fetchJson(url, { headers });
}

export async function sendPDV(
  cerberusUrl: string,
  pdv: PDV[],
  keyPair: KeyPair,
): Promise<PDVAddress> {
  const cerberusAddress = `${cerberusUrl}/v1/pdv`;

  const body = {
    version: 'v1',
    pdv,
  };

  const headers = getPDVHeaders(`${JSON.stringify(body)}/v1/pdv`, keyPair, { disableEncode: true });

  return await fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(cerberusAddress, {
    method: 'POST',
    body,
    headers,
  }).then(({ id }) => id);
}

function getPDVHeaders<T>(data: T, keys: KeyPair, options?: { disableEncode?: boolean }): PDVHeaders {
  const signature = getSignature(data, keys.privateKey, options);
  const signatureHex = bytesToHex(signature);

  return {
    'Public-Key': keys.publicKey,
    Signature: signatureHex,
  };
}
