import { KeyPair } from '../../wallet';
import { blobToBase64, fetchJson, getAuthHeaders } from '../../utils';
import { SaveImageResponse } from './types';

export class DecentrImageClient {
  constructor(
    private cerberusUrl: string,
  ) {
  }

  public async saveImage(
    image: File,
    keyPair: KeyPair,
  ): Promise<SaveImageResponse> {
    const path = '/v1/images';

    const cerberusAddress = `${this.cerberusUrl}${path}`;

    const base64 = await blobToBase64(image);

    const headers = getAuthHeaders(`${base64}${path}`, keyPair, { disableEncode: true });

    return fetchJson<SaveImageResponse, string>(cerberusAddress, {
      method: 'POST',
      body: base64,
      headers,
    });
  }
}
