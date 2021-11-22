import { BroadcastTxResponse, Coin } from '@cosmjs/stargate';

import { Wallet } from '../../wallet';
import { DECENTR_DENOM } from '../types';
import {
  getBalance,
  getDenomBalance,
  getDenomSupply,
  getSupply,
  sendTokens
} from './api';
import { SendTokensOptions } from './types';

export class DecentrBankSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getBalance(
    walletAddress: Wallet['address'],
  ): Promise<Coin[]> {
    return getBalance(
      this.nodeUrl,
      walletAddress,
    );
  }

  public getDenomBalance(
    walletAddress: Wallet['address'],
    denom: string = DECENTR_DENOM,
  ): Promise<Coin> {
    return getDenomBalance(
      this.nodeUrl,
      walletAddress,
      denom,
    );
  }

  public getSupply(): Promise<Coin[]> {
    return getSupply(this.nodeUrl);
  }

  public getDenomSupply(
    denom: string = DECENTR_DENOM,
  ): Promise<Coin> {
    return getDenomSupply(this.nodeUrl, denom);
  }

  public sendTokens(
    options: SendTokensOptions,
    privateKey: Wallet['privateKey'],
  ): Promise<BroadcastTxResponse> {
    return sendTokens(
      this.nodeUrl,
      options,
      privateKey,
    );
  }
}
