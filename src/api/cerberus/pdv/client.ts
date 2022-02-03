import { fetchJson, getAuthHeaders } from '../../../utils';
import { KeyPair, Wallet } from '../../../wallet';
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
    private url: string,
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

    const headers = getAuthHeaders(path, wallet);

    return fetchJson(this.controllerUrl, { headers });
  }

  public sendPDV(pdv: PDV[], keyPair: KeyPair): Promise<PDVAddress> {
    const cerberusAddress = this.controllerUrl;

    const body = {
      version: 'v1',
      pdv,
    };

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${this.controllerPath}`,
      keyPair,
      { disableEncode: true },
    );

    return fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(cerberusAddress, {
      method: 'POST',
      body,
      headers,
    }).then(({ id }) => id);
  }
}
