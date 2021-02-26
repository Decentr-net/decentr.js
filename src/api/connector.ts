import { Wallet } from '../wallet';
import { DecentrBankSDK } from './bank';
import { DecentrCommunitySDK } from './community';
import { DecentrPDVSDK } from './pdv';
import { Account, DecentrProfileSDK } from './profile';
import { broadcast, BroadcastOptions, BroadcastResponse } from './messages';
import { StdTxResponseValue } from './types';

export class Decentr {
  private bankSDK: DecentrBankSDK | undefined;
  private communitySDK: DecentrCommunitySDK | undefined;
  private pdvSDK: DecentrPDVSDK | undefined;
  private profileSDK: DecentrProfileSDK | undefined;

  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public get bank(): DecentrBankSDK {
    if (!this.bankSDK) {
      this.bankSDK = new DecentrBankSDK(this.apiUrl, this.chainId);
    }

    return this.bankSDK;
  }

  public get community(): DecentrCommunitySDK {
    if (!this.communitySDK) {
      this.communitySDK = new DecentrCommunitySDK(this.apiUrl, this.chainId);
    }

    return this.communitySDK;
  }

  public get pdv(): DecentrPDVSDK {
    if (!this.pdvSDK) {
      this.pdvSDK = new DecentrPDVSDK(this.apiUrl, this.chainId);
    }

    return this.pdvSDK;
  }

  public get profile(): DecentrProfileSDK {
    if (!this.profileSDK) {
      this.profileSDK = new DecentrProfileSDK(this.apiUrl, this.chainId);
    }

    return this.profileSDK;
  }

  public broadcast(
    stdTxValue: StdTxResponseValue,
    account: Pick<Account, 'account_number' | 'sequence'> & {
      privateKey: Wallet['privateKey'],
    },
    options: BroadcastOptions,
  ): Promise<BroadcastResponse> {
    return broadcast(this.apiUrl, this.chainId, stdTxValue, account, options);
  }
}
