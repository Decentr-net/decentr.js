import { Wallet } from '../wallet';
import { DecentrBankSDK } from './bank';
import { DecentrCommunitySDK } from './community';
import { DecentrPDVSDK } from './pdv';
import { Account, DecentrProfileSDK } from './profile';
import { DecentrStakingSDK } from './staking';
import { broadcast, BroadcastOptions, BroadcastResponse } from './messages';
import { StdTxResponseValue } from './types';
import { DecentrNodeSDK } from './node/sdk';
import { DecentrBlocksSDK } from './blocks';

export class Decentr {
  private bankSDK: DecentrBankSDK | undefined;
  private blocksSDK: DecentrBlocksSDK | undefined;
  private communitySDK: DecentrCommunitySDK | undefined;
  private nodeSDK: DecentrNodeSDK | undefined;
  private pdvSDK: DecentrPDVSDK | undefined;
  private profileSDK: DecentrProfileSDK | undefined;
  private stakingSDK: DecentrStakingSDK | undefined;

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

  public get blocks(): DecentrBlocksSDK {
    if (!this.blocksSDK) {
      this.blocksSDK = new DecentrBlocksSDK(this.apiUrl);
    }

    return this.blocksSDK;
  }

  public get community(): DecentrCommunitySDK {
    if (!this.communitySDK) {
      this.communitySDK = new DecentrCommunitySDK(this.apiUrl, this.chainId);
    }

    return this.communitySDK;
  }

  public get node(): DecentrNodeSDK {
    if (!this.nodeSDK) {
      this.nodeSDK = new DecentrNodeSDK(this.apiUrl);
    }

    return this.nodeSDK;
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

  public get staking(): DecentrStakingSDK {
    if (!this.stakingSDK) {
      this.stakingSDK = new DecentrStakingSDK(this.apiUrl);
    }

    return this.stakingSDK;
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
