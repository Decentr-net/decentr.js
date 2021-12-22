import { GeneratedType } from '@cosmjs/proto-signing';

import { MsgResetAccount } from '../../../codec/operations/tx';
import { createCustomRegistry } from '../api-utils';

export enum MessageTypeUrl {
  ResetAccount = '/decentr.operations.MsgResetAccount',
}

export const MESSAGE_TYPE_MAP = new Map<GeneratedType, string>([
  [MsgResetAccount, MessageTypeUrl.ResetAccount],
] as [GeneratedType, string][]);

export const REGISTRY = createCustomRegistry(MESSAGE_TYPE_MAP);
