import { fetchJson } from '../../../utils';
import { Wallet } from '../../../wallet';

export class VulcanRegistrationClient {
  private readonly controllerUrl = `${this.url}/v1`;

  constructor(
    private readonly url: string,
  ) {
  }

  public register(walletAddress: Wallet['address'], email: string): Promise<void> {
    const url = `${this.controllerUrl}/register`;

    return fetchJson(url, {
      method: 'POST',
      body: {
        address: walletAddress,
        email,
      },
    });
  }

  public confirm(email: string, code: string): Promise<void> {
    const url = `${this.controllerUrl}/confirm`;

    return fetchJson(url, {
      method: 'POST',
      body: {
        code,
        email,
      },
    });
  }

  public hesoyam(walletAddress: Wallet['address']): Promise<void> {
    const url = `${this.controllerUrl}/hesoyam/${walletAddress}`;

    return fetchJson(url);
  }
}
