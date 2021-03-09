export interface NodeInfoApplicationVersion {
  build_deps: string[];
  build_tags: string;
  client_name: string;
  commit: string;
  go: string;
  name: string;
  server_name: string;
  version: string;
}

export interface NodeInfoOther {
  rpc_address: string;
  tx_index: string;
}

export interface NodeInfoProtocolVersion {
  app: string;
  block: string;
  p2p: string;
}

export interface NodeInfo {
  channels: string;
  id: string;
  listen_addr: string;
  moniker: string;
  network: string;
  other: NodeInfoOther;
  protocol_version: NodeInfoProtocolVersion;
  version: string;
}

export interface NodeInfoResponse {
  application_version: NodeInfoApplicationVersion,
  node_info: NodeInfo,
}
