import { getValidator, getValidators } from './staking';
import { Validator, ValidatorsFilterParams } from './types';

export class DecentrStakingSDK {
  constructor(private apiUrl: string) {
  }

  public getValidators(status?: ValidatorsFilterParams): Promise<Validator[]> {
    return getValidators(this.apiUrl, status);
  }

  public getValidator(address: Validator['operator_address']): Promise<Validator> {
    return getValidator(this.apiUrl, address);
  }
}
