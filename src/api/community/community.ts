import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { addGas, blockchainFetch } from '../api-utils';
import { broadcast, BroadcastResponse } from '../messages';
import { Account, getAccount } from '../profile';
import { StdTxMessageType } from '../types';
import {
  FollowingBroadcastOptions,
  LikeWeight,
  ModeratorAddressesResponse,
  PostBroadcastOptions,
  PostCreate,
  PostIdentificationParameters,
  QueryCreatePostResponse,
  QueryDeletePostResponse,
  QueryFollowResponse,
  QuerySetLikeResponse,
  QueryUnfollowResponse,
} from './types';

async function queryCreatePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
): Promise<QueryCreatePostResponse> {
  const url = `${apiUrl}/community/posts`;

  const queryParameters = {
    ...post,
    category: post.category.toString(),
  };

  const body = await addGas(queryParameters, chainId, url, walletAddress);

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
): Promise<BroadcastResponse<StdTxMessageType.CommunityCreatePost>>;

export async function createPost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  post: PostCreate,
  broadcastOptions?: PostBroadcastOptions,
): Promise<QueryCreatePostResponse | BroadcastResponse<StdTxMessageType.CommunityCreatePost>> {
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
): Promise<QueryDeletePostResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/delete`;

  const body = await addGas(undefined, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
): Promise<QueryDeletePostResponse>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  broadcastOptions: PostBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CommunityDeletePost>>;

export async function deletePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  broadcastOptions?: PostBroadcastOptions,
): Promise<QueryDeletePostResponse | BroadcastResponse<StdTxMessageType.CommunityDeletePost>> {
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
): Promise<QuerySetLikeResponse> {
  const url = `${apiUrl}/community/posts/${author}/${postId}/like`;

  const queryParameters = {
    weight: likeWeight,
  };

  const body = await addGas(queryParameters, chainId, url, walletAddress);

  return fetchJson(url, { method: 'POST', body });
}

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
): Promise<QuerySetLikeResponse>;

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
  broadcastOptions: PostBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CommunitySetLike>>;

export async function likePost(
  apiUrl: string,
  chainId: string,
  walletAddress: Wallet['address'],
  postIdentificationParameters: PostIdentificationParameters,
  likeWeight: LikeWeight,
  broadcastOptions?: PostBroadcastOptions,
): Promise<QuerySetLikeResponse | BroadcastResponse<StdTxMessageType.CommunitySetLike>> {
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

async function queryFollow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
): Promise<QueryFollowResponse> {
  const url = `${apiUrl}/community/followers/follow/${whom}`;

  const body = await addGas({}, chainId, url, follower);

  return fetchJson(url, { method: 'POST', body });
}

export async function follow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
): Promise<QueryFollowResponse>;

export async function follow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
  broadcastOptions: FollowingBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CommunityFollow>>;

export async function follow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
  broadcastOptions?: FollowingBroadcastOptions,
): Promise<QueryFollowResponse | BroadcastResponse<StdTxMessageType.CommunityFollow>> {
  const stdTxResponse = await queryFollow(
    apiUrl,
    chainId,
    follower,
    whom,
  );

  if (!broadcastOptions) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, follower) as Account;

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

async function queryUnfollow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
): Promise<QueryUnfollowResponse> {
  const url = `${apiUrl}/community/followers/unfollow/${whom}`;

  const body = await addGas({}, chainId, url, follower);

  return fetchJson(url, { method: 'POST', body });
}

export async function unfollow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
): Promise<QueryUnfollowResponse>;

export async function unfollow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
  broadcastOptions: FollowingBroadcastOptions,
): Promise<BroadcastResponse<StdTxMessageType.CommunityUnfollow>>;

export async function unfollow(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
  whom: Wallet['address'],
  broadcastOptions?: FollowingBroadcastOptions,
): Promise<QueryUnfollowResponse | BroadcastResponse<StdTxMessageType.CommunityUnfollow>> {
  const stdTxResponse = await queryUnfollow(
    apiUrl,
    chainId,
    follower,
    whom,
  );

  if (!broadcastOptions) {
    return stdTxResponse;
  }

  const account = await getAccount(apiUrl, follower) as Account;

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

export function getFollowees(
  apiUrl: string,
  chainId: string,
  follower: Wallet['address'],
): Promise<Wallet['address'][]> {
  return blockchainFetch<Wallet['address'][]>(
    `${apiUrl}/community/followers/${follower}/followees`,
  );
}
