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

interface PDVRequest {
  version: string;
  pdv: PDV[];
}

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
    const body = this.buildPDVBody(pdv);

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${this.controllerPath}`,
      privateKey,
      { disableEncode: true },
    );

    return fetchJson<{ id: number }, PDVRequest>(this.controllerUrl, {
      method: 'POST',
      body,
      headers,
    }).then(({ id }) => id);
  }

  public validate(pdv: PDV[]): Promise<number[]> {
    const body = this.buildPDVBody(pdv);

    return fetchJson<{ bool: boolean; invalidPDV: number[] }, PDVRequest>(
      `${this.controllerUrl}/validate`,
      {
        method: 'POST',
        body,
      }
    ).then(({ invalidPDV }) => invalidPDV || []);
  }

  private buildPDVBody(pdv: PDV[]): PDVRequest {
    return {
      version: 'v1',
      pdv,
    };
  }
}
