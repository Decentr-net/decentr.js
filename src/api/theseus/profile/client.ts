import { fetchJson } from '../../../utils';
import { Wallet } from '../../../wallet';
import { AdvDdvStatistics, ProfileStatistics } from './types';

export class TheseusProfileClient {
  private readonly controllerUrl = `${this.url}/v1/profiles`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getProfileStats(walletAddress: Wallet['address']): Promise<ProfileStatistics> {
    const url = `${this.controllerUrl}/${walletAddress}/stats`;

    return fetchJson(url);
  }

  public getAdvDdvStats(): Promise<AdvDdvStatistics> {
    const url = `${this.controllerUrl}/stats`;

    return fetchJson(url);
  }
}
