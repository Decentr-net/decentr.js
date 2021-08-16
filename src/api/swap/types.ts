export interface SwapListPaginationOptions {
  limit: number;
  from: number; // timestamp of PDVListItem
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
  Confirming = 'confirming',
  InsufficientAmount = 'insufficient-amount',
  NotConfirmed = 'not-confirmed',
  SelfClosed = 'self-closed',
  SelfDestructing = 'self-destructing',
  SendingAssets = 'sending-assets',
  Sent = 'sent',
}

export interface SwapHeaders extends Record<string, string> {
  readonly 'Public-Key': string;
  readonly Signature: string;
}

export interface SwapDetails {
  amount?: string,
  closureReason?: SwapClosureReason,
  createdAt: string,
  depositAddress?: string,
  destinationAddress: string,
  destinationNetwork: SwapDestinationNetwork,
  fee?: string,
  id: number,
  sourceAddress?: number,
  state: SwapState,
  stateBlock?: number,
  tx?: string,
  updatedAt?: string,
}
