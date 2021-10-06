import { Wallet } from '../../wallet';
import {
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
  Delegation,
  Pool,
  Redelegation,
  StakingParameters,
  UnbondingDelegation,
  Validator,
  ValidatorsFilterParameters,
} from './types';

export class DecentrStakingSDK {
  constructor(private apiUrl: string) {
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
}
