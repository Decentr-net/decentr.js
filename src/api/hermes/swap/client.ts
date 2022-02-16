import { AuthHeaders, fetchJson, getAuthHeaders } from '../../../utils';
import { Wallet } from '../../../wallet';
import { SwapDetails, SwapListPaginationOptions } from './types';

export class HermesSwapClient {
  constructor(
    private readonly url: string,
  ) {
  }

  // public getFee(
  //   address: string,
  //   network: SwapDestinationNetwork,
  //   amount: number,
  // ): Promise<string> {
  //   const url = `${this.url}/v1/fee`;
  //
  //   return fetchJson<{ fee: string }>(url, {
  //     queryParameters: {
  //       address,
  //       network,
  //       amount,
  //     },
  //   }).then(({ fee }) => fee);
  // }

  public getSwapById(
    privateKey: Wallet['privateKey'],
    swapId: number,
  ): Promise<SwapDetails> {
    const path = `/v1/swap/${swapId}`

    const url = `${this.url}${path}`;

    const headers = this.getAuthHeaders(path, privateKey);

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

    const headers = this.getAuthHeaders(path, privateKey);

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

    const headers = this.getAuthHeaders(
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

  private getAuthHeaders<T>(
    data: T,
    privateKey: Wallet['privateKey'],
    options?: {
      disableEncode?: boolean,
    },
  ): AuthHeaders {
    return getAuthHeaders(
      data,
      privateKey,
      {
        ...options,
        algorithm: 'keccak256',
      },
    );
  }
}
