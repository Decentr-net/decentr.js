import { LikeWeight, Post as BlockchainPost } from '../../../codec/community/community';
import { Wallet } from '../../../wallet';
import { PostCategory } from '../../decentr';
import { ProfileStatistics } from '../profile';

export interface Post extends BlockchainPost {
  createdAt: number;
  dislikesCount: number;
  likesCount: number;
  likeWeight: LikeWeight;
  pdv: number;
  slug: string;
}

export interface PostsListFilterOptions {
  after?: string;  // `Post['owner']/Post['uuid']`
  category?: PostCategory;
  followedBy?: Post['owner'];
  from?: Post['createdAt'];
  likedBy?: Post['owner'];
  limit?: number;
  orderBy?: 'asc' | 'desc';
  owner?: Post['owner'];
  requestedBy?: Wallet['address'];
  sortBy?: 'createdAt' | 'likesCount' | 'dislikesCount' | 'pdv';
  to?: Post['createdAt'];
}

export interface PostResponse {
  post: Post;
  profileStats: ProfileStatistics;
  stats: PostsListResponseStat[];
}

export interface PostsListResponseStat {
  date: string;
  value: Post['pdv'];
}

export interface PostsListResponse {
  posts: Post[];
  profileStats: Record<Post['owner'], ProfileStatistics>;
  stats: Record<string, PostsListResponseStat[]>; // [`owner/uuid`]: PostsListResponseStat
}