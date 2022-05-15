import { MsgCreatePost, MsgDeletePost, MsgFollow, MsgUnfollow } from '../../../../codec/community/tx';
import { Like } from '../../../../codec/community/community';

export { Category as PostCategory, LikeWeight } from '../../../../codec/community/community';

export type CreatePostRequest = MsgCreatePost['post'];
export type DeletePostRequest = MsgDeletePost;
export type FollowRequest = MsgFollow;
export type LikeRequest = Like;
export type UnfollowRequest = MsgUnfollow;
