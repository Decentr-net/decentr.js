import { DecentrBankSDK } from './bank';
import { DecentrBlocksSDK } from './blocks';
import { DecentrCommunitySDK } from './community';
import { DecentrDistributionSDK } from './distribution';
import { DecentrImageSDK } from './image';
import { DecentrMintingSDK } from './minting';
import { DecentrNodeSDK } from './node';
import { DecentrOperationsSDK } from './operations';
import { DecentrPDVSDK } from './pdv';
import { DecentrProfileSDK } from './profile';
import { DecentrStakingSDK } from './staking';
import { DecentrSwapSDK } from './swap';
import { DecentrTokenSDK } from './token';
import { DecentrTXsSDK } from './txs';

export class DecentrClient {
  private bankSDK: DecentrBankSDK | undefined;
  private blocksSDK: DecentrBlocksSDK | undefined;
  private communitySDK: DecentrCommunitySDK | undefined;
  private distributionSDK: DecentrDistributionSDK | undefined;
  private imageSDK: DecentrImageSDK | undefined;
  private nodeSDK: DecentrNodeSDK | undefined;
  private mintingSDK: DecentrMintingSDK | undefined;
  private operationsSDK: DecentrOperationsSDK | undefined;
  private pdvSDK: DecentrPDVSDK | undefined;
  private profileSDK: DecentrProfileSDK | undefined;
  private stakingSDK: DecentrStakingSDK | undefined;
  private swapSDK: DecentrSwapSDK | undefined;
  private tokenSDK: DecentrTokenSDK | undefined;
  private txsSDK: DecentrTXsSDK | undefined;

  constructor(
    private nodeUrl: string,
    private servicesUrls?: {
      cerberus?: string,
      swap?: string,
    },
  ) {
  }

  public get bank(): DecentrBankSDK {
    if (!this.bankSDK) {
      this.bankSDK = new DecentrBankSDK(this.nodeUrl);
    }

    return this.bankSDK;
  }

  public get blocks(): DecentrBlocksSDK {
    if (!this.blocksSDK) {
      this.blocksSDK = new DecentrBlocksSDK(this.nodeUrl);
    }

    return this.blocksSDK;
  }

  public get community(): DecentrCommunitySDK {
    if (!this.communitySDK) {
      this.communitySDK = new DecentrCommunitySDK(this.nodeUrl);
    }

    return this.communitySDK;
  }

  public get distribution(): DecentrDistributionSDK {
    if (!this.distributionSDK) {
      this.distributionSDK = new DecentrDistributionSDK(this.nodeUrl);
    }

    return this.distributionSDK;
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
      this.mintingSDK = new DecentrMintingSDK(this.nodeUrl);
    }

    return this.mintingSDK;
  }

  public get node(): DecentrNodeSDK {
    if (!this.nodeSDK) {
      this.nodeSDK = new DecentrNodeSDK(this.nodeUrl);
    }

    return this.nodeSDK;
  }

  public get operations(): DecentrOperationsSDK {
    if (!this.operationsSDK) {
      this.operationsSDK = new DecentrOperationsSDK(this.nodeUrl);
    }

    return this.operationsSDK;
  }

  public get pdv(): DecentrPDVSDK {
    if (!this.pdvSDK) {
      this.pdvSDK = new DecentrPDVSDK();
    }

    return this.pdvSDK;
  }

  public get profile(): DecentrProfileSDK {
    if (!this.servicesUrls?.cerberus) {
      throw new Error(`You didn't provide Cerberus url`);
    }

    if (!this.profileSDK) {
      this.profileSDK = new DecentrProfileSDK(this.nodeUrl, this.servicesUrls.cerberus);
    }

    return this.profileSDK;
  }

  public get staking(): DecentrStakingSDK {
    if (!this.stakingSDK) {
      this.stakingSDK = new DecentrStakingSDK(this.nodeUrl);
    }

    return this.stakingSDK;
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

  public get token(): DecentrTokenSDK {
    if (!this.tokenSDK) {
      this.tokenSDK = new DecentrTokenSDK(this.nodeUrl);
    }

    return this.tokenSDK;
  }

  public get txs(): DecentrTXsSDK {
    if (!this.txsSDK) {
      this.txsSDK = new DecentrTXsSDK(this.nodeUrl);
    }

    return this.txsSDK;
  }
}
