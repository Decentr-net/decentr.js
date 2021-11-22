import { BroadcastTxResponse } from '@cosmjs/stargate';

import { createWalletFromPrivateKey, Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { signAndBroadcast } from '../api-utils';
import { getMinGasPrice } from '../operations';
import {
  CreatePostOptions,
  DeletePostOptions,
  FollowOptions,
  LikePostOptions,
  UnfollowOptions,
} from './types';

export function getModeratorAddresses(
  nodeUrl: string,
): Promise<Wallet['address'][]> {
  const url = `${nodeUrl}/decentr/community/moderators`;

  return fetchJson<{ moderators: Wallet['address'][] }>(url)
    .then((response) => response.moderators);
}

export function getFollowees(
  nodeUrl: string,
  follower: Wallet['address'],
): Promise<Wallet['address'][]> {
  const url = `${nodeUrl}/decentr/community/followers/${follower}/followed`;

  return fetchJson<{ followed: Wallet['address'][] }>(url)
    .then((response) => response.followed);
}

export async function createPost(
  nodeUrl: string,
  options: CreatePostOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/decentr/community/CreatePost',
    value: {
      post: options,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

export async function deletePost(
  nodeUrl: string,
  options: DeletePostOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: 'decentr/community/MsgDeletePost',
    value: {
      owner: wallet.address,
      postOwner: options.owner,
      postUuid: options.uuid,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

export async function likePost(
  nodeUrl: string,
  options: LikePostOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/decentr/community/SetLike',
    value: {
      owner: wallet.address,
      postOwner: options.owner,
      postUuid: options.uuid,
      weight: options.weight,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

export async function follow(
  nodeUrl: string,
  options: FollowOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/decentr/community/MsgFollow',
    value: {
      ...options,
      owner: wallet.address,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

export async function unfollow(
  nodeUrl: string,
  options: UnfollowOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/decentr/community/MsgUnfollow',
    value: {
      ...options,
      owner: wallet.address,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}
