import { Wallet } from '../../wallet';
import { addGas } from '../api-utils';
import { BaseRequest, StdTxFee } from '../types';
import { TransferData } from './types';

export function getTransferUrl(
  apiUrl: string,
  recipient: Wallet['address']
): string {
  return `${apiUrl}/bank/accounts/${recipient}/transfers`;
}

export function prepareTransferBody(
  url: string,
  chainId: string,
  transferData: Pick<TransferData, 'amount' | 'from_address'>,
): Promise<(BaseRequest & Pick<StdTxFee, 'amount'>)> {
  const queryParameters = {
    amount: [{
      amount: transferData.amount,
      denom: 'udec',
    }],
  };

  return addGas(queryParameters, chainId, url, transferData.from_address);
}
