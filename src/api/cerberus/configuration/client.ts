import { fetchJson } from '../../../utils';
import { PDVBlacklist, PDVRewards } from './types';

export class CerberusConfigurationClient {
  private readonly controllerUrl = `${this.url}/v1/configs`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getPDVBlacklist(): Promise<PDVBlacklist> {
    return fetchJson(`${this.controllerUrl}/blacklist`);
  }

  public getPDVRewards(): Promise<PDVRewards> {
    return fetchJson(`${this.controllerUrl}/rewards`);
  }
}
