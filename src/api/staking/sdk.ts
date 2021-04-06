import { getPool, getValidator, getValidators } from './staking';
import { Pool, Validator, ValidatorsFilterParameters } from './types';

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
}
