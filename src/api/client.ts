import { DecentrAuthClient } from './auth';
import { DecentrBankClient } from './bank';
import { DecentrBlocksClient } from './blocks';
import { DecentrCommunityClient } from './community';
import { DecentrDistributionClient } from './distribution';
import { DecentrImageClient } from './image';
import { DecentrMintClient } from './mint';
import { DecentrNodeClient } from './node';
import { DecentrOperationsClient } from './operations';
import { DecentrPDVClient } from './pdv';
import { DecentrProfileClient } from './profile';
import { DecentrStakingClient } from './staking';
import { DecentrSwapClient } from './swap';
import { DecentrTokenClient } from './token';
import { DecentrTXsClient } from './txs';

export class DecentrClient {
  private authClient: DecentrAuthClient | undefined;
  private bankClient: DecentrBankClient | undefined;
  private blocksClient: DecentrBlocksClient | undefined;
  private communityClient: DecentrCommunityClient | undefined;
  private distributionClient: DecentrDistributionClient | undefined;
  private imageClient: DecentrImageClient | undefined;
  private nodeClient: DecentrNodeClient | undefined;
  private mintClient: DecentrMintClient | undefined;
  private operationsClient: DecentrOperationsClient | undefined;
  private pdvClient: DecentrPDVClient | undefined;
  private profileClient: DecentrProfileClient | undefined;
  private stakingClient: DecentrStakingClient | undefined;
  private swapClient: DecentrSwapClient | undefined;
  private tokenClient: DecentrTokenClient | undefined;
  private txsClient: DecentrTXsClient | undefined;

  constructor(
    private nodeUrl: string,
    private servicesUrls?: {
      cerberus?: string,
      swap?: string,
    },
  ) {
  }

  public async auth(): Promise<DecentrAuthClient> {
    if (!this.authClient) {
      this.authClient = await DecentrAuthClient.create(this.nodeUrl);
    }

    return this.authClient;
  }

  public async bank(): Promise<DecentrBankClient> {
    if (!this.bankClient) {
      this.bankClient = await DecentrBankClient.create(this.nodeUrl);
    }

    return this.bankClient;
  }

  public async blocks(): Promise<DecentrBlocksClient> {
    if (!this.blocksClient) {
      this.blocksClient = await DecentrBlocksClient.create(this.nodeUrl);
    }

    return this.blocksClient;
  }

  public async community(): Promise<DecentrCommunityClient> {
    if (!this.communityClient) {
      this.communityClient = await DecentrCommunityClient.create(this.nodeUrl);
    }

    return this.communityClient;
  }

  public async distribution(): Promise<DecentrDistributionClient> {
    if (!this.distributionClient) {
      this.distributionClient = await DecentrDistributionClient.create(this.nodeUrl);
    }

    return this.distributionClient;
  }

  public get image(): DecentrImageClient {
    if (!this.servicesUrls?.cerberus) {
      throw new Error(`You didn't provide Cerberus url`);
    }

    if (!this.imageClient) {
      this.imageClient = new DecentrImageClient(this.servicesUrls.cerberus);
    }

    return this.imageClient;
  }

  public async mint(): Promise<DecentrMintClient> {
    if (!this.mintClient) {
      this.mintClient = await DecentrMintClient.create(this.nodeUrl);
    }

    return this.mintClient;
  }

  public async node(): Promise<DecentrNodeClient> {
    if (!this.nodeClient) {
      this.nodeClient = await DecentrNodeClient.create(this.nodeUrl);
    }

    return this.nodeClient;
  }

  public async operations(): Promise<DecentrOperationsClient> {
    if (!this.operationsClient) {
      this.operationsClient = await DecentrOperationsClient.create(this.nodeUrl);
    }

    return this.operationsClient;
  }

  public get pdv(): DecentrPDVClient {
    if (!this.servicesUrls?.cerberus) {
      throw new Error(`You didn't provide Cerberus url`);
    }

    if (!this.pdvClient) {
      this.pdvClient = new DecentrPDVClient(this.servicesUrls.cerberus);
    }

    return this.pdvClient;
  }

  public profile(): DecentrProfileClient {
    if (!this.servicesUrls?.cerberus) {
      throw new Error(`You didn't provide Cerberus url`);
    }

    if (!this.profileClient) {
      this.profileClient = new DecentrProfileClient(this.servicesUrls.cerberus);
    }

    return this.profileClient;
  }

  public async staking(): Promise<DecentrStakingClient> {
    if (!this.stakingClient) {
      this.stakingClient = await DecentrStakingClient.create(this.nodeUrl);
    }

    return this.stakingClient;
  }

  public get swap(): DecentrSwapClient {
    if (!this.servicesUrls?.swap) {
      throw new Error(`You didn't provide Swap url`);
    }

    if (!this.swapClient) {
      this.swapClient = new DecentrSwapClient(this.servicesUrls.swap);
    }

    return this.swapClient;
  }

  public get token(): DecentrTokenClient {
    if (!this.tokenClient) {
      this.tokenClient = new DecentrTokenClient(this.nodeUrl);
    }

    return this.tokenClient;
  }

  public async txs(): Promise<DecentrTXsClient> {
    if (!this.txsClient) {
      this.txsClient = await DecentrTXsClient.create(this.nodeUrl);
    }

    return this.txsClient;
  }
}
