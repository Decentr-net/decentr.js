import { Wallet } from '../../wallet';
import { BroadcastOptions } from '../messages';
import { StdTxResponse } from '../types';

export type QueryCreatePostResponse = StdTxResponse<'community/CreatePost', Pick<Post, 'uuid' | 'category' | 'previewImage' | 'owner' | 'text' | 'title'>>;

export type QueryDeletePostResponse = StdTxResponse<'community/DeletePost', {
  postOwner: Wallet['address'];
  postUuid: Post['uuid'];
  owner: Wallet['address'];
}>;

export type QuerySetLikeResponse = StdTxResponse<'community/SetLike', {
  postOwner: Wallet['address'];
  postUuid: Post['uuid'];
  owner: Wallet['address'];
  weight: LikeWeight;
}>;

export type QueryFollowResponse = StdTxResponse<'community/MsgFollow', {
  owner: Wallet['address'];
  whom: Wallet['address'];
}>;

export type QueryUnfollowResponse = StdTxResponse<'community/MsgUnfollow', {
  owner: Wallet['address'];
  whom: Wallet['address'];
}>;

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
