import { Wallet } from '../../wallet';
import { BroadcastResponse } from '../messages';
import { Fee, StdTxMessageType } from '../types';
import {
  calculateCreateDelegationFee,
  calculateCreateRedelegationFee,
  calculateCreateUnbondingDelegationFee,
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
  RedelegationsFilterParameters,
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

  public getDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<Delegation[]>;

  public getDelegations(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress: Validator['operator_address'],
  ): Promise<Delegation>;

  public getDelegations(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress?: Validator['operator_address'],
  ): Promise<Delegation[] | Delegation> {
    return getDelegations(this.apiUrl, delegatorAddress, fromValidatorAddress as string);
  }

  public getValidatorDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<Delegation[] | Delegation> {
    return getValidatorDelegations(this.apiUrl, validatorAddress);
  }

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
  ): Promise<UnbondingDelegation[]>

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress: Validator['operator_address'],
  ): Promise<UnbondingDelegation>

  public getUnbondingDelegations(
    delegatorAddress: Wallet['address'],
    fromValidatorAddress?: Validator['operator_address'],
  ): Promise<UnbondingDelegation[] | UnbondingDelegation> {
    return getUnbondingDelegations(this.apiUrl, delegatorAddress, fromValidatorAddress as string);
  }

  public getValidatorUnbondingDelegations(
    validatorAddress: Validator['operator_address'],
  ): Promise<UnbondingDelegation[] | UnbondingDelegation> {
    return getValidatorUnbondingDelegations(this.apiUrl, validatorAddress);
  }

  public getRedelegations(
    filter?: RedelegationsFilterParameters,
  ): Promise<Redelegation[]> {
    return getRedelegations(this.apiUrl, filter);
  }

  public getDelegatorValidators(
    delegatorAddress: Wallet['address'],
  ): Promise<Validator[]> {
    return getDelegatorValidators(this.apiUrl, delegatorAddress);
  }

  public getStakingParameters(): Promise<StakingParameters> {
    return getStakingParameters(this.apiUrl);
  }

  public calculateCreateDelegationFee(
    delegation: CreateDelegationRequest,
  ): Promise<Fee[]> {
    return calculateCreateDelegationFee(this.apiUrl, this.chainId, delegation);
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

  public calculateCreateUnbondingDelegationFee(
    unbondingDelegation: CreateUnbondingDelegationRequest,
  ): Promise<Fee[]> {
    return calculateCreateUnbondingDelegationFee(this.apiUrl, this.chainId, unbondingDelegation);
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

  public calculateCreateRedelegationFee(
    redelegation: CreateRedelegationRequest,
  ): Promise<Fee[]> {
    return calculateCreateRedelegationFee(this.apiUrl, this.chainId, redelegation);
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
