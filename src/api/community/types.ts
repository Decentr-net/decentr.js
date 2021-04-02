import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';
import { StdTxMessageType, StdTxResponse } from '../types';

export type QueryCreatePostResponse = StdTxResponse<StdTxMessageType.CommunityCreatePost>;

export type QueryDeletePostResponse = StdTxResponse<StdTxMessageType.CommunityDeletePost>;

export type QuerySetLikeResponse = StdTxResponse<StdTxMessageType.CommunitySetLike>;

export type QueryFollowResponse = StdTxResponse<StdTxMessageType.CommunityFollow>;

export type QueryUnfollowResponse = StdTxResponse<StdTxMessageType.CommunityUnfollow>;

export type PostCreate = Pick<Post, 'category' | 'previewImage' | 'text' | 'title'>;

export interface PostIdentificationParameters {
  author: Post['owner'];
  postId: Post['uuid'];
}

export interface PostBroadcastOptions extends BroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
}

export interface FollowingBroadcastOptions extends BroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
}

export enum PostCategory {
  WorldNews = 1,
  TravelAndTourism,
  ScienceAndTechnology,
  StrangeWorld,
  ArtsAndEntertainment,
  WritersAndWriting,
  HealthAndFitness,
  CryptoAndBlockchain,
  Sports,
}

export enum LikeWeight {
  Up = 1,
  Zero = 0,
  Down = -1,
}

export interface Post {
  uuid: string;
  category: PostCategory;
  createdAt: number;
  dislikesCount: number;
  likesCount: number;
  owner: Wallet['address'];
  pdv: number;
  previewImage: string;
  text: string;
  title: string;
}

export type ModeratorAddressesResponse = string[];
