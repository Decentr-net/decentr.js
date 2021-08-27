export interface SwapListPaginationOptions {
  after?: number;
  limit?: number;
}

export enum SwapDestinationNetwork {
  DEC = 'decentr',
  ETH = 'ethereum',
}

export enum SwapClosureReason {
  CollectingTimeoutExceeded = 'collecting-timeout-exceeded',
  InsufficientAmount = 'insufficient-amount',
  LostTransaction = 'lost-transaction',
  Success = 'success',
}

export enum SwapState {
  Closed = 'closed',
  Collecting = 'collecting',
  SelfDestructing = 'self-destructing',
  SendingAssets = 'sending-assets',
  Sent = 'sent',
  WaitingConfirmation = 'waiting-confirmation',
}

export interface SwapHeaders extends Record<string, string> {
  readonly 'Public-Key': string;
  readonly Signature: string;
}

export interface SwapDetails {
  amount?: string;
  closureReason?: SwapClosureReason;
  createdAt: string;
  depositAddress?: string;
  destinationAddress: string;
  destinationNetwork: SwapDestinationNetwork;
  fee?: string;
  id: number;
  sourceAddress?: number;
  state: SwapState;
  stateBlock?: number;
  tx?: string;
  updatedAt?: string;
}
