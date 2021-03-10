import { fetchJson } from '../../utils/fetch';
import { NodeInfoResponse } from './types';

export function getNodeInfo(nodeApi: string): Promise<NodeInfoResponse> {
  return fetchJson(`${nodeApi}/node_info`);
}
