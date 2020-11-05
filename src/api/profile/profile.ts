import { decrypt, encrypt, fetchJson } from '../../utils';
import { Wallet } from '../../wallet';
import { blockchainFetch } from '../api-utils';
import { broadcast, BroadcastMode, BroadcastResponse } from '../messages';
import {
  Account,
  PublicProfile,
  QueryPrivateProfileResponse,
  QueryPublicProfileResponse,
  TokenBalanceResponse,
} from './types';

function queryPublicProfile(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  publicProfile: PublicProfile,
): Promise<QueryPublicProfileResponse> {
  const endpoint = `${apiUrl}/profile/public/${walletAddress}`;

  const body = {
    base_req: {
      chain_id: chainId,
      from: walletAddress,
    },
    public: {
      gender: publicProfile.gender,
      birthday: publicProfile.birthday,
    },
  };

  return fetchJson(endpoint, { method: 'POST', body });
}

function queryPrivateProfile<T>(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  privateProfile: T,
  privateKey: Wallet['privateKey'],
): Promise<QueryPrivateProfileResponse> {
  const encrypted = encrypt(privateProfile, privateKey);

  const body = {
    base_req: {
      chain_id: chainId,
      from: walletAddress
    },
    private: encrypted,
  };

  const url = `${apiUrl}/profile/private/${walletAddress}`;

  return fetchJson(url, { method: 'POST', body });
}

export async function getAccount(apiUrl: string, walletAddress: Wallet['address']): Promise<Account | undefined> {
  const response = fetchJson(`${apiUrl}/auth/accounts/${walletAddress}`);

  if (!response) {
    return;
  }
}

export function getPublicProfile(apiUrl: string, walletAddress: Wallet['address']): Promise<PublicProfile> {
  return blockchainFetch(`${apiUrl}/profile/public/${walletAddress}`);
}

export function getPrivateProfile<T>(
  apiUrl: string,
  walletAddress: Wallet['address'],
  privateKey: Wallet['privateKey'],
): Promise<T> {
  return blockchainFetch<string>(`${apiUrl}/profile/private/${walletAddress}`)
    .then((encryptedPrivateProfile) => decrypt(encryptedPrivateProfile, privateKey));
}

export function getTokenBalance(apiUrl: string, walletAddress: Wallet['address']): Promise<number> {
  return blockchainFetch<TokenBalanceResponse>(`${apiUrl}/token/balance/${walletAddress}`)
    .then(({ balance }) => balance);
}

export async function setPublicProfile(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  publicProfile: PublicProfile,
): Promise<QueryPublicProfileResponse>;

export async function setPublicProfile(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  publicProfile: PublicProfile,
  broadcastOptions: {
    broadcast?: true,
    mode?: BroadcastMode,
    privateKey: Wallet['privateKey'],
  },
): Promise<BroadcastResponse>;

export async function setPublicProfile(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  publicProfile: PublicProfile,
  broadcastOptions?: {
    broadcast?: true,
    mode?: BroadcastMode,
    privateKey: Wallet['privateKey'],
  },
): Promise<QueryPublicProfileResponse | BroadcastResponse> {
  const stdTxResponse = await queryPublicProfile(apiUrl, chainId, walletAddress, publicProfile);

  if (!broadcastOptions) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, walletAddress) as Account;

  return broadcast(
    apiUrl,
    chainId,
    stdTxResponse.value,
    {
      ...account,
      privateKey: broadcastOptions.privateKey,
    },
    {
      mode: broadcastOptions.mode,
    });
}

export async function setPrivateProfile<T>(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  privateProfile: T,
  privateKey: Wallet['privateKey'],
): Promise<QueryPrivateProfileResponse>;

export async function setPrivateProfile<T>(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  privateProfile: T,
  privateKey: Wallet['privateKey'],
  broadcastOptions: {
    broadcast: true,
    mode?: BroadcastMode,
  }
): Promise<BroadcastResponse>;

export async function setPrivateProfile<T>(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  privateProfile: T,
  privateKey: Wallet['privateKey'],
  broadcastOptions?: {
    broadcast: true,
    mode?: BroadcastMode,
  }
): Promise<QueryPrivateProfileResponse | BroadcastResponse> {
  const stdTxResponse = await queryPrivateProfile(apiUrl, chainId, walletAddress, privateProfile, privateKey);

  if (!broadcastOptions) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, walletAddress) as Account;

  return broadcast(
    apiUrl,
    chainId,
    stdTxResponse.value,
    {
      ...account,
      privateKey,
    },
    {
      mode: broadcastOptions.mode,
    });
}
