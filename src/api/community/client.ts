import { DeliverTxResponse, QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { signAndBroadcast } from '../api-utils';
import { CommunityExtension, setupCommunityExtension } from './extension';
import { MessageTypeUrl, REGISTRY } from './registry';
import {
  CreatePostRequest,
  DeletePostRequest,
  FollowRequest,
  LikeRequest,
  UnfollowRequest,
} from './types';

export class DecentrCommunityClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & CommunityExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrCommunityClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupCommunityExtension,
    );

    return new DecentrCommunityClient(nodeUrl, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getModeratorAddresses(): Promise<Wallet['address'][]> {
    return this.queryClient.community.getModerators();
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return this.queryClient.community.getFollowees({ owner: follower });
  }

  public async createPost(
    request: CreatePostRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<DeliverTxResponse> {
    const message = {
      typeUrl: MessageTypeUrl.CreatePost,
      value: {
        post: request,
      },
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        registry: REGISTRY,
      }
    );
  }

  public async deletePost(
    request: DeletePostRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<DeliverTxResponse> {
    const message = {
      typeUrl: MessageTypeUrl.DeletePost,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        registry: REGISTRY,
      }
    );
  }

  public async setLike(
    request: LikeRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<DeliverTxResponse> {
    const message = {
      typeUrl: MessageTypeUrl.SetLike,
      value: {
        like: request,
      },
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        registry: REGISTRY,
      }
    );
  }

  public async follow(
    request: FollowRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<DeliverTxResponse> {
    const message = {
      typeUrl: MessageTypeUrl.Follow,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        registry: REGISTRY,
      }
    );
  }

  public async unfollow(
    request: UnfollowRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<DeliverTxResponse> {
    const message = {
      typeUrl: MessageTypeUrl.Unfollow,
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        registry: REGISTRY,
      }
    );
  }
}
