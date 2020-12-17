import { KeyPair, Wallet } from '../wallet';
import { broadcast, BroadcastOptions, BroadcastResponse } from './messages'
import {
  Account,
  getAccount,
  getPrivateProfile,
  getPublicProfile,
  getTokenBalance,
  PrivateProfile,
  PrivateProfileBroadcastOptions,
  PublicProfile,
  PublicProfileBroadcastOptions,
  QueryPrivateProfileResponse,
  QueryPublicProfileResponse,
  setPrivateProfile,
  setPublicProfile,
} from './profile';
import {
  getPDVDetails,
  getPDVList,
  getPDVStats,
  PDV,
  PDVBroadcastOptions,
  PDVDetails,
  PDVListItem,
  PDVStatItem,
  QueryPDVResponse,
  sendPDV,
} from './pdv';
import { StdTxResponse, StdTxResponseValue } from './types'
import {
  createPost,
  deletePost,
  getLatestPosts,
  getLikedPosts,
  getPopularPosts,
  getUserPosts,
  likePost,
  LikeWeight,
  PopularPostsPeriod,
  Post,
  PostBroadcastOptions,
  PostCreate,
  PostIdentificationParameters,
  PostsFilterOptions,
  QueryCreatePostResponse,
  UserPostsFilterOptions,
} from './posts'

export class Decentr {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<number> {
    return getTokenBalance(this.apiUrl, walletAddress);
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | undefined> {
    return getAccount(this.apiUrl, walletAddress);
  }

  public getPublicProfile(walletAddress: Wallet['address']): Promise<PublicProfile> {
    return getPublicProfile(this.apiUrl, walletAddress);
  }

  public getPrivateProfile<T>(
    walletAddress: Wallet['address'],
    privateKey: Wallet['privateKey'],
  ): Promise<T | undefined> {
    return getPrivateProfile(this.apiUrl, walletAddress, privateKey);
  }

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
  ): Promise<QueryPublicProfileResponse>;

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
    broadcastOptions: PublicProfileBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
    broadcastOptions?: PublicProfileBroadcastOptions,
  ): Promise<QueryPublicProfileResponse | BroadcastResponse> {
    return setPublicProfile(
      this.apiUrl,
      this.chainId,
      walletAddress,
      publicProfile,
      broadcastOptions as PublicProfileBroadcastOptions
    );
  }

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
  ): Promise<QueryPrivateProfileResponse>;

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
    broadcastOptions: PrivateProfileBroadcastOptions
  ): Promise<BroadcastResponse>;

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
    broadcastOptions?: PrivateProfileBroadcastOptions
  ): Promise<QueryPrivateProfileResponse | BroadcastResponse> {
    return setPrivateProfile<T>(
      this.apiUrl,
      this.chainId,
      walletAddress,
      privateProfile,
      privateKey,
      broadcastOptions as PrivateProfileBroadcastOptions,
    );
  }

  public getPDVList(walletAddress: Wallet['address']): Promise<PDVListItem[]> {
    return getPDVList(this.apiUrl, walletAddress);
  }

  public getPDVStats(walletAddress: Wallet['address']): Promise<PDVStatItem[]> {
    return getPDVStats(this.apiUrl, walletAddress);
  }

  public getPDVDetails(pdvAddress: string, keys: KeyPair): Promise<PDVDetails> {
    return getPDVDetails(this.apiUrl, pdvAddress, keys);
  }

  public sendPDV(pdv: PDV, wallet: Wallet): Promise<QueryPDVResponse>;

  public sendPDV(
    pdv: PDV,
    wallet: Wallet,
    broadcastOptions: PDVBroadcastOptions,
  ): Promise<BroadcastResponse>;

  public sendPDV(
    pdv: PDV,
    wallet: Wallet,
    broadcastOptions?: PDVBroadcastOptions,
  ): Promise<QueryPDVResponse | BroadcastResponse> {
    return sendPDV(
      this.apiUrl,
      this.chainId,
      pdv,
      wallet,
      broadcastOptions as PDVBroadcastOptions,
    );
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

  public broadcast(
    stdTxValue: StdTxResponseValue,
    account: Pick<Account, 'account_number' | 'sequence'> & {
      privateKey: Wallet['privateKey'],
    },
    options: BroadcastOptions,
  ): Promise<BroadcastResponse> {
    return broadcast(this.apiUrl, this.chainId, stdTxValue, account, options);
  }
}
