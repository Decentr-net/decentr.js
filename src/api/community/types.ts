import { Wallet } from '../../wallet';

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
  slug: string;
  text: string;
  title: string;
}

export type CreatePostOptions = Pick<Post, 'category' | 'previewImage' | 'text' | 'title'>;

export type DeletePostOptions = Pick<Post, 'uuid' | 'owner'>;

export interface LikePostOptions extends Pick<Post, 'uuid' | 'owner'> {
  weight: LikeWeight;
}

export interface FollowOptions {
  whom: Wallet['address'];
}

export type UnfollowOptions = FollowOptions;
