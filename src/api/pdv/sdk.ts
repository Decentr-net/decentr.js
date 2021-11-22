import { Wallet } from '../../wallet';
import {
  getPDVBlacklist,
  getPDVDetails,
  getPDVList,
  getPDVMeta,
  getRewards,
  sendPDV,
} from './api';
import {
  PDV,
  PDVDetails,
  PDVListItem,
  PDVListPaginationOptions,
  PDVAddress,
  PDVType,
  PDVMeta,
  PDVBlacklist,
} from './types';

export class DecentrPDVSDK {

  public getPDVBlacklist(
    cerberusUrl: string,
  ): Promise<PDVBlacklist> {
    return getPDVBlacklist(cerberusUrl);
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
