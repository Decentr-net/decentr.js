import { KeyPair, Wallet } from '../../wallet';
import { PDVAddress, ProfilePDV } from '../pdv';
import { getAccount, getProfile, getProfiles, setProfile } from './profile';
import { Account, Profile, } from './types';

export class DecentrProfileSDK {
  constructor(
    private apiUrl: string,
  ) {
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | undefined> {
    return getAccount(this.apiUrl, walletAddress);
  }

  public setProfile(
    cerberusUrl: string,
    profile: Omit<ProfilePDV, 'type'>,
    wallet: Wallet,
  ): Promise<PDVAddress> {
    return setProfile(cerberusUrl, profile, wallet);
  }

  public getProfile(
    cerberusUrl: string,
    walletAddress: Wallet['address'],
    keys?: KeyPair,
  ): Promise<Profile> {
    return getProfile(cerberusUrl, walletAddress, keys);
  }

  public getProfiles(
    cerberusUrl: string,
    walletAddresses: Wallet['address'][],
    keys?: KeyPair,
  ): Promise<Record<Profile['address'], Profile>> {
    return getProfiles(cerberusUrl, walletAddresses, keys);
  }
}
