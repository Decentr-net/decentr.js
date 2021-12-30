import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import {
  DelegationResponse,
  Params,
  Pool,
  RedelegationResponse,
  UnbondingDelegation,
  Validator,
} from 'cosmjs-types/cosmos/staking/v1beta1/staking';
import { BondStatusString } from '@cosmjs/stargate/build/queries/staking';
import {
  QueryClient,
  setupStakingExtension,
  StakingExtension,
  StargateClient,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { createSignerOrSimulator, createTypedEncodeObject, SignerOrSimulator } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { DelegateTokensRequest, RedelegateTokensRequest, UndelegateTokensRequest } from './types';
import { correctValidatorCommission } from './utils';

export class DecentrStakingClient {
  private constructor(
    private nodeUrl: string,
    private stargateClient: StargateClient,
    private queryClient: QueryClient & StakingExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrStakingClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupStakingExtension,
    );

    return new DecentrStakingClient(nodeUrl, stargateClient, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.stargateClient.disconnect();
    this.tmClient.disconnect();
  }

  public getPool(): Promise<Pool> {
    return this.queryClient.staking.pool()
      .then((response) => response.pool as Pool);
  }

  public getValidators(status: BondStatusString): Promise<Validator[]> {
    return this.queryClient.staking.validators(status)
      .then((response) => response.validators)
      .then((validators) => validators
        .map((validator) => correctValidatorCommission(validator))
      );
  }

  public getValidator(address: Validator['operatorAddress']): Promise<Validator> {
    return this.queryClient.staking.validator(address)
      .then((response) => response.validator as Validator)
      .then(correctValidatorCommission);
  }

  public getDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<DelegationResponse[]> {
    return this.queryClient.staking.delegatorDelegations(delegatorAddress)
      .then((response) => response.delegationResponses);
  }

  public getDelegation(
    delegatorAddress: Wallet['address'],
    validatorAddress: Validator['operatorAddress'],
  ): Promise<Coin | null> {
    return this.stargateClient.getDelegation(delegatorAddress, validatorAddress);
  }

  public getValidatorDelegations(
    validatorAddress: Validator['operatorAddress'],
  ): Promise<DelegationResponse[]> {
    return this.queryClient.staking.validatorDelegations(validatorAddress)
      .then((response) => response.delegationResponses);
  }

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<UnbondingDelegation[]> {
    return this.queryClient.staking.delegatorUnbondingDelegations(delegatorAddress)
      .then((response) => response.unbondingResponses);
  }

  public getUnbondingDelegation(
    delegatorAddress: Wallet['address'],
    validatorAddress: Validator['operatorAddress'],
  ): Promise<UnbondingDelegation | undefined> {
    return this.queryClient.staking.unbondingDelegation(delegatorAddress, validatorAddress)
      .then((response) => response.unbond);
  }

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operatorAddress'],
  ): Promise<UnbondingDelegation[]> {
    return this.queryClient.staking.validatorUnbondingDelegations(validatorAddress)
      .then((response) => response.unbondingResponses);
  }

  public getRedelegations(
    delegatorAddress: Wallet['address'],
    sourceValidatorAddress: Validator['operatorAddress'],
    destinationValidatorAddress: Validator['operatorAddress'],
  ): Promise<RedelegationResponse[]> {
    return this.queryClient.staking.redelegations(
      delegatorAddress,
      sourceValidatorAddress,
      destinationValidatorAddress,
    ).then((response) => response.redelegationResponses);
  }

  public getDelegatorValidators(
    delegatorAddress: Wallet['address'],
  ): Promise<Validator[]> {
    return this.queryClient.staking.delegatorValidators(delegatorAddress)
      .then((response) => response.validators);
  }

  public getStakingParameters(): Promise<Params> {
    return this.queryClient.staking.params()
      .then((response) => response.params as Params);
  }

  public delegateTokens(
    request: DelegateTokensRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingDelegate,
      request,
    );

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public undelegateTokens(
    request: UndelegateTokensRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingUndelegate,
      request,
    );

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public redelegateTokens(
    request: RedelegateTokensRequest,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): SignerOrSimulator {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingBeginRedelegate,
      request,
    );

    return createSignerOrSimulator(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }
}
