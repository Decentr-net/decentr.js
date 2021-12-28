import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { createSignerOrSimulator, SignerOrSimulator } from '../api-utils';
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

  public createPost(
    request: CreatePostRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = {
      typeUrl: MessageTypeUrl.CreatePost,
      value: {
        post: request,
      },
    };

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      {
        ...options,
        registry: REGISTRY,
      },
    );
  }

  public deletePost(
    request: DeletePostRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = {
      typeUrl: MessageTypeUrl.DeletePost,
      value: request,
    };

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      {
        ...options,
        registry: REGISTRY,
      },
    );
  }

  public setLike(
    request: LikeRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = {
      typeUrl: MessageTypeUrl.SetLike,
      value: {
        like: request,
      },
    };

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      {
        ...options,
        registry: REGISTRY,
      },
    );
  }

  public follow(
    request: FollowRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = {
      typeUrl: MessageTypeUrl.Follow,
      value: request,
    };

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      {
        ...options,
        registry: REGISTRY,
      },
    );
  }

  public unfollow(
    request: UnfollowRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = {
      typeUrl: MessageTypeUrl.Unfollow,
      value: request,
    };

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      {
        ...options,
        registry: REGISTRY,
      },
    );
  }
}
