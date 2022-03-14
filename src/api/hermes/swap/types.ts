import { Coin } from '@cosmjs/stargate';

export interface SwapConfiguration {
  contractAddress: string;
  escrowAddress: string;
}

export interface SwapListPaginationOptions {
  after?: number;
  limit?: number;
}

export enum SwapState {
  Pending = 'pending',
  Lost = 'lost',
  Rejected = 'rejected',
  Confirmation = 'confirmation',
  Sending = 'sending',
  Sent = 'sent',
}

export interface SwapDetails {
  amount: Coin;
  createdAt: number;
  decBlock?: number;
  decTxHash?: string;
  ethBlock?: number;
  ethTxHash: string;
  id: number;
  state: SwapState;
  stateDescription?: string;
  updatedAt?: number;
}
