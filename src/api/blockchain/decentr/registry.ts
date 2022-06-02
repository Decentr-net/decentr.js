import { GeneratedType } from '@cosmjs/proto-signing';

import {
  MsgCreatePost,
  MsgDeletePost,
  MsgFollow,
  MsgSetLike,
  MsgUnfollow,
} from '../../../codec/community/tx';
import {
  MsgBurn,
  MsgDistributeRewards,
  MsgMint,
  MsgResetAccount,
} from '../../../codec/operations/tx';

export enum TxMessageTypeUrl {
  CommunityCreatePost = '/community.MsgCreatePost',
  CommunityDeletePost = '/community.MsgDeletePost',
  CommunityFollow = '/community.MsgFollow',
  CommunitySetLike = '/community.MsgSetLike',
  CommunityUnfollow = '/community.MsgUnfollow',
  OperationsBurn = '/operations.MsgBurn',
  OperationsDistributeRewards = '/operations.MsgDistributeRewards',
  OperationsMint = '/operations.MsgMint',
  OperationsResetAccount = '/operations.MsgResetAccount',
}

export const REGISTRY_MAP: Record<TxMessageTypeUrl, GeneratedType> = {
  [TxMessageTypeUrl.CommunityCreatePost]: MsgCreatePost,
  [TxMessageTypeUrl.CommunityDeletePost]: MsgDeletePost,
  [TxMessageTypeUrl.CommunityFollow]: MsgFollow,
  [TxMessageTypeUrl.CommunitySetLike]: MsgSetLike,
  [TxMessageTypeUrl.CommunityUnfollow]: MsgUnfollow,
  [TxMessageTypeUrl.OperationsBurn]: MsgBurn,
  [TxMessageTypeUrl.OperationsDistributeRewards]: MsgDistributeRewards,
  [TxMessageTypeUrl.OperationsMint]: MsgMint,
  [TxMessageTypeUrl.OperationsResetAccount]: MsgResetAccount,
};

export interface TxMessageValueMap {
  [TxMessageTypeUrl.CommunityCreatePost]: MsgCreatePost,
  [TxMessageTypeUrl.CommunityDeletePost]: MsgDeletePost,
  [TxMessageTypeUrl.CommunityFollow]: MsgFollow,
  [TxMessageTypeUrl.CommunitySetLike]: MsgSetLike,
  [TxMessageTypeUrl.CommunityUnfollow]: MsgUnfollow,
  [TxMessageTypeUrl.OperationsBurn]: MsgBurn,
  [TxMessageTypeUrl.OperationsDistributeRewards]: MsgDistributeRewards,
  [TxMessageTypeUrl.OperationsMint]: MsgMint,
  [TxMessageTypeUrl.OperationsResetAccount]: MsgResetAccount,
}
