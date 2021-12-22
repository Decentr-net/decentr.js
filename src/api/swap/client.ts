import { KeyPair } from '../../wallet';
import { fetchJson } from '../../utils';
import { getAuthHeaders } from '../api-utils';
import { SwapDestinationNetwork, SwapDetails, SwapListPaginationOptions } from './types';

export class DecentrSwapClient {
  constructor(
    private swapUrl: string,
  ) {
  }

  public getFee(
    address: string,
    network: SwapDestinationNetwork,
    amount: number,
  ): Promise<string> {
    const url = `${this.swapUrl}/v1/fee`;

    return fetchJson<{ fee: string }>(url, {
      queryParameters: {
        address,
        network,
        amount,
      },
    }).then(({ fee }) => fee);
  }

  public getSwapById(
    keys: KeyPair,
    swapId: number,
  ): Promise<SwapDetails> {
    const url = `${this.swapUrl}/v1/swap/${swapId}`;

    const headers = getAuthHeaders(`/v1/swap/${swapId}`, keys);

    return fetchJson(url, {
      headers,
    });
  }

  public getSwapList(
    keys: KeyPair,
    swapListPaginationOptions?: SwapListPaginationOptions,
  ): Promise<SwapDetails[]> {
    const path = '/v1/swap';

    const url = `${this.swapUrl}${path}`;

    const headers = getAuthHeaders(path, keys);

    return fetchJson(url, {
      headers,
      queryParameters: {
        ...swapListPaginationOptions,
      },
    });
  }

  public createSwap(
    keys: KeyPair,
    address: string,
    network: SwapDestinationNetwork,
  ): Promise<SwapDetails> {
    const path = '/v1/swap';

    const url = `${this.swapUrl}${path}`;

    const body = {
      destinationAddress: address,
      destinationNetwork: network,
    };

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${path}`,
      keys,
      { disableEncode: true },
    );

    return fetchJson(url, {
      method: 'POST',
      body,
      headers,
    });
  }
}
