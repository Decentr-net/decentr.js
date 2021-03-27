import { Wallet } from '../wallet';
import { LikeWeight, Post } from './community';
import { PublicProfile } from './profile';

export interface Fee {
  readonly amount: string;
  readonly denom: string;
}

export interface StdTxFee {
  readonly amount: Fee[];
  readonly gas: string;
}

export enum StdTxMessageType {
  CommunityCreatePost = 'community/CreatePost',
  CommunityDeletePost = 'community/DeletePost',
  CommunityFollow = 'community/MsgFollow',
  CommunitySetLike = 'community/SetLike',
  CommunityUnfollow = 'community/MsgUnfollow',
  CosmosSend = 'cosmos-sdk/MsgSend',
  PdvDistributeRewards = 'pdv/DistributeRewards',
  ProfileSetPrivate = 'profile/SetPrivate',
  ProfileSetPublic = 'profile/SetPublic',
}

export interface StdTxMessageValueMap {
  [StdTxMessageType.CommunityCreatePost]: Pick<Post, 'uuid' | 'category' | 'previewImage' | 'owner' | 'text' | 'title'>;
  [StdTxMessageType.CommunityDeletePost]: {
    owner: Wallet['address'];
    postOwner: Wallet['address'];
    postUUID: Post['uuid'];
  };
  [StdTxMessageType.CommunityFollow]: {
    owner: Wallet['address'];
    whom: Wallet['address'];
  };
  [StdTxMessageType.CommunitySetLike]: {
    owner: Wallet['address'];
    postOwner: Wallet['address'];
    postUUID: Post['uuid'];
    weight: LikeWeight;
  };
  [StdTxMessageType.CommunityUnfollow]: {
    owner: Wallet['address'];
    whom: Wallet['address'];
  };
  [StdTxMessageType.CosmosSend]: {
    amount: Fee[]
    from_address: Wallet['address'];
    to_address: Wallet['address'];
  };
  [StdTxMessageType.PdvDistributeRewards]: {
    owner: Wallet['address'];
    rewards: {
      id: string;
      receiver: Wallet['address'];
      reward: string;
    }[];
  };
  [StdTxMessageType.ProfileSetPrivate]: {
    owner: Wallet['address'];
    private: string;
  };
  [StdTxMessageType.ProfileSetPublic]: {
    owner: Wallet['address'];
    public: PublicProfile;
  };
}

export interface StdTxMessage<K extends keyof StdTxMessageValueMap> {
  readonly type: K;
  readonly value: StdTxMessageValueMap[K];
}

export interface StdTxResponseValue<K extends keyof StdTxMessageValueMap> {
  readonly fee: StdTxFee;
  readonly memo: string;
  readonly msg: StdTxMessage<K>[];
  readonly signatures: null;
}

export interface StdTxResponse<K extends keyof StdTxMessageValueMap> {
  readonly type: 'cosmos-sdk/StdTx';
  readonly value: StdTxResponseValue<K>;
}

export interface BaseRequest {
  readonly base_req: {
    readonly chain_id: string,
    readonly from: Wallet['address'],
    readonly gas?: string,
    readonly gas_adjustment?: string,
    readonly simulate?: boolean,
  },
}

export interface QuerySimulateGasResponse {
  readonly gas_estimate: string;
}
