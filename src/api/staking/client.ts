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
import { BroadcastTxSuccess } from '@cosmjs/stargate/build/stargateclient';
import {
  MsgDelegateEncodeObject,
  MsgUndelegateEncodeObject,
  QueryClient,
  setupStakingExtension,
  StakingExtension,
  StargateClient,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { signAndBroadcast } from '../api-utils';
import { DelegateTokensRequest, RedelegateTokensRequest, UndelegateTokensRequest } from './types';

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
      .then((response) => response.validators);
  }

  public getValidator(address: Validator['operatorAddress']): Promise<Validator> {
    return this.queryClient.staking.validator(address)
      .then((response) => response.validator as Validator);
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

  // TODO
  // public calculateCreateDelegationFee(
  //   delegation: CreateDelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateDelegationFee(this.nodeUrl, this.chainId, delegation);
  // }

  public async delegateTokens(
    request: DelegateTokensRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxSuccess> {
    const message: MsgDelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
    );
  }

  // TODO
  // public calculateCreateUnbondingDelegationFee(
  //   unbondingDelegation: CreateUnbondingDelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateUnbondingDelegationFee(this.nodeUrl, this.chainId, unbondingDelegation);
  // }

  public async undelegateTokens(
    request: UndelegateTokensRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxSuccess> {
    const message: MsgUndelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
    );
  }

  // TODO
  // public calculateCreateRedelegationFee(
  //   redelegation: CreateRedelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateRedelegationFee(this.nodeUrl, this.chainId, redelegation);
  // }

  public async redelegateTokens(
    request: RedelegateTokensRequest,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxSuccess> {
    const message = {
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
    );
  }
}
