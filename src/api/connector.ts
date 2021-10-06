import { Wallet } from '../wallet';
import { DecentrBankSDK } from './bank';
import { DecentrBlocksSDK } from './blocks';
import { DecentrCommunitySDK } from './community';
import { DecentrImageSDK } from './image';
import { broadcast, BroadcastOptions, BroadcastResponse } from './messages';
import { DecentrMintingSDK } from './minting';
import { DecentrNodeSDK } from './node';
import { DecentrOperationsSDK } from './operations';
import { DecentrPDVSDK } from './pdv';
import { Account, DecentrProfileSDK } from './profile';
import { DecentrStakingSDK } from './staking';
import { DecentrSupplySDK } from './supply';
import { DecentrSwapSDK } from './swap';
import { DecentrTXsSDK } from './txs';
import { StdTxMessageValueMap, StdTxResponseValue } from './types';

export class Decentr {
  private bankSDK: DecentrBankSDK | undefined;
  private blocksSDK: DecentrBlocksSDK | undefined;
  private communitySDK: DecentrCommunitySDK | undefined;
  private imageSDK: DecentrImageSDK | undefined;
  private nodeSDK: DecentrNodeSDK | undefined;
  private mintingSDK: DecentrMintingSDK | undefined;
  private operationsSDK: DecentrOperationsSDK | undefined;
  private pdvSDK: DecentrPDVSDK | undefined;
  private profileSDK: DecentrProfileSDK | undefined;
  private stakingSDK: DecentrStakingSDK | undefined;
  private supplySDK: DecentrSupplySDK | undefined;
  private swapSDK: DecentrSwapSDK | undefined;
  private txsSDK: DecentrTXsSDK | undefined;

  constructor(
    private apiUrl: string,
    private chainId: string,
    private servicesUrls?: {
      cerberus?: string,
      swap?: string,
    },
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

  public get image(): DecentrImageSDK {
    if (!this.servicesUrls?.cerberus) {
      throw new Error(`You didn't provide Cerberus url`);
    }

    if (!this.imageSDK) {
      this.imageSDK = new DecentrImageSDK(this.servicesUrls?.cerberus);
    }

    return this.imageSDK;
  }

  public get minting(): DecentrMintingSDK {
    if (!this.mintingSDK) {
      this.mintingSDK = new DecentrMintingSDK(this.apiUrl);
    }

    return this.mintingSDK;
  }

  public get node(): DecentrNodeSDK {
    if (!this.nodeSDK) {
      this.nodeSDK = new DecentrNodeSDK(this.apiUrl);
    }

    return this.nodeSDK;
  }

  public get operations(): DecentrOperationsSDK {
    if (!this.operationsSDK) {
      this.operationsSDK = new DecentrOperationsSDK(this.apiUrl, this.chainId);
    }

    return this.operationsSDK;
  }

  public get pdv(): DecentrPDVSDK {
    if (!this.pdvSDK) {
      this.pdvSDK = new DecentrPDVSDK(this.apiUrl);
    }

    return this.pdvSDK;
  }

  public get profile(): DecentrProfileSDK {
    if (!this.profileSDK) {
      this.profileSDK = new DecentrProfileSDK(this.apiUrl);
    }

    return this.profileSDK;
  }

  public get staking(): DecentrStakingSDK {
    if (!this.stakingSDK) {
      this.stakingSDK = new DecentrStakingSDK(this.apiUrl, this.chainId);
    }

    return this.stakingSDK;
  }

  public get supply(): DecentrSupplySDK {
    if (!this.supplySDK) {
      this.supplySDK = new DecentrSupplySDK(this.apiUrl);
    }

    return this.supplySDK;
  }

  public get swap(): DecentrSwapSDK {
    if (!this.servicesUrls?.swap) {
      throw new Error(`You didn't provide Swap url`);
    }

    if (!this.swapSDK) {
      this.swapSDK = new DecentrSwapSDK(this.servicesUrls.swap);
    }

    return this.swapSDK;
  }

  public get txs(): DecentrTXsSDK {
    if (!this.txsSDK) {
      this.txsSDK = new DecentrTXsSDK(this.apiUrl);
    }

    return this.txsSDK;
  }

  public broadcast<K extends keyof StdTxMessageValueMap>(
    stdTxValue: StdTxResponseValue<K>,
    account: Pick<Account, 'account_number' | 'sequence'> & {
      privateKey: Wallet['privateKey'],
    },
    options: BroadcastOptions,
  ): Promise<BroadcastResponse<K>> {
    return broadcast(this.apiUrl, this.chainId, stdTxValue, account, options);
  }
}
