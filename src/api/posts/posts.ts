import {
  CreatePostBroadcastOptions,
  PostCreate,
  QueryCreatePostResponse,
} from './types'
import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { getBaseRequest } from '../api-utils'
import { broadcast, BroadcastResponse } from '../messages'
import { Account, getAccount } from '../profile'

function queryCreatePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
): Promise<QueryCreatePostResponse> {
  const url = `${apiUrl}/community/posts`;

  const body = {
    ...getBaseRequest({ chainId, walletAddress }),
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
  broadcastOptions: CreatePostBroadcastOptions,
): Promise<BroadcastResponse>;

export async function createPost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
  broadcastOptions?: CreatePostBroadcastOptions,
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
