import { BroadcastTxResponse, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { Like, Post } from '../../codec/community/community';
import {
  MsgDeletePost,
  MsgFollow,
  MsgUnfollow,
} from '../../codec/community/tx';
import { getMinGasPrice } from '../operations/api';
import { signAndBroadcast } from '../api-utils';
import { CommunityExtension, setupCommunityExtension } from './extension';
import { MessageTypeUrl, REGISTRY } from './registry';

export class DecentrCommunityClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & CommunityExtension,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrCommunityClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupCommunityExtension,
    );

    return new DecentrCommunityClient(nodeUrl, queryClient);
  }

  public getModeratorAddresses(): Promise<Wallet['address'][]> {
    return this.queryClient.community.getModerators();
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return this.queryClient.community.getFollowees({ owner: follower });
  }

  public async createPost(
    request: Omit<Post, 'owner' | 'uuid'>,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.CreatePost,
      value: {
        post: request,
      },
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }

  public async deletePost(
    request: MsgDeletePost,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.DeletePost,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }

  public async setLike(
    request: Like,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.SetLike,
      value: {
        like: request,
      },
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }

  public async follow(
    request: MsgFollow,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.Follow,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }

  public async unfollow(
    request: MsgUnfollow,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: MessageTypeUrl.Unfollow,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
      REGISTRY,
    );
  }
}
