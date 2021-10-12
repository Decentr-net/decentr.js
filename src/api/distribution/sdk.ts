import { Wallet } from '../../wallet';
import { BroadcastResponse } from '../messages';
import { Validator } from '../staking';
import { DenomAmount, StdTxMessageType, StdTxResponse } from '../types';
import {
  getCommunityPool,
  getDelegatorRewards,
  getDistributionParameters,
  getValidatorDistribution,
  getWithdrawAddress,
  replaceWithdrawAddress,
  withdrawDelegatorRewards,
  withdrawValidatorRewards,
} from './distribution';
import {
  DelegatorRewards,
  DistributionBroadcastOptions,
  DistributionParameters,
  ValidatorDistribution
} from './types';

export class DecentrDistributionSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getDelegatorRewards(
    delegatorAddress: Wallet['address'],
  ): Promise<DelegatorRewards>;

  public getDelegatorRewards(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress: Validator['operator_address'],
  ): Promise<DenomAmount[]>;

  public getDelegatorRewards(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress?: Validator['operator_address'],
  ): Promise<DelegatorRewards | DenomAmount[]> {
    return getDelegatorRewards(this.apiUrl, delegatorAddress, fromValidatorAddress as string);
  }

  public getWithdrawAddress(delegatorAddress: Wallet['address']): Promise<Wallet['address']> {
    return getWithdrawAddress(this.apiUrl, delegatorAddress);
  }

  public replaceWithdrawAddress(
    delegatorAddress: Wallet['address'],
    withdrawAddress: Wallet['address'],
  ): Promise<StdTxResponse<StdTxMessageType.CosmosModifyWithdrawAddress>>;

  public replaceWithdrawAddress(
    delegatorAddress: Wallet['address'],
    withdrawAddress: Wallet['address'],
    broadcastOptions: DistributionBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosModifyWithdrawAddress>>;

  public replaceWithdrawAddress(
    delegatorAddress: Wallet['address'],
    withdrawAddress: Wallet['address'],
    broadcastOptions?: DistributionBroadcastOptions,
  ): Promise<StdTxResponse<StdTxMessageType.CosmosModifyWithdrawAddress> | BroadcastResponse<StdTxMessageType.CosmosModifyWithdrawAddress>> {
    return replaceWithdrawAddress(
      this.apiUrl,
      this.chainId,
      delegatorAddress,
      withdrawAddress,
      broadcastOptions as DistributionBroadcastOptions,
    );
  }

  public withdrawDelegatorRewards(
    delegatorAddress: Wallet['address'],
  ): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

  public withdrawDelegatorRewards(
    delegatorAddress: Wallet['address'],
    options: DistributionBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

  public withdrawDelegatorRewards(
    delegatorAddress: Wallet['address'],
    options: { fromValidatorAddress : Validator['operator_address'] },
  ): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

  public withdrawDelegatorRewards(
    delegatorAddress: Wallet['address'],
    options: DistributionBroadcastOptions & { fromValidatorAddress? : Validator['operator_address'] },
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>>;

  public withdrawDelegatorRewards(
    delegatorAddress: Wallet['address'],
    options?: DistributionBroadcastOptions & { fromValidatorAddress? : Validator['operator_address'] }
      | { fromValidatorAddress : Validator['operator_address'] },
  ): Promise<StdTxResponse<StdTxMessageType.CosmosWithdrawDelegationReward> | BroadcastResponse<StdTxMessageType.CosmosWithdrawDelegationReward>> {
    return withdrawDelegatorRewards(
      this.apiUrl,
      this.chainId,
      delegatorAddress,
      options as DistributionBroadcastOptions,
    );
  }

  public getValidatorDistribution(
    validatorAddress: Validator['operator_address'],
  ): Promise<ValidatorDistribution> {
    return getValidatorDistribution(
      this.apiUrl,
      validatorAddress,
    );
  }

  public withdrawValidatorRewards(
    walletAddress: Wallet['address'],
    validatorAddress: Validator['operator_address'],
  ): Promise<StdTxResponse<StdTxMessageType.Undefined>>;

  public withdrawValidatorRewards(
    walletAddress: Wallet['address'],
    validatorAddress: Validator['operator_address'],
    broadcastOptions: DistributionBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.Undefined>>;

  public withdrawValidatorRewards(
    walletAddress: Wallet['address'],
    validatorAddress: Validator['operator_address'],
    broadcastOptions?: DistributionBroadcastOptions,
  ): Promise<StdTxResponse<StdTxMessageType.Undefined> | BroadcastResponse<StdTxMessageType.Undefined>> {
    return withdrawValidatorRewards(
      this.apiUrl,
      this.chainId,
      walletAddress,
      validatorAddress,
      broadcastOptions as DistributionBroadcastOptions,
    );
  }

  public getCommunityPool(): Promise<DenomAmount[]> {
    return getCommunityPool(this.apiUrl);
  }

  public getDistributionParameters(): Promise<DistributionParameters> {
    return getDistributionParameters(this.apiUrl);
  }
}
