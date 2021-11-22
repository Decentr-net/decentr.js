import { Wallet } from '../../wallet';
import {
  delegateTokens,
  getDelegations,
  getDelegatorValidators,
  getPool,
  getRedelegations,
  getStakingParameters,
  getUnbondingDelegations,
  getUnbondingDelegationsFromValidator,
  getValidator,
  getValidatorDelegations,
  getValidators,
  getValidatorUnbondingDelegations,
  redelegateTokens,
  undelegateTokens,
  getDelegation,
} from './api';
import {
  DelegateTokensOptions,
  Delegation,
  Pool,
  RedelegateTokensOptions,
  Redelegation,
  RedelegationsFilterParameters,
  StakingParameters,
  UnbondingDelegation,
  UndelegateTokensOptions,
  Validator,
  ValidatorsFilterParameters,
} from './types';
import { BroadcastTxResponse } from '@cosmjs/stargate';

export class DecentrStakingSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getPool(): Promise<Pool> {
    return getPool(this.nodeUrl);
  }

  public getValidators(status?: ValidatorsFilterParameters): Promise<Validator[]> {
    return getValidators(this.nodeUrl, status);
  }

  public getValidator(address: Validator['operator_address']): Promise<Validator> {
    return getValidator(this.nodeUrl, address);
  }

  public getDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<Delegation[]> {
    return getDelegations(this.nodeUrl, delegatorAddress);
  }

  public getDelegation(
    delegatorAddress: Wallet['address'],
    validatorAddress: Validator['operator_address'],
  ): Promise<Delegation> {
    return getDelegation(this.nodeUrl, delegatorAddress, validatorAddress);
  }

  public getValidatorDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<Delegation[] | Delegation> {
    return getValidatorDelegations(this.nodeUrl, validatorAddress);
  }

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<UnbondingDelegation[]> {
    return getUnbondingDelegations(this.nodeUrl, delegatorAddress);
  }

  public getUnbondingDelegationsFromValidator(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress: Validator['operator_address'],
  ): Promise<UnbondingDelegation[] | UnbondingDelegation> {
    return getUnbondingDelegationsFromValidator(this.nodeUrl, delegatorAddress, fromValidatorAddress);
  }

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<UnbondingDelegation[] | UnbondingDelegation> {
    return getValidatorUnbondingDelegations(this.nodeUrl, validatorAddress);
  }

  public getRedelegations(
    delegatorAddress: Wallet['address'],
    filter?: RedelegationsFilterParameters,
  ): Promise<Redelegation[]> {
    return getRedelegations(this.nodeUrl, delegatorAddress, filter);
  }

  public getDelegatorValidators(
    delegatorAddress: Wallet['address'],
  ): Promise<Validator[]> {
    return getDelegatorValidators(this.nodeUrl, delegatorAddress);
  }

  public getStakingParameters(): Promise<StakingParameters> {
    return getStakingParameters(this.nodeUrl);
  }

  // TODO
  // public calculateCreateDelegationFee(
  //   delegation: CreateDelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateDelegationFee(this.nodeUrl, this.chainId, delegation);
  // }

  public delegateTokens(
    options: DelegateTokensOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return delegateTokens(
      this.nodeUrl,
      options,
      privateKey
    );
  }

  // TODO
  // public calculateCreateUnbondingDelegationFee(
  //   unbondingDelegation: CreateUnbondingDelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateUnbondingDelegationFee(this.nodeUrl, this.chainId, unbondingDelegation);
  // }

  public undelegateTokens(
    options: UndelegateTokensOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return undelegateTokens(
      this.nodeUrl,
      options,
      privateKey
    );
  }

  // TODO
  // public calculateCreateRedelegationFee(
  //   redelegation: CreateRedelegationRequest,
  // ): Promise<Coin[]> {
  //   return calculateCreateRedelegationFee(this.nodeUrl, this.chainId, redelegation);
  // }

  public redelegateTokens(
    options: RedelegateTokensOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return redelegateTokens(
      this.nodeUrl,
      options,
      privateKey,
    );
  }
}
