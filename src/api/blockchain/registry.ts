import {
  TxMessageTypeUrl as CosmosTxMessageTypeUrl,
  TxMessageValueMap as CosmosTxMessageValueMap,
  REGISTRY_MAP as COSMOS_REGISTRY_MAP,
} from './cosmos/registry';
import {
  TxMessageTypeUrl as DecentrTxMessageTypeUrl,
  TxMessageValueMap as DecentrTxMessageValueMap,
  REGISTRY_MAP as DECENTR_REGISTRY_MAP,
} from './decentr/registry';
import {
  TxMessageTypeUrl as SentinelTxMessageTypeUrl,
  TxMessageValueMap as SentinelTxMessageValueMap,
  REGISTRY_MAP as SENTINEL_REGISTRY_MAP,
} from './sentinel/registry';
import { Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes } from '@cosmjs/stargate';

export const TxMessageTypeUrl = {
  ...CosmosTxMessageTypeUrl,
  ...DecentrTxMessageTypeUrl,
  ...SentinelTxMessageTypeUrl,
};
export type TxMessageTypeUrl = CosmosTxMessageTypeUrl
  | DecentrTxMessageTypeUrl
  | SentinelTxMessageTypeUrl;

export type TxMessageValueMap = CosmosTxMessageValueMap
  & DecentrTxMessageValueMap
  & SentinelTxMessageValueMap;

export interface TypedEncodeObject<K extends keyof TxMessageValueMap = keyof TxMessageValueMap> {
  typeUrl: K;
  value: TxMessageValueMap[K];
}

export type TxMessageValue<K extends keyof TxMessageValueMap> = TxMessageValueMap[K];

export const REGISTRY = new Registry([
  ...defaultRegistryTypes,
  ...Object.entries(COSMOS_REGISTRY_MAP),
  ...Object.entries(DECENTR_REGISTRY_MAP),
  ...Object.entries(SENTINEL_REGISTRY_MAP),
]);
