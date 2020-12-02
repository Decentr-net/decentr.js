import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch, createBaseRequest } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { StdTxResponse } from '../types';
import {
  PostBroadcastOptions,
  Post,
  PostCreate,
  QueryCreatePostResponse,
  PostsFilterOptions,
  PopularPostsPeriod,
  UserPostsFilterOptions
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

function queryDeletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postId: Post['uuid'],
): Promise<StdTxResponse> {
  const url = `${apiUrl}/community/posts/${walletAddress}/${postId}/delete`;

  const body = createBaseRequest({ chainId, walletAddress });

  return fetchJson(url, { method: 'POST', body });
}

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postId: Post['uuid'],
): Promise<StdTxResponse>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postId: Post['uuid'],
  broadcastOptions?: PostBroadcastOptions,
): Promise<BroadcastResponse>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postId: Post['uuid'],
  broadcastOptions?: PostBroadcastOptions,
): Promise<StdTxResponse | BroadcastResponse> {
  const stdTxResponse = await queryDeletePost(
    apiUrl,
    chainId,
    walletAddress,
    postId,
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
    {
      mode: broadcastOptions.mode,
    });
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
