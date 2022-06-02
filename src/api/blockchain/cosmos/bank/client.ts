import { Coin, QueryClient, setupBankExtension, } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';
import Long from 'long';

import { Wallet } from '../../../../wallet';
import { DECENTR_DENOM } from '../../types';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { SendIbcTokensRequest, SendTokensRequest } from './types';

export class BankClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupBankExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getBalance(
    walletAddress: Wallet['address'],
  ): Promise<Coin[]> {
    return this.queryClient.bank.allBalances(walletAddress);
  }

  public getDenomBalance(
    walletAddress: Wallet['address'],
    denom: string = DECENTR_DENOM,
  ): Promise<Coin> {
    return this.queryClient.bank.balance(walletAddress, denom);
  }

  public getSupply(): Promise<Coin[]> {
    return this.queryClient.bank.totalSupply();
  }

  public getDenomSupply(
    denom: string = DECENTR_DENOM,
  ): Promise<Coin> {
    return this.queryClient.bank.supplyOf(denom);
  }

  public sendTokens(
    request: SendTokensRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.BankSend,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public sendIbcTokens(
    request: SendIbcTokensRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const timeoutTimestampSeconds = Math.ceil(Date.now() / 1000) + request.timeoutSec;

    const message = createTypedEncodeObject(
      TxMessageTypeUrl.IbcMsgTransfer,
      MsgTransfer.fromPartial({
        ...request as Omit<SendIbcTokensRequest, 'timeoutSec'>,
        timeoutTimestamp: Long.fromNumber(timeoutTimestampSeconds).multiply(1_000_000_000),
      }),
    );

    return this.transactionSignerFactory(message, options);
  }
}
