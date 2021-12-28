import { BroadcastTxSuccess } from '@cosmjs/stargate/build/stargateclient';
import {
  BankExtension,
  Coin,
  MsgSendEncodeObject,
  QueryClient,
  setupBankExtension,
} from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../wallet';
import { DECENTR_DENOM } from '../types';
import { signAndBroadcast } from '../api-utils';
import { SendTokensRequest } from './types';

export class DecentrBankClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & BankExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrBankClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupBankExtension,
    );

    return new DecentrBankClient(nodeUrl, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
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

  public async sendTokens(
    request: SendTokensRequest,
    privateKey: Wallet['privateKey'],
    memo?: string,
  ): Promise<BroadcastTxSuccess> {
    const message: MsgSendEncodeObject = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: request,
    };

    return signAndBroadcast(
      this.nodeUrl,
      message,
      privateKey,
      {
        memo,
      }
    );
  }
}