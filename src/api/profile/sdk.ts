import { KeyPair, Wallet } from '../../wallet';
import { PDVAddress, ProfilePDV } from '../pdv';
import { getAccount, getProfile, getProfiles, setProfile } from './api';
import { Account, Profile, } from './types';

export class DecentrProfileSDK {
  constructor(
    private nodeUrl: string,
    private cerberusUrl: string,
  ) {
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | undefined> {
    return getAccount(this.nodeUrl, walletAddress);
  }

  public setProfile(
    profile: Omit<ProfilePDV, 'type'>,
    wallet: Wallet,
  ): Promise<PDVAddress> {
    return setProfile(this.cerberusUrl, profile, wallet);
  }

  public getProfile(
    walletAddress: Wallet['address'],
    keys?: KeyPair,
  ): Promise<Profile> {
    return getProfile(this.cerberusUrl, walletAddress, keys);
  }

  public getProfiles(
    walletAddresses: Wallet['address'][],
    keys?: KeyPair,
  ): Promise<Record<Profile['address'], Profile>> {
    return getProfiles(this.cerberusUrl, walletAddresses, keys);
  }
}
