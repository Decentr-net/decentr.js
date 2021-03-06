import { Wallet } from '../../wallet'
import { BroadcastResponse } from '../messages';
import { StdTxMessageType } from '../types';
import {
  createPost,
  deletePost,
  follow,
  getFollowees,
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
  QueryDeletePostResponse,
  QueryFollowResponse,
  QuerySetLikeResponse,
  QueryUnfollowResponse,
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
  ): Promise<BroadcastResponse<StdTxMessageType.CommunityCreatePost>>;

  public createPost(
    walletAddress: Wallet['address'],
    post: PostCreate,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<QueryCreatePostResponse | BroadcastResponse<StdTxMessageType.CommunityCreatePost>> {
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
  ): Promise<QueryDeletePostResponse>;

  public deletePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    broadcastOptions: PostBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CommunityDeletePost>>;

  public deletePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<QueryDeletePostResponse | BroadcastResponse<StdTxMessageType.CommunityDeletePost>> {
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
  ): Promise<QuerySetLikeResponse>;

  public likePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    likeWeight: LikeWeight,
    broadcastOptions: PostBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CommunitySetLike>>;

  public likePost(
    walletAddress: Wallet['address'],
    postIdentificationParameters: PostIdentificationParameters,
    likeWeight: LikeWeight,
    broadcastOptions?: PostBroadcastOptions,
  ): Promise<QuerySetLikeResponse | BroadcastResponse<StdTxMessageType.CommunitySetLike>> {
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
  ): Promise<QueryFollowResponse>;

  public follow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions: FollowingBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CommunityFollow>>;

  public follow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions?: FollowingBroadcastOptions,
  ): Promise<QueryFollowResponse | BroadcastResponse<StdTxMessageType.CommunityFollow>> {
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
  ): Promise<QueryUnfollowResponse>;

  public unfollow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions: FollowingBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CommunityUnfollow>>;

  public unfollow(
    follower: Wallet['address'],
    whom: Wallet['address'],
    broadcastOptions?: FollowingBroadcastOptions,
  ): Promise<QueryUnfollowResponse | BroadcastResponse<StdTxMessageType.CommunityUnfollow>> {
    return unfollow(
      this.apiUrl,
      this.chainId,
      follower,
      whom,
      broadcastOptions as FollowingBroadcastOptions,
    );
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return getFollowees(this.apiUrl, this.chainId, follower);
  }
}
