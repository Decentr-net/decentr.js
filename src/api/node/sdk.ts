import { getNodeInfo } from './node';
import { NodeInfoResponse } from './types';

export class DecentrNodeSDK {
  constructor(
    private nodeApi: string,
  ) {
  }

  public getNodeInfo(): Promise<NodeInfoResponse> {
    return getNodeInfo(this.nodeApi);
  }
}
