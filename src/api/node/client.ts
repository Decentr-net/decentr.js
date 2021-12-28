import { StatusResponse, Tendermint34Client } from '@cosmjs/tendermint-rpc';

export class DecentrNodeClient {
  private constructor(
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrNodeClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    return new DecentrNodeClient(tendermintClient);
  }

  public getNodeInfo(): Promise<StatusResponse> {
    return this.tmClient.status();
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }
}
