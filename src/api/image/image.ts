import { KeyPair } from '../../wallet';
import { blobToBase64, fetchJson } from '../../utils';
import { getAuthHeaders } from '../api-utils';
import { SaveImageResponse } from './types';

export async function saveImage(
  cerberusUrl: string,
  image: File,
  keyPair: KeyPair,
): Promise<SaveImageResponse> {
  const cerberusAddress = `${cerberusUrl}/v1/images`;

  const base64 = await blobToBase64(image);

  const headers = getAuthHeaders(`${base64}/v1/images`, keyPair, { disableEncode: true });

  return fetchJson<SaveImageResponse, string>(cerberusAddress, {
    method: 'POST',
    body: base64,
    headers,
    bodyAsIs: true,
  });
}
