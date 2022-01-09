import { Params } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import {
  QueryDelegationTotalRewardsResponse
} from 'cosmjs-types/cosmos/distribution/v1beta1/query';
import { Validator } from 'cosmjs-types/cosmos/staking/v1beta1/staking';
import {
  Coin,
  DistributionExtension,
  QueryClient,
  setupDistributionExtension,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import {
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { Wallet } from '../../wallet';
import { correctDecodedCoin } from '../../utils';
import { createTypedEncodeObject } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner } from '../transaction-signer';

export class DecentrDistributionClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & DistributionExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrDistributionClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupDistributionExtension,
    );

    return new DecentrDistributionClient(nodeUrl, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getCommunityPool(): Promise<Coin[]> {
    return this.queryClient.distribution.communityPool()
      .then((response) => response.pool);
  }

  public getDistributionParameters(): Promise<Params> {
    return this.queryClient.distribution.params()
      .then((response) => response.params as Params);
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
    request: MsgSetWithdrawAddress,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.DistributionSetWithdrawAddress,
      request,
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public withdrawDelegatorRewards(
    request: MsgWithdrawDelegatorReward[],
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const messages = request.map((msg) => createTypedEncodeObject(
      TxMessageTypeUrl.DistributionWithdrawDelegatorReward,
      msg,
    ));

    return new TransactionSigner(
      this.nodeUrl,
      messages,
      privateKey,
      options,
    );
  }

  public withdrawValidatorRewards(
    request: MsgWithdrawValidatorCommission,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.DistributionWithdrawValidatorCommission,
      request,
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }
}
