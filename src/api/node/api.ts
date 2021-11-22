import { fetchJson } from '../../utils';
import { NodeInfoResponse } from './types';

export function getNodeInfo(
  nodeUrl: string,
): Promise<NodeInfoResponse> {
  return fetchJson(`${nodeUrl}/node_info`);
}
