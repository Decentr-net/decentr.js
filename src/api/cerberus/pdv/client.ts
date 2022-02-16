import { fetchJson, getAuthHeaders } from '../../../utils';
import { Wallet } from '../../../wallet';
import {
  PDV,
  PDVAddress,
  PDVDetails,
  PDVListItem,
  PDVListPaginationOptions,
  PDVMeta,
} from './types';

export class CerberusPDVClient {
  private readonly controllerPath = '/v1/pdv';
  private readonly controllerUrl = `${this.url}${this.controllerPath}`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getPDVList(
    walletAddress: Wallet['address'],
    paginationOptions?: PDVListPaginationOptions,
  ): Promise<PDVListItem[]> {
    return fetchJson(`${this.controllerUrl}/${walletAddress}`, {
      queryParameters: {
        ...paginationOptions,
      },
    });
  }

  public getPDVMeta(pdvAddress: PDVAddress, walletAddress: Wallet['address']): Promise<PDVMeta> {
    return fetchJson(`${this.controllerUrl}/${walletAddress}/${pdvAddress}/meta`);
  }

  public getPDVDetails(pdvAddress: PDVAddress, wallet: Wallet): Promise<PDVDetails> {
    const path = `${this.controllerPath}/${wallet.address}/${pdvAddress}`;

    const headers = getAuthHeaders(path, wallet.privateKey);

    return fetchJson(`${this.url}/${path}`, { headers });
  }

  public sendPDV(pdv: PDV[], privateKey: Wallet['privateKey']): Promise<PDVAddress> {
    const body = {
      version: 'v1',
      pdv,
    };

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${this.controllerPath}`,
      privateKey,
      { disableEncode: true },
    );

    return fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(this.controllerUrl, {
      method: 'POST',
      body,
      headers,
    }).then(({ id }) => id);
  }
}
