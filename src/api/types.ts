import { Coin } from '@cosmjs/stargate';
import { Wallet } from '../wallet';
import { LikeWeight, Post } from './community';
import { Gender } from './pdv';
import { Validator, ValidatorCommission } from './staking';

export const DECENTR_DENOM = 'udec';

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
    amount: Coin;
    delegator_address: Wallet['address'];
    validator_dst_address: Validator['operator_address'];
    validator_src_address: Validator['operator_address'];
  };
  [StdTxMessageType.CosmosBeginUnbonding]: Record<string, unknown>;
  [StdTxMessageType.CosmosCreateValidator]: Pick<Validator, 'description' | 'min_self_delegation'> & {
    commission: ValidatorCommission['commission_rates'];
    delegator_address: string;
    pubkey: string;
    validator_address: string;
    value: Coin;
  };
  [StdTxMessageType.CosmosDelegate]: {
    amount: Coin;
    delegator_address: Wallet['address'];
    validator_address: Wallet['address'];
  };
  [StdTxMessageType.CosmosDeposit]: {
    amount: Coin[];
    depositor: Wallet['address'];
    proposal_id: string;
  };
  [StdTxMessageType.CosmosEditValidator]: Record<string, unknown>;
  [StdTxMessageType.CosmosFundCommunityPool]: {
    amount: Coin[];
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
    amount: Coin[];
    from_address: Wallet['address'];
    to_address: Wallet['address'];
  };
  [StdTxMessageType.CosmosUndelegate]: {
    amount: Coin;
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
    coin: Coin;
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

export enum BroadcastErrorCode {
  Undefined = 1,
  ParseError,
  InvalidSequence,
  Unauthorized,
  InsufficientFunds,
  UnknownRequest,
  InvalidAddress,
  InvalidPubKey,
  UnknownAddress,
  InvalidCoins,
  OutOfGas,
  MemoTooLarge,
  InsufficientFee,
  TooManySignatures,
  NoSignatures,
  JSONMarshal,
  JSONUnmarshal,
  InvalidRequest,
  TxInMemPoolCache,
  MemPoolIsFull,
  TxTooLarge,
  Panic = 111222,
}

export class BroadcastClientError {
  constructor(public readonly broadcastErrorCode: BroadcastErrorCode) {
  }
}

export interface AuthHeaders extends Record<string, string>{
  readonly 'Public-Key': string;
  readonly Signature: string;
}
