import { fetchJson } from '../../../utils';
import { Wallet } from '../../../wallet';
import { ReferralConfig, ReferralTimeStats } from './types';

export class VulcanReferralClient {
  private readonly controllerUrl = `${this.url}/v1/referral`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getCode(walletAddress: Wallet['address']): Promise<string> {
    const url = `${this.controllerUrl}/code/${walletAddress}`;

    return fetchJson<{ code: string }>(url)
      .then(({ code }) => code);
  }

  public getConfig(): Promise<ReferralConfig> {
    const url = `${this.controllerUrl}/config`;

    return fetchJson(url);
  }

  public getStats(walletAddress: Wallet['address']): Promise<ReferralTimeStats> {
    const url = `${this.controllerUrl}/track/stats/${walletAddress}`;

    return fetchJson(url);
  }

  public trackInstall(walletAddress: Wallet['address']): Promise<void> {
    const url = `${this.controllerUrl}/track/install/${walletAddress}`;

    return fetchJson(url, {
      method: 'POST',
    });
  }
}
