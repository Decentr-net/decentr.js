import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import {
  QueryClient,
  setupStakingExtension,
  StargateClient,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../../wallet';
import { createTypedEncodeObject } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner, TransactionSignerFactory } from '../transaction-signer';
import {
  BondStatusString,
  DelegateTokensRequest,
  DelegationResponse,
  Pool,
  RedelegateTokensRequest,
  RedelegationResponse,
  StakingParams,
  UnbondingDelegation,
  UndelegateTokensRequest,
  Validator,
} from './types';
import { correctValidatorCommission } from './utils';

export class DecentrStakingClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupStakingExtension,
  );

  constructor(
    private readonly stargateClient: StargateClient,
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
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

  public getStakingParameters(): Promise<StakingParams> {
    return this.queryClient.staking.params()
      .then((response) => response.params as StakingParams);
  }

  public delegateTokens(
    request: DelegateTokensRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingDelegate,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public undelegateTokens(
    request: UndelegateTokensRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingUndelegate,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public redelegateTokens(
    request: RedelegateTokensRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.StakingBeginRedelegate,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }
}
