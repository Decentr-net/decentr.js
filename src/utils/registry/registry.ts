import { GeneratedType, Registry } from '@cosmjs/proto-signing';

export function createCustomRegistry(msgMap: Map<GeneratedType, string>): Registry {
  return new Registry([
    ...[...msgMap.entries()]
      .map(([msg, url]) => [url, msg] as [string, GeneratedType]),
  ]);
}
