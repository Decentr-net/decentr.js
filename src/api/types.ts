import { Wallet } from '../wallet';
import { LikeWeight, Post } from './community';
import { Gender } from './pdv';
import { Validator, ValidatorCommission } from './staking';

export interface DenomAmount {
  amount: string;
  denom: string;
}

export type Fee = DenomAmount;

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
  CosmosBeginRedelegate = 'cosmos-sdk/MsgBeginRedelegate',
  CosmosBeginUnbonding = 'cosmos-sdk/MsgBeginUnbonding',
  CosmosCreateValidator = 'cosmos-sdk/MsgCreateValidator',
  CosmosDelegate = 'cosmos-sdk/MsgDelegate',
  CosmosDeposit = 'cosmos-sdk/MsgDeposit',
  CosmosEditValidator = 'cosmos-sdk/MsgEditValidator',
  CosmosFundCommunityPool = 'cosmos-sdk/MsgFundCommunityPool',
  CosmosJail = 'cosmos-sdk/MsgJail',
  CosmosModifyWithdrawAddress = 'cosmos-sdk/MsgModifyWithdrawAddress',
  CosmosSend = 'cosmos-sdk/MsgSend',
  CosmosUndelegate = 'cosmos-sdk/MsgUndelegate',
  CosmosUnjail = 'cosmos-sdk/MsgUnjail',
  CosmosVote = 'cosmos-sdk/MsgVote',
  CosmosWithdrawDelegationReward = 'cosmos-sdk/MsgWithdrawDelegationReward',
  CosmosWithdrawValidatorCommission = 'cosmos-sdk/MsgWithdrawValidatorCommission',
  OperationsBanAccount = 'operations/MsgBanAccount',
  OperationsMint = 'operations/MsgMint',
  OperationsResetAccount = 'operations/MsgResetAccount',
  OperationsDistributeRewards = 'operations/DistributeRewards',

  // DEPRECATED
  PDVDistributeRewards = 'pdv/DistributeRewards',
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
  [StdTxMessageType.CosmosBeginRedelegate]: {
    amount: DenomAmount;
    delegator_address: Wallet['address'];
    validator_dst_address: Validator['operator_address'];
    validator_src_address: Validator['operator_address'];
  };
  [StdTxMessageType.CosmosBeginUnbonding]: {
  };
  [StdTxMessageType.CosmosCreateValidator]: Pick<Validator, 'description' | 'min_self_delegation'> & {
    commission: ValidatorCommission['commission_rates'];
    delegator_address: string;
    pubkey: string;
    validator_address: string;
    value: DenomAmount;
  };
  [StdTxMessageType.CosmosDelegate]: {
    amount: DenomAmount;
    delegator_address: Wallet['address'];
    validator_address: Wallet['address'];
  };
  [StdTxMessageType.CosmosDeposit]: {
    amount: DenomAmount[];
    depositor: Wallet['address'];
    proposal_id: string;
  };
  [StdTxMessageType.CosmosEditValidator]: {
  };
  [StdTxMessageType.CosmosFundCommunityPool]: {
    amount: DenomAmount[];
    depositor: Wallet['address'];
  };
  [StdTxMessageType.CosmosJail]: {
    address: Wallet['address'];
  };
  [StdTxMessageType.CosmosModifyWithdrawAddress]: {
    delegator_address: Wallet['address'];
    withdraw_address: Wallet['address'];
  };
  [StdTxMessageType.CosmosSend]: {
    amount: Fee[];
    from_address: Wallet['address'];
    to_address: Wallet['address'];
  };
  [StdTxMessageType.CosmosUndelegate]: {
    amount: DenomAmount;
    delegator_address: Wallet['address'];
    validator_address: Validator['operator_address'],
  }
  [StdTxMessageType.CosmosUnjail]: {
    address: Wallet['address'];
  };
  [StdTxMessageType.CosmosVote]: {
    proposal_id: string;
    voter: Wallet['address'];
    option: string;
  };
  [StdTxMessageType.CosmosWithdrawDelegationReward]: {
    delegator_address: Wallet['address'];
    validator_address: Validator['operator_address'];
  };
  [StdTxMessageType.CosmosWithdrawValidatorCommission]: {
    validator_address: Validator['operator_address'];
  };
  [StdTxMessageType.OperationsBanAccount]: {
    address: Wallet['address'];
    ban: boolean;
    owner: Wallet['address'];
  };
  [StdTxMessageType.OperationsMint]: {
    coin: DenomAmount;
    owner: Wallet['address'];
  };
  [StdTxMessageType.OperationsResetAccount]: {
    accountOwner: Wallet['address'];
    owner: Wallet['address'];
  };
  [StdTxMessageType.OperationsDistributeRewards]: {
    owner: Wallet['address'];
    rewards: {
      id: string;
      receiver: Wallet['address'];
      reward: string;
    }[];
  };

  // DEPRECATED
  [StdTxMessageType.PDVDistributeRewards]: {
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
    public: {
      avatar: string;
      bio: string;
      birthday: string;
      firstName: string;
      gender: Gender;
      lastName: string;
    };
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

export interface AuthHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
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
