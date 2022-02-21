import { DDVStats } from './types';
import { fetchJson } from '../../../utils';

export class TheseusDDVClient {
  private readonly controllerUrl = `${this.url}/v1/ddv`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getStats(): Promise<DDVStats> {
    const url = `${this.controllerUrl}/stats`;

    return fetchJson(url);
  }
}
