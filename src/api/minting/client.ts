import { MintingInflation } from './types';
import { fetchJson } from '../../utils';

export class DecentrMintingClient {
  constructor(private nodeUrl: string) {
  }

  public getInflation(): Promise<MintingInflation> {
    const url = `${this.nodeUrl}/cosmos/mint/v1beta1/inflation`;

    return fetchJson<{ inflation: MintingInflation }>(url)
      .then(({ inflation }) => inflation);
  }
}
