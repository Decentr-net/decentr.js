import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { addGas, blockchainFetch } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { StdTxResponse } from '../types';
import {
  LikeWeight,
  ModeratorAddressesResponse,
  PostBroadcastOptions,
  PostCreate,
  PostIdentificationParameters,
  QueryCreatePostResponse,
} from './types';

async function queryCreatePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
): Promise<QueryCreatePostResponse> {
  const url = `${apiUrl}/community/posts`;

  const queryParam = {
    ...post,
    category: post.category.toString(),
  };

  const body = await addGas(queryParam, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

export async function createPost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
): Promise<QueryCreatePostResponse>;

export async function createPost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
  broadcastOptions: PostBroadcastOptions,
): Promise<BroadcastResponse>;

export async function createPost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
  broadcastOptions?: PostBroadcastOptions,
): Promise<QueryCreatePostResponse | BroadcastResponse> {
  const stdTxResponse = await queryCreatePost(
    apiUrl,
    chainId,
    walletAddress,
    post,
  );

  if (!broadcastOptions?.broadcast) {
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
    broadcastOptions,
  );
}

async function queryDeletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  { author, postId }: PostIdentificationParameters,
): Promise<StdTxResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/delete`;

  const body = await addGas(null, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
): Promise<StdTxResponse>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  broadcastOptions: PostBroadcastOptions,
): Promise<BroadcastResponse>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  broadcastOptions?: PostBroadcastOptions,
): Promise<StdTxResponse | BroadcastResponse> {
  const stdTxResponse = await queryDeletePost(
    apiUrl,
    chainId,
    walletAddress,
    postIdentificationParameters,
  );

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
    broadcastOptions,
  );
}

export function getModeratorAddresses(
  apiUrl: string,
): Promise<ModeratorAddressesResponse> {
  return blockchainFetch<ModeratorAddressesResponse>(
    `${apiUrl}/community/moderators`
  );
}

async function queryLikePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  { author, postId }: PostIdentificationParameters,
  likeWeight: LikeWeight,
): Promise<StdTxResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/like`;

  const queryParam = {
    weight: likeWeight,
  };

  const body = await addGas(queryParam, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
): Promise<StdTxResponse>;

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
  broadcastOptions: PostBroadcastOptions,
): Promise<BroadcastResponse>;

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
  broadcastOptions?: PostBroadcastOptions,
): Promise<StdTxResponse | BroadcastResponse> {
  const stdTxResponse = await queryLikePost(
    apiUrl,
    chainId,
    walletAddress,
    postIdentificationParameters,
    likeWeight,
  );

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
    broadcastOptions,
  );
}
