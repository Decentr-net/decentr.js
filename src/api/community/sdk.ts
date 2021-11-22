import { BroadcastTxResponse } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';
import {
  createPost,
  deletePost,
  likePost,
  getModeratorAddresses,
  getFollowees,
  follow,
  unfollow,
} from './api';
import {
  CreatePostOptions,
  DeletePostOptions,
  FollowOptions,
  LikePostOptions,
  UnfollowOptions,
} from './types';

export class DecentrCommunitySDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getModeratorAddresses(): Promise<Wallet['address'][]> {
    return getModeratorAddresses(this.nodeUrl);
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return getFollowees(this.nodeUrl, follower);
  }

  public createPost(
    post: CreatePostOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return createPost(
      this.nodeUrl,
      post,
      privateKey,
    );
  }

  public deletePost(
    options: DeletePostOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return deletePost(
      this.nodeUrl,
      options,
      privateKey,
    );
  }

  public likePost(
    options: LikePostOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return likePost(
      this.nodeUrl,
      options,
      privateKey,
    );
  }

  public follow(
    options: FollowOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return follow(
      this.nodeUrl,
      options,
      privateKey,
    );
  }

  public unfollow(
    options: UnfollowOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return unfollow(
      this.nodeUrl,
      options,
      privateKey,
    );
  }
}
