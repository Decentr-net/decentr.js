import { KeyPair, Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { getAuthHeaders } from '../api-utils';
import {
  PDV,
  PDVDetails,
  PDVListItem,
  PDVListPaginationOptions,
  PDVAddress,
  PDVType,
  PDVMeta,
  PDVBlacklist,
} from './types';

export class DecentrPDVClient {
  constructor(
    private cerberusUrl: string,
  ) {
  }

  public getPDVBlacklist(): Promise<PDVBlacklist> {
    return fetchJson(`${this.cerberusUrl}/v1/configs/blacklist`);
  }

  public getPDVList(
    walletAddress: Wallet['address'],
    paginationOptions?: PDVListPaginationOptions,
  ): Promise<PDVListItem[]> {
    return fetchJson(`${this.cerberusUrl}/v1/pdv/${walletAddress}`, {
      queryParameters: {
        ...paginationOptions,
      },
    });
  }

  public getPDVMeta(pdvAddress: number, walletAddress: Wallet['address']): Promise<PDVMeta> {
    return fetchJson(`${this.cerberusUrl}/v1/pdv/${walletAddress}/${pdvAddress}/meta`);
  }

  public getPDVDetails(pdvAddress: number, wallet: Wallet): Promise<PDVDetails> {
    const path = `/v1/pdv/${wallet.address}/${pdvAddress}`;

    const url = `${this.cerberusUrl}${path}`;

    const headers = getAuthHeaders(path, wallet);

    return fetchJson(url, { headers });
  }

  public getRewards(): Promise<Record<PDVType, number>> {
    return fetchJson(`${this.cerberusUrl}/v1/configs/rewards`);
  }

  public sendPDV(pdv: PDV[], keyPair: KeyPair): Promise<PDVAddress> {
    const path = `/v1/pdv`;

    const cerberusAddress = `${this.cerberusUrl}${path}`;

    const body = {
      version: 'v1',
      pdv,
    };

    const headers = getAuthHeaders(
      `${JSON.stringify(body)}${path}`,
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
