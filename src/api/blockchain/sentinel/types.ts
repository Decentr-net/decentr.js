import { Wallet } from '../../../wallet';

export {
  Status as SentinelStatus,
} from '../../../codec/sentinel/types/v1/status';


export interface SentinelNodeBandwidth {
  download: number;
  upload: number;
}

export interface SentinelNodeHandshake {
  enable: boolean;
  peers: number;
}

export interface SentinelNodeLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface SentinelNodeStatus {
  address: Wallet['address'];
  bandwidth: SentinelNodeBandwidth;
  handshake: SentinelNodeHandshake;
  interval_set_sessions: number;
  interval_update_sessions: number;
  interval_update_status: number;
  location: SentinelNodeLocation;
  moniker: string;
  operator: Wallet['address'];
  peers: number
  price: string;
  provider: string;
  qos: {
    max_peers: number;
  };
  type: number;
  version: string;
}
