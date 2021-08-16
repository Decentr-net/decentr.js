import { Wallet } from '../../wallet';
import { createSwap, getFee, getSwapById, getSwapList } from './swap';
import { SwapDestinationNetwork, SwapDetails, SwapListPaginationOptions } from './types';

export class DecentrSwapSDK {
  constructor(
    private swapUrl: string,
  ) {
  }

  public getFee(
    address: string,
    network: SwapDestinationNetwork,
    amount: number,
  ): Promise<string> {
    return getFee(this.swapUrl, address, network, amount);
  }

  public getSwapById(
    wallet: Wallet,
    swapId: number,
  ): Promise<SwapDetails> {
    return getSwapById(this.swapUrl, wallet, swapId);
  }

  public getSwapList(
    wallet: Wallet,
    swapListPaginationOptions?: SwapListPaginationOptions,
  ): Promise<SwapDetails[]> {
    return getSwapList(this.swapUrl, wallet, swapListPaginationOptions);
  }

  public createSwap(
    wallet: Wallet,
    address: string,
    network: SwapDestinationNetwork,
  ): Promise<SwapDetails> {
    return createSwap(this.swapUrl, wallet, address, network);
  }
}
