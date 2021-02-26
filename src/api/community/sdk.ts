import { Wallet } from '../../wallet'
import { BroadcastResponse } from '../messages';
import { StdTxResponse } from '../types';
import {
  createPost,
  deletePost,
  getLatestPosts,
  getLikedPosts,
  getModeratorAddresses,
  getPopularPosts,
  getPost,
  getUserPosts,
  likePost,
} from './community';
import {
  LikeWeight,
  ModeratorAddressesResponse,
  PopularPostsPeriod,
  Post,
  PostBroadcastOptions,
  PostCreate,
  PostIdentificationParameters,
  PostsFilterOptions,
  QueryCreatePostResponse,
  UserPostsFilterOptions,
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

  public getPost(
    postIdentificationParameters: PostIdentificationParameters,
  ): Promise<Post> {
    return getPost(
      this.apiUrl,
      postIdentificationParameters,
    );
  }

  public getLatestPosts(filterOptions?: PostsFilterOptions): Promise<Post[]> {
    return getLatestPosts(
      this.apiUrl,
      filterOptions,
    );
  }

  public getUserPosts(
    walletAddress: Wallet['address'],
    filterOptions?: UserPostsFilterOptions,
  ): Promise<Post[]> {
    return getUserPosts(
      this.apiUrl,
      walletAddress,
      filterOptions,
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

  public getPopularPosts(
    period: PopularPostsPeriod,
    filterOptions?: PostsFilterOptions,
  ): Promise<Post[]> {
    return getPopularPosts(
      this.apiUrl,
      period,
      filterOptions,
    );
  }

  public getLikedPosts(
    walletAddress: Wallet['address']
  ): Promise<Record<Post['uuid'], LikeWeight.Down | LikeWeight.Up>> {
    return getLikedPosts(this.apiUrl, walletAddress);
  }

  public getModeratorAddresses(): Promise<ModeratorAddressesResponse> {
    return getModeratorAddresses(this.apiUrl);
  }
}
