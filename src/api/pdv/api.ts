import { fetchJson } from '../../utils';
import { KeyPair } from '../../wallet';
import { getAuthHeaders } from '../api-utils';
import { PDV, PDVAddress } from './types';

export async function sendPDV(
  cerberusUrl: string,
  pdv: PDV[],
  keyPair: KeyPair,
): Promise<PDVAddress> {
  const cerberusAddress = `${cerberusUrl}/v1/pdv`;

  const body = {
    version: 'v1',
    pdv,
  };

  const headers = getAuthHeaders(`${JSON.stringify(body)}/v1/pdv`, keyPair, { disableEncode: true });

  return await fetchJson<{ id: number }, { version: string; pdv: PDV[] }>(cerberusAddress, {
    method: 'POST',
    body,
    headers,
  }).then(({ id }) => id);
}
