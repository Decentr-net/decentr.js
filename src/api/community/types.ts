import { Wallet } from '../../wallet';
import { MsgDeletePost, MsgFollow, MsgUnfollow } from '../../codec/community/tx';
import { Like } from '../../codec/community/community';

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

export type CreatePostRequest = Pick<Post, 'category' | 'previewImage' | 'text' | 'title'>;
export type DeletePostRequest = MsgDeletePost;
export type FollowRequest = MsgFollow;
export type LikeRequest = Like;
export type UnfollowRequest = MsgUnfollow;
