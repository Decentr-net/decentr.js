import { Wallet } from '../../wallet';
import { PDVAddress, ProfilePDV } from '../pdv';
import { getAccount, saveProfile } from './profile';
import { Account } from './types';

export class DecentrProfileSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | undefined> {
    return getAccount(this.apiUrl, walletAddress);
  }

  public saveProfile(
    cerberusUrl: string,
    profile: Omit<ProfilePDV, 'type'>,
    wallet: Wallet,
  ): Promise<PDVAddress> {
    return saveProfile(cerberusUrl, profile, wallet);
  }
}
