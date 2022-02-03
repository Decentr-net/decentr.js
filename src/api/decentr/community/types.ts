import { MsgCreatePost, MsgDeletePost, MsgFollow, MsgUnfollow } from '../../../codec/community/tx';
import { Like, Post as BlockchainPost } from '../../../codec/community/community';

export { Category as PostCategory, LikeWeight } from '../../../codec/community/community';

export interface Post extends BlockchainPost {
  createdAt: number;
  dislikesCount: number;
  likesCount: number;
  pdv: number;
  slug: string;
}

export type CreatePostRequest = MsgCreatePost['post'];
export type DeletePostRequest = MsgDeletePost;
export type FollowRequest = MsgFollow;
export type LikeRequest = Like;
export type UnfollowRequest = MsgUnfollow;
