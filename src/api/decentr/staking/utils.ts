import { CommissionRates } from 'cosmjs-types/cosmos/staking/v1beta1/staking';

import { correctDecodedFloatNumber } from '../../../utils';
import { Validator } from './types';

export function correctValidatorCommission(validator: Validator): Validator {
  const commissionRates = validator.commission?.commissionRates
    && Object.entries(validator.commission?.commissionRates)
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: correctDecodedFloatNumber(value),
        };
      }, {}) as CommissionRates;

  return {
    ...validator,
    commission: {
      ...validator.commission,
      commissionRates,
    },
  };
}
