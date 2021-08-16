import { Wallet } from '../../wallet';
import { createSwap, getFee, getSwapById, getSwapList } from './swap';
import { SwapDestinationNetwork, SwapDetails, SwapListPaginationOptions } from './types';

export class DecentrSwapSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getFee(
    address: string,
    network: SwapDestinationNetwork,
    amount: number,
  ): Promise<string> {
    return getFee(this.apiUrl, address, network, amount);
  }

  public getSwapById(
    wallet: Wallet,
    swapId: number,
  ): Promise<SwapDetails> {
    return getSwapById(this.apiUrl, wallet, swapId);
  }

  public getSwapList(
    wallet: Wallet,
    swapListPaginationOptions?: SwapListPaginationOptions,
  ): Promise<SwapDetails[]> {
    return getSwapList(this.apiUrl, wallet, swapListPaginationOptions);
  }

  public createSwap(
    wallet: Wallet,
    address: string,
    network: SwapDestinationNetwork,
  ): Promise<SwapDetails> {
    return createSwap(this.apiUrl, wallet, address, network);
  }
}
