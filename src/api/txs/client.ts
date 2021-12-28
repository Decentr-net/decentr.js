import {
  IndexedTx,
  SearchTxFilter,
  SearchTxQuery,
  StargateClient,
} from '@cosmjs/stargate';

export class DecentrTXsClient {
  private constructor(
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrTXsClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrTXsClient(stargateClient);
  }

  public disconnect(): void {
    return this.stargateClient.disconnect();
  }

  public search(
    query: SearchTxQuery,
    filter: SearchTxFilter = {},
  ): Promise<readonly IndexedTx[]> {
    return this.stargateClient.searchTx(query, filter);
  }

  public getByHash(hash: IndexedTx['hash']): Promise<IndexedTx | null> {
    return this.stargateClient.getTx(hash);
  }
}
