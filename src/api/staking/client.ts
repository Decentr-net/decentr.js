import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import {
  DelegationResponse,
  Params,
  Pool,
  RedelegationResponse,
  UnbondingDelegation,
  Validator,
} from 'cosmjs-types/cosmos/staking/v1beta1/staking';
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';
import { BondStatusString } from '@cosmjs/stargate/build/queries/staking';
import {
  BroadcastTxResponse,
  MsgDelegateEncodeObject,
  MsgUndelegateEncodeObject,
  QueryClient,
  setupStakingExtension,
  StakingExtension,
  StargateClient,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { getMinGasPrice } from '../operations/api';
import { signAndBroadcast } from '../api-utils';

export class DecentrStakingClient {
  private constructor(
    private nodeUrl: string,
    private stargateClient: StargateClient,
    private queryClient: QueryClient & StakingExtension,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrStakingClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupStakingExtension,
    );

    return new DecentrStakingClient(nodeUrl, stargateClient, queryClient);
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
    sourceValidatorAddress: string,
    destinationValidatorAddress: string,
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
    request: MsgDelegate,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message: MsgDelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
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
  // public calculateCreateUnbondingDelegationFee(
  //   unbondingDelegation: CreateUnbondingDelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateUnbondingDelegationFee(this.nodeUrl, this.chainId, unbondingDelegation);
  // }

  public async undelegateTokens(
    request: MsgUndelegate,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message: MsgUndelegateEncodeObject = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
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
  // public calculateCreateRedelegationFee(
  //   redelegation: CreateRedelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateRedelegationFee(this.nodeUrl, this.chainId, redelegation);
  // }

  public async redelegateTokens(
    request: MsgBeginRedelegate,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    const minGasPrice = await getMinGasPrice(this.nodeUrl);

    const message = {
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
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
