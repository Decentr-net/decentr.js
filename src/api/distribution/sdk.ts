import { BroadcastTxResponse, Coin } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';
import { Validator } from '../staking';
import {
  getCommunityPool,
  getDelegatorRewards,
  getDelegatorRewardsFromValidator,
  getDistributionParameters,
  getValidatorCommission,
  getValidatorOutstandingRewards,
  getWithdrawAddress,
  withdrawDelegatorRewards,
  withdrawValidatorRewards,
  replaceWithdrawAddress,
} from './api';
import { DelegatorRewards, DistributionParameters } from './types';

export class DecentrDistributionSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getCommunityPool(): Promise<Coin[]> {
    return getCommunityPool(this.nodeUrl);
  }

  public getDistributionParameters(): Promise<DistributionParameters> {
    return getDistributionParameters(this.nodeUrl);
  }

  public getDelegatorRewards(
    delegatorAddress: Wallet['address'],
  ): Promise<DelegatorRewards> {
    return getDelegatorRewards(this.nodeUrl, delegatorAddress);
  }

  public getDelegatorRewardsFromValidator(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress: Validator['operator_address'],
  ): Promise<DelegatorRewards | Coin[]> {
    return getDelegatorRewardsFromValidator(this.nodeUrl, delegatorAddress, fromValidatorAddress);
  }

  public getWithdrawAddress(delegatorAddress: Wallet['address']): Promise<Wallet['address']> {
    return getWithdrawAddress(this.nodeUrl, delegatorAddress);
  }

  public getValidatorCommission(
    validatorAddress: Validator['operator_address'],
  ): Promise<Coin[]> {
    return getValidatorCommission(this.nodeUrl, validatorAddress);
  }

  public getValidatorOutstandingRewards(
    validatorAddress: Validator['operator_address'],
  ): Promise<Coin[]> {
    return getValidatorOutstandingRewards(
      this.nodeUrl,
      validatorAddress,
    );
  }

  public replaceWithdrawAddress(
    withdrawAddress: Wallet['address'],
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return replaceWithdrawAddress(
      this.nodeUrl,
      withdrawAddress,
      privateKey,
    );
  }

  // TODO
  // public calculateWithdrawDelegatorRewardsFee(
  //   delegatorAddress: Wallet['address'],
  //   fromValidatorAddress? : Validator['operator_address']
  // ): Promise<Coin[]> {
  //   return calculateWithdrawDelegatorRewardsFee(
  //     this.apiUrl,
  //     delegatorAddress,
  //     fromValidatorAddress,
  //   );
  // }

  public withdrawDelegatorRewards(
    validatorAddresses: Validator['operator_address'][],
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return withdrawDelegatorRewards(this.nodeUrl, validatorAddresses, privateKey);
  }

  // TODO: deprecated?
  // public getValidatorDistribution(
  //   validatorAddress: Validator['operator_address'],
  // ): Promise<ValidatorDistribution> {
  //   return getValidatorDistribution(
  //     this.apiUrl,
  //     validatorAddress,
  //   );
  // }

  // TODO
  // public calculateWithdrawValidatorRewardsFee(
  //   walletAddress: Wallet['address'],
  //   validatorAddress : Validator['operator_address']
  // ): Promise<Fee[]> {
  //   return calculateWithdrawValidatorRewardsFee(
  //     this.apiUrl,
  //     walletAddress,
  //     validatorAddress,
  //   );
  // }

  public withdrawValidatorRewards(
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return withdrawValidatorRewards(
      this.nodeUrl,
      privateKey,
    );
  }
}
