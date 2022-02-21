import { fetchJson, getAuthHeaders } from '../../utils';
import { Wallet } from '../../wallet';
import { SwapDestinationNetwork, SwapDetails, SwapListPaginationOptions } from './types';

export class SwapClient {
  constructor(
    private readonly url: string,
  ) {
  }

  public getFee(
    address: string,
    network: SwapDestinationNetwork,
    amount: number,
  ): Promise<string> {
    const url = `${this.url}/v1/fee`;

    return fetchJson<{ fee: string }>(url, {
      queryParameters: {
        address,
        network,
        amount,
      },
    }).then(({ fee }) => fee);
  }

  public getSwapById(
    privateKey: Wallet['privateKey'],
    swapId: number,
  ): Promise<SwapDetails> {
    const path = `/v1/swap/${swapId}`

    const url = `${this.url}${path}`;

    const headers = getAuthHeaders(path, privateKey);

    return fetchJson(url, {
      headers,
    });
  }

  public getSwapList(
    privateKey: Wallet['privateKey'],
    swapListPaginationOptions?: SwapListPaginationOptions,
  ): Promise<SwapDetails[]> {
    const path = '/v1/swap';

    const url = `${this.url}${path}`;

    const headers = getAuthHeaders(path, privateKey);

    return fetchJson(url, {
      headers,
      queryParameters: {
        ...swapListPaginationOptions,
      },
    });
  }

  public createSwap(
    privateKey: Wallet['privateKey'],
    address: string,
    network: SwapDestinationNetwork,
  ): Promise<SwapDetails> {
    const path = '/v1/swap';

    const url = `${this.url}${path}`;

    const body = {
      destinationAddress: address,
      destinationNetwork: network,
    };

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${path}`,
      privateKey,
      { disableEncode: true },
    );

    return fetchJson(url, {
      method: 'POST',
      body,
      headers,
    });
  }
}
