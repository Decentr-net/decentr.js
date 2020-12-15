import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch, createBaseRequest } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { StdTxResponse } from '../types';
import {
  LikeWeight,
  PostBroadcastOptions,
  Post,
  PostCreate,
  QueryCreatePostResponse,
  PostsFilterOptions,
  PopularPostsPeriod,
  UserPostsFilterOptions,
  PostIdentificationParameters
} from './types'

function queryCreatePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
): Promise<QueryCreatePostResponse> {
  const url = `${apiUrl}/community/posts`;

  const body = {
    ...createBaseRequest({ chainId, walletAddress }),
    ...post,
    category: post.category.toString(),
  };

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

function queryDeletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  { author, postId }: PostIdentificationParameters,
): Promise<StdTxResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/delete`;

  const body = createBaseRequest({ chainId, walletAddress });

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


export function getLatestPosts(
  apiUrl: string,
  filterOptions: PostsFilterOptions = {},
): Promise<Post[]> {
  return blockchainFetch(
    `${apiUrl}/community/posts`,
    {
      ...filterOptions,
    },
  );
}

export function getUserPosts(
  apiUrl: string,
  walletAddress: Wallet['address'],
  filterOptions: UserPostsFilterOptions = {},
): Promise<Post[]> {
  return blockchainFetch(
    `${apiUrl}/community/posts/${walletAddress}`,
    {
      ...filterOptions,
    },
  );
}

export function getPopularPosts(
  apiUrl: string,
  period: PopularPostsPeriod,
  filterOptions: PostsFilterOptions = {},
): Promise<Post[]> {
  const restPoint = `by` + period.charAt(0).toUpperCase() + period.slice(1);

  return blockchainFetch(
    `${apiUrl}/community/posts/popular/${restPoint}`,
    {
      ...filterOptions,
    },
  );
}

function queryLikePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  { author, postId }: PostIdentificationParameters,
  likeWeight: LikeWeight,
): Promise<StdTxResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/like`;

  const body = {
    ...createBaseRequest({ chainId, walletAddress }),
    weight: likeWeight,
  };

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
