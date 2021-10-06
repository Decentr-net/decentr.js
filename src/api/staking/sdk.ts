import { Wallet } from '../../wallet';
import { BroadcastResponse } from '../messages';
import { StdTxMessageType } from '../types';
import {
  createDelegation,
  createRedelegation,
  createUnbondingDelegation,
  getDelegations,
  getDelegatorValidators,
  getPool,
  getRedelegations,
  getStakingParameters,
  getUnbondingDelegations,
  getValidator,
  getValidatorDelegations,
  getValidators,
  getValidatorUnbondingDelegations,
} from './staking';
import {
  CreateDelegationRequest,
  CreateRedelegationRequest,
  CreateUnbondingDelegationRequest,
  Delegation,
  DelegationBroadcastOptions,
  Pool,
  QueryCreateDelegationResponse,
  QueryCreateRedelegationResponse,
  QueryCreateUnbondingDelegationResponse,
  Redelegation,
  StakingParameters,
  UnbondingDelegation,
  Validator,
  ValidatorsFilterParameters,
} from './types';

export class DecentrStakingSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getPool(): Promise<Pool> {
    return getPool(this.apiUrl);
  }

  public getValidators(status?: ValidatorsFilterParameters): Promise<Validator[]> {
    return getValidators(this.apiUrl, status);
  }

  public getValidator(address: Validator['operator_address']): Promise<Validator> {
    return getValidator(this.apiUrl, address);
  }

  public getDelegations(delegatorAddress: Wallet['address']): Promise<Delegation[]> {
    return getDelegations(this.apiUrl, delegatorAddress);
  }

  public getValidatorDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<Delegation[]>;

  public getValidatorDelegations(
    validatorAddress: Validator['operator_address'],
    delegatorAddress: Wallet['address'],
  ): Promise<Delegation>;

  public getValidatorDelegations(
    validatorAddress: Validator['operator_address'],
    delegatorAddress?: Wallet['address'],
  ): Promise<Delegation[] | Delegation> {
    return getValidatorDelegations(validatorAddress, delegatorAddress as string);
  }

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<UnbondingDelegation[]> {
    return getUnbondingDelegations(this.apiUrl, delegatorAddress);
  }

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<UnbondingDelegation[]>;

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operator_address'],
    delegatorAddress: Wallet['address'],
  ): Promise<UnbondingDelegation>;

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operator_address'],
    delegatorAddress?: Wallet['address'],
  ): Promise<UnbondingDelegation[] | UnbondingDelegation> {
    return getValidatorUnbondingDelegations(validatorAddress, delegatorAddress as string);
  }

  public getRedelegations(): Promise<Redelegation[]> {
    return getRedelegations(this.apiUrl);
  }

  public getDelegatorValidators(
    delegatorAddress: Wallet['address'],
  ): Promise<Validator[]> {
    return getDelegatorValidators(this.apiUrl, delegatorAddress);
  }

  public getStakingParameters(): Promise<StakingParameters> {
    return getStakingParameters(this.apiUrl);
  }

  public createDelegation(
    delegation: CreateDelegationRequest,
  ): Promise<QueryCreateDelegationResponse>;

  public createDelegation(
    delegation: CreateDelegationRequest,
    broadcastOptions: DelegationBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosDelegate>>;

  public createDelegation(
    delegation: CreateDelegationRequest,
    broadcastOptions?: DelegationBroadcastOptions,
  ): Promise<QueryCreateDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosDelegate>> {
    return createDelegation(
      this.apiUrl,
      this.chainId,
      delegation,
      broadcastOptions as DelegationBroadcastOptions,
    );
  }

  public createUnbondingDelegation(
    unbondingDelegation: CreateUnbondingDelegationRequest,
  ): Promise<QueryCreateUnbondingDelegationResponse>;

  public createUnbondingDelegation(
    unbondingDelegation: CreateUnbondingDelegationRequest,
    broadcastOptions: DelegationBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosUndelegate>>;

  public createUnbondingDelegation(
    unbondingDelegation: CreateUnbondingDelegationRequest,
    broadcastOptions?: DelegationBroadcastOptions,
  ): Promise<QueryCreateUnbondingDelegationResponse | BroadcastResponse<StdTxMessageType.CosmosUndelegate>> {
    return createUnbondingDelegation(
      this.apiUrl,
      this.chainId,
      unbondingDelegation,
      broadcastOptions as DelegationBroadcastOptions,
    );
  }

  public createRedelegation(
    redelegation: CreateRedelegationRequest,
  ): Promise<QueryCreateRedelegationResponse>;

  public createRedelegation(
    redelegation: CreateRedelegationRequest,
    broadcastOptions: DelegationBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.CosmosBeginRedelegate>>;

  public createRedelegation(
    redelegation: CreateRedelegationRequest,
    broadcastOptions?: DelegationBroadcastOptions,
  ): Promise<QueryCreateRedelegationResponse | BroadcastResponse<StdTxMessageType.CosmosBeginRedelegate>> {
    return createRedelegation(
      this.apiUrl,
      this.chainId,
      redelegation,
      broadcastOptions as DelegationBroadcastOptions,
    );
  }
}
