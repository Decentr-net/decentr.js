import { Wallet } from '../../wallet';
import {
  getPDVDetails,
  getPDVList,
  getPDVMeta,
  getRewards,
  getTokenBalance,
  sendPDV,
} from './pdv';
import {
  PDV,
  PDVDetails,
  PDVListItem,
  PDVListPaginationOptions,
  PDVAddress,
  PDVType,
  PDVMeta,
} from './types';

export class DecentrPDVSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getTokenBalance(walletAddress: Wallet['address']): Promise<number> {
    return getTokenBalance(this.apiUrl, walletAddress);
  }

  public getPDVList(
    cerberusUrl: string,
    walletAddress: Wallet['address'],
    paginationOptions?: PDVListPaginationOptions,
  ): Promise<PDVListItem[]> {
    return getPDVList(cerberusUrl, walletAddress, paginationOptions);
  }

  public getPDVMeta(cerberusUrl: string, pdvAddress: number, walletAddress: Wallet['address']): Promise<PDVMeta> {
    return getPDVMeta(cerberusUrl, pdvAddress, walletAddress);
  }

  public getPDVDetails(cerberusUrl: string, pdvAddress: number, wallet: Wallet): Promise<PDVDetails> {
    return getPDVDetails(cerberusUrl, pdvAddress, wallet);
  }

  public getRewards(cerberusUrl: string): Promise<Record<PDVType, number>> {
    return getRewards(cerberusUrl);
  }

  public sendPDV(
    cerberusUrl: string,
    pdv: PDV[],
    wallet: Wallet,
  ): Promise<PDVAddress> {
    return sendPDV(
      cerberusUrl,
      pdv,
      wallet,
    );
  }
}
