import { blobToBase64, fetchJson, getAuthHeaders } from '../../../utils';
import { KeyPair } from '../../../wallet';
import { SaveImageResponse } from './types';

export class CerberusImageClient {
  private readonly controllerPath = '/v1/images';
  private readonly controllerUrl = `${this.url}${this.controllerPath}`;

  constructor(
    private url: string,
  ) {
  }

  public async save(
    image: File,
    keyPair: KeyPair,
  ): Promise<SaveImageResponse> {
    const base64 = await blobToBase64(image);

    const headers = getAuthHeaders(`${base64}${this.controllerPath}`, keyPair, { disableEncode: true });

    return fetchJson<SaveImageResponse, string>(this.controllerUrl, {
      method: 'POST',
      body: base64,
      headers,
    });
  }
}
