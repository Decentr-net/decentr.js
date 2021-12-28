import { GeneratedType } from '@cosmjs/proto-signing';

import {
  MsgCreatePost,
  MsgDeletePost,
  MsgFollow,
  MsgSetLike,
  MsgUnfollow,
} from '../../codec/community/tx';
import { createCustomRegistry } from '../../utils';

export enum MessageTypeUrl {
  CreatePost = '/decentr.community.MsgCreatePost',
  DeletePost = '/decentr.community.MsgDeletePost',
  Follow = '/decentr.community.MsgFollow',
  SetLike = '/decentr.community.MsgSetLike',
  Unfollow = '/decentr.community.MsgUnfollow',
}

export const MESSAGE_TYPE_MAP = new Map<GeneratedType, string>([
  [MsgCreatePost, MessageTypeUrl.CreatePost],
  [MsgDeletePost, MessageTypeUrl.DeletePost],
  [MsgFollow, MessageTypeUrl.Follow],
  [MsgSetLike, MessageTypeUrl.SetLike],
  [MsgUnfollow, MessageTypeUrl.Unfollow],
] as [GeneratedType, string][]);

export const REGISTRY = createCustomRegistry(MESSAGE_TYPE_MAP);
