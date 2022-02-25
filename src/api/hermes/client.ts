import { HermesSwapClient } from './swap';

export class HermesClient {
  public readonly swap: HermesSwapClient = new HermesSwapClient(this.url);

  constructor(
    private readonly url: string,
  ) {
  }
}
