import { Wallet } from '../wallet';
import { LikeWeight, Post } from './community';
import { Validator, ValidatorCommission } from './staking';

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
  CosmosCreateValidator = 'cosmos-sdk/MsgCreateValidator',
  CosmosSend = 'cosmos-sdk/MsgSend',
  OperationsResetAccount = 'operations/MsgResetAccount',
  PdvDistributeRewards = 'pdv/DistributeRewards',
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
  [StdTxMessageType.CosmosCreateValidator]: Pick<Validator, 'description' | 'min_self_delegation'> & {
    commission: ValidatorCommission['commission_rates'];
    delegator_address: string;
    pubkey: string;
    validator_address: string;
    value: {
      amount: string;
      denom: string;
    };
  },
  [StdTxMessageType.CosmosSend]: {
    amount: Fee[]
    from_address: Wallet['address'];
    to_address: Wallet['address'];
  };
  [StdTxMessageType.OperationsResetAccount]: {
    accountOwner: Wallet['address'];
    owner: Wallet['address'];
  };
  [StdTxMessageType.PdvDistributeRewards]: {
    owner: Wallet['address'];
    rewards: {
      id: string;
      receiver: Wallet['address'];
      reward: string;
    }[];
  };
}

export type StdTxMessageValue<K extends keyof StdTxMessageValueMap> = StdTxMessageValueMap[K];

export interface StdTxMessage<K extends keyof StdTxMessageValueMap> {
  readonly type: K;
  readonly value: StdTxMessageValue<K>;
}

export interface StdTxValue<K extends keyof StdTxMessageValueMap> {
  fee: StdTxFee;
  memo: string;
  msg: StdTxMessage<K>[];
  signatures: null;
}

export interface StdTx<K extends keyof StdTxMessageValueMap> {
  type: 'cosmos-sdk/StdTx';
  value: StdTxValue<K>;
}

export type StdTxResponseValue<K extends keyof StdTxMessageValueMap> = StdTxValue<K>;

export type StdTxResponse<K extends keyof StdTxMessageValueMap> = StdTx<K>;

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
