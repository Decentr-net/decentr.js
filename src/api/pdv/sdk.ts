import { Wallet } from '../../wallet';
import { getPDVDetails, getPDVList, getPDVMeta, getPDVStats, getTokenBalance, sendPDV } from './pdv';
import {
  PDV,
  PDVDetails,
  PDVListItem,
  PDVListPaginationOptions,
  PDVMeta,
  PDVResponse,
  PDVStatItem,
} from './types';

export class DecentrPDVSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
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

  public getPDVStats(walletAddress: Wallet['address']): Promise<PDVStatItem[]> {
    return getPDVStats(this.apiUrl, walletAddress);
  }

  public getPDVDetails(cerberusUrl: string, pdvAddress: number, wallet: Wallet): Promise<PDVDetails> {
    return getPDVDetails(cerberusUrl, pdvAddress, wallet);
  }

  public sendPDV(
    cerberusUrl: string,
    pdv: PDV[],
    wallet: Wallet,
  ): Promise<PDVResponse> {
    return sendPDV(
      cerberusUrl,
      this.chainId,
      pdv,
      wallet,
    );
  }
}
