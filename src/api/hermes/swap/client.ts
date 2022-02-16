import { fetchJson, getAuthHeaders } from '../../../utils';
import { Wallet } from '../../../wallet';
import { SwapDetails, SwapListPaginationOptions } from './types';

export class HermesSwapClient {
  constructor(
    private readonly url: string,
  ) {
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
    receiverAddress: Wallet['address'],
    txHash: string,
  ): Promise<SwapDetails> {
    const path = '/v1/swap';

    const url = `${this.url}${path}`;

    const body = {
      receiverAddress,
      txHash,
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
