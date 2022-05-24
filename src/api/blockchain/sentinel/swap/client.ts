import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { SwapRequest } from './types';

export class SwapClient {
  constructor(
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public swap(
    request: SwapRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.Swap,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }
}
