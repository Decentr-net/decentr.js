import { Wallet } from '../../wallet'
import { BroadcastMode } from '../messages'
import { StdTxResponse } from '../types'

export type QueryCreatePostResponse = StdTxResponse<'community/CreatePost', Pick<Post, 'uuid' | 'category' | 'previewImage' | 'owner' | 'text' | 'title'>>;

export type PostCreate = Pick<Post, 'category' | 'previewImage' | 'text' | 'title'>;

export interface PostBroadcastOptions {
  broadcast: true,
  privateKey: Wallet['privateKey'];
  mode?: BroadcastMode,
}

export interface PostFilterOptions {
  category?: PostCategory;
  fromOwner?: Wallet['address'];
  fromUUID?: Post['uuid'];
  limit?: number;
}

export enum PostCategory {
  WorldNews = 1,
  TravelAndTourism,
  ScienceAndTechnology,
  StrangeWorld,
  HealthAndCulture,
  FitnessAndExercise
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
