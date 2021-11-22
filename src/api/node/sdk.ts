import { getNodeInfo } from './api';
import { NodeInfoResponse } from './types';

export class DecentrNodeSDK {
  constructor(
    private nodeUrl: string,
  ) {
  }

  public getNodeInfo(): Promise<NodeInfoResponse> {
    return getNodeInfo(this.nodeUrl);
  }
}
