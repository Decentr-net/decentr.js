import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Deposit } from '../../../../codec/sentinel/deposit/v1/deposit';
import { Wallet } from '../../../../wallet';
import { setupDepositExtension } from './extension';

export class DepositClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupDepositExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
  ) {
  }

  public getDeposits(): Promise<Deposit[]> {
    return this.queryClient.deposit.getDeposits({});
  }

  public getDeposit(address: Wallet['address']): Promise<Deposit | undefined> {
    return this.queryClient.deposit.getDeposit({ address });
  }
}
