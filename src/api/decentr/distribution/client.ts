import { Validator } from 'cosmjs-types/cosmos/staking/v1beta1/staking';
import { Coin, QueryClient, setupDistributionExtension } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { correctDecodedCoin } from '../../../utils';
import { Wallet } from '../../../wallet';
import { createTypedEncodeObject } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner, TransactionSignerFactory } from '../transaction-signer';
import {
  DistributionParams,
  QueryDelegationTotalRewardsResponse,
  SetWithdrawAddressRequest,
  WithdrawDelegatorRewardRequest,
  WithdrawValidatorCommissionRequest,
} from './types';

export class DecentrDistributionClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupDistributionExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getCommunityPool(): Promise<Coin[]> {
    return this.queryClient.distribution.communityPool()
      .then((response) => response.pool);
  }

  public getDistributionParameters(): Promise<DistributionParams> {
    return this.queryClient.distribution.params()
      .then((response) => response.params as DistributionParams);
  }

  public getDelegatorRewards(
    delegatorAddress: Wallet['address'],
  ): Promise<QueryDelegationTotalRewardsResponse> {
    return this.queryClient.distribution.delegationTotalRewards(delegatorAddress)
      .then((rewards) => ({
        rewards: rewards.rewards.map((reward) => ({
          ...reward,
          reward: reward.reward.map((coin) => correctDecodedCoin(coin)),
        })),
        total: rewards.total.map((coin) => correctDecodedCoin(coin)),
      }));
  }

  public getDelegatorRewardsFromValidator(
    delegatorAddress: Wallet['address'],
    validatorAddress: Validator['operatorAddress'],
  ): Promise<Coin[]> {
    return this.queryClient.distribution.delegationRewards(
      delegatorAddress,
      validatorAddress,
    )
      .then((response) => response.rewards)
      .then((coins) => coins.map((coin) => correctDecodedCoin(coin)));
  }

  public getWithdrawAddress(delegatorAddress: Wallet['address']): Promise<Wallet['address']> {
    return this.queryClient.distribution.delegatorWithdrawAddress(delegatorAddress)
      .then((response) => response.withdrawAddress);
  }

  public getValidatorCommission(
    validatorAddress: Validator['operatorAddress'],
  ): Promise<Coin[]> {
    return this.queryClient.distribution.validatorCommission(validatorAddress)
      .then((response) => (response.commission?.commission || []).map((coin) => correctDecodedCoin(coin)));
  }

  public getValidatorOutstandingRewards(
    validatorAddress: Validator['operatorAddress'],
  ): Promise<Coin[]> {
    return this.queryClient.distribution.validatorOutstandingRewards(validatorAddress)
      .then((response) => (response.rewards?.rewards || []).map((coin) => correctDecodedCoin(coin)));
  }

  public setWithdrawAddress(
    request: SetWithdrawAddressRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.DistributionSetWithdrawAddress,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public withdrawDelegatorRewards(
    request: WithdrawDelegatorRewardRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const messages = request.map((msg) => createTypedEncodeObject(
      TxMessageTypeUrl.DistributionWithdrawDelegatorReward,
      msg,
    ));

    return this.transactionSignerFactory(messages, options);
  }

  public withdrawValidatorRewards(
    request: WithdrawValidatorCommissionRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.DistributionWithdrawValidatorCommission,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }
}
