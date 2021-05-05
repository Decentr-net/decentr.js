import { Wallet } from '../../wallet';
import {
  Account,
  PrivateProfile,
  PrivateProfileBroadcastOptions,
  PublicProfile,
  PublicProfileBroadcastOptions,
  QueryPrivateProfileResponse,
  QueryPublicProfileResponse,
} from './types';
import { BroadcastResponse } from '../messages';
import { StdTxMessageType } from '../types';
import {
  getAccount,
  getPrivateProfile,
  getPublicProfile,
  setPrivateProfile,
  setPublicProfile,
} from './profile';

export class DecentrProfileSDK {
  constructor(
    private apiUrl: string,
    private chainId: string,
  ) {
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | undefined> {
    return getAccount(this.apiUrl, walletAddress);
  }

  public getPublicProfile(walletAddress: Wallet['address']): Promise<PublicProfile> {
    return getPublicProfile(this.apiUrl, walletAddress);
  }

  public getPrivateProfile<T>(
    walletAddress: Wallet['address'],
    privateKey: Wallet['privateKey'],
  ): Promise<T | undefined> {
    return getPrivateProfile(this.apiUrl, walletAddress, privateKey);
  }

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
  ): Promise<QueryPublicProfileResponse>;

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
    broadcastOptions: PublicProfileBroadcastOptions,
  ): Promise<BroadcastResponse<StdTxMessageType.ProfileSetPublic>>;

  public setPublicProfile(
    walletAddress: string,
    publicProfile: PublicProfile,
    broadcastOptions?: PublicProfileBroadcastOptions,
  ): Promise<QueryPublicProfileResponse | BroadcastResponse<StdTxMessageType.ProfileSetPublic>> {
    return setPublicProfile(
      this.apiUrl,
      this.chainId,
      walletAddress,
      publicProfile,
      broadcastOptions as PublicProfileBroadcastOptions
    );
  }

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
  ): Promise<QueryPrivateProfileResponse>;

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
    broadcastOptions: PrivateProfileBroadcastOptions
  ): Promise<BroadcastResponse<StdTxMessageType.ProfileSetPrivate>>;

  public setPrivateProfile<T extends PrivateProfile>(
    walletAddress: Wallet['address'],
    privateProfile: T,
    privateKey: Wallet['privateKey'],
    broadcastOptions?: PrivateProfileBroadcastOptions
  ): Promise<QueryPrivateProfileResponse | BroadcastResponse<StdTxMessageType.ProfileSetPrivate>> {
    return setPrivateProfile<T>(
      this.apiUrl,
      this.chainId,
      walletAddress,
      privateProfile,
      privateKey,
      broadcastOptions as PrivateProfileBroadcastOptions,
    );
  }
}
