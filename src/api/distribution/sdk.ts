import { Params } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import {
  QueryDelegationRewardsResponse,
  QueryDelegationTotalRewardsResponse
} from 'cosmjs-types/cosmos/distribution/v1beta1/query';
import {
  MsgSetWithdrawAddress,
  MsgWithdrawValidatorCommission,
  MsgWithdrawDelegatorReward,
} from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import {
  BroadcastTxResponse,
  Coin,
  DistributionExtension,
  QueryClient,
  setupDistributionExtension
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { Validator } from '../staking';
import { getMinGasPrice } from '../operations';
import { signAndBroadcast } from '../api-utils';

export class DecentrDistributionSDK {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & DistributionExtension,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrDistributionSDK> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupDistributionExtension,
    );

    return new DecentrDistributionSDK(nodeUrl, queryClient);
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
    return this.queryClient.distribution.delegationTotalRewards(delegatorAddress);
  }

  public getDelegatorRewardsFromValidator(
    delegatorAddress: Wallet['address'],
    validatorAddress: Validator['operator_address'],
  ): Promise<QueryDelegationRewardsResponse> {
    return this.queryClient.distribution.delegationRewards(
      delegatorAddress,
      validatorAddress,
    );
  }

  public getWithdrawAddress(delegatorAddress: Wallet['address']): Promise<Wallet['address']> {
    return this.queryClient.distribution.delegatorWithdrawAddress(delegatorAddress)
      .then((response) => response.withdrawAddress);
  }

  public getValidatorCommission(
    validatorAddress: Validator['operator_address'],
  ): Promise<Coin[]> {
    return this.queryClient.distribution.validatorCommission(validatorAddress)
      .then((response) => response.commission?.commission || []);
  }

  public getValidatorOutstandingRewards(
    validatorAddress: Validator['operator_address'],
  ): Promise<Coin[]> {
    return this.queryClient.distribution.validatorOutstandingRewards(validatorAddress)
      .then((response) => response.rewards?.rewards || []);
  }

  public async replaceWithdrawAddress(
    request: MsgSetWithdrawAddress,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
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

  public async withdrawDelegatorRewards(
    request: MsgWithdrawDelegatorReward[],
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const messages = request.map((msg) => ({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: msg,
    }));

    return signAndBroadcast(
      this.nodeUrl,
      messages,
      minGasPrice,
      privateKey,
    );
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

  public async withdrawValidatorRewards(
    request: MsgWithdrawValidatorCommission,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      minGasPrice,
      privateKey,
    );
  }
}
