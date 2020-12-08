import { Wallet } from '../../wallet'
import { BroadcastMode } from '../messages'
import { StdTxResponse } from '../types'

export type QueryCreatePostResponse = StdTxResponse<'community/CreatePost', Pick<Post, 'uuid' | 'category' | 'previewImage' | 'owner' | 'text' | 'title'>>;

export type PostCreate = Pick<Post, 'category' | 'previewImage' | 'text' | 'title'>;

export interface PostIdentificationParameters {
  author: Post['owner'];
  postId: Post['uuid'];
}

export type PopularPostsPeriod = 'day' | 'week' | 'month';

export interface PostBroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
  mode?: BroadcastMode,
}

export interface UserPostsFilterOptions {
  limit?: number;
  from?: Post['uuid'];
}

export type PostsFilterOptions = {
  category?: PostCategory;
  limit?: number;
} & ({
  fromOwner: Wallet['address'];
  fromUUID: Post['uuid'];
} | {
  fromOwner?: undefined;
  fromUUID?: undefined;
});

export enum PostCategory {
  WorldNews = 1,
  TravelAndTourism,
  ScienceAndTechnology,
  StrangeWorld,
  HealthAndCulture,
  FitnessAndExercise
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