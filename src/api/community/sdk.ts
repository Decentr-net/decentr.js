import { Wallet } from '../../wallet'
import { BroadcastResponse } from '../messages';
import { StdTxResponse } from '../types';
import {
  createPost,
  deletePost,
  follow,
  getModeratorAddresses,
  likePost,
  unfollow,
} from './community';
import {
  FollowingBroadcastOptions,
  LikeWeight,
  ModeratorAddressesResponse,
  PostBroadcastOptions,
  PostCreate,
  PostIdentificationParameters,
  QueryCreatePostResponse,
} from './types';

export class DecentrCommunitySDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public createPost(
    walletAddress: Wallet['address'],
    post: PostCreate,
  ): Promise<QueryCreatePostResponse>;

  public createPost(
    walletAddress: Wallet['address'],
    post: PostCreate,
    broadcastOptions: PostBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public createPost(
    walletAddress: Wallet['address'],
    post: PostCreate,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<QueryCreatePostResponse | BroadcastResponse> {
    return createPost(
      this.apiUrl,
      this.chainId,
      walletAddress,
      post,
      broadcastOptions as PostBroadcastOptions,
    );
  }

  public deletePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
  ): Promise<StdTxResponse>;

  public deletePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    broadcastOptions: PostBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public deletePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<StdTxResponse | BroadcastResponse> {
    return deletePost(
      this.apiUrl,
      this.chainId,
      walletAddress,
      postIdentificationParameters,
      broadcastOptions as PostBroadcastOptions,
    );
  }

  public likePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    likeWeight: LikeWeight,
  ): Promise<StdTxResponse>;

  public likePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    likeWeight: LikeWeight,
    broadcastOptions: PostBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public likePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    likeWeight: LikeWeight,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<StdTxResponse | BroadcastResponse> {
    return likePost(
      this.apiUrl,
      this.chainId,
      walletAddress,
      postIdentificationParameters,
      likeWeight,
      broadcastOptions as PostBroadcastOptions,
    );
  }

  public getModeratorAddresses(): Promise<ModeratorAddressesResponse> {
    return getModeratorAddresses(this.apiUrl);
  }

  public follow(
    follower: Wallet['address'],
    whom: Wallet['address'],
  ): Promise<StdTxResponse>;

  public follow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions: FollowingBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public follow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions?: FollowingBroadcastOptions,
  ): Promise<StdTxResponse | BroadcastResponse> {
    return follow(
      this.apiUrl,
      this.chainId,
      follower,
      whom,
      broadcastOptions as FollowingBroadcastOptions,
    );
  }

  public unfollow(
    follower: Wallet['address'],
    whom: Wallet['address'],
  ): Promise<StdTxResponse>;

  public unfollow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions: FollowingBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public unfollow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions?: FollowingBroadcastOptions,
  ): Promise<StdTxResponse | BroadcastResponse> {
    return unfollow(
      this.apiUrl,
      this.chainId,
      follower,
      whom,
      broadcastOptions as FollowingBroadcastOptions,
    );
  }
}
