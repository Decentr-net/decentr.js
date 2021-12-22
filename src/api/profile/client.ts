import { Account, StargateClient } from '@cosmjs/stargate';

import { KeyPair, Wallet } from '../../wallet';
import { PDVAddress, PDVType, ProfilePDV } from '../pdv';
import { sendPDV } from '../pdv/api';
import { getSignature } from '../api-utils';
import { bytesToHex, fetchJson } from '../../utils';
import { Profile } from './types';

export class DecentrProfileClient {
  private constructor(
    private cerberusUrl: string,
    private stargateClient: StargateClient,
  ) {
  }

  public static async create(nodeUrl: string, cerberusUrl: string): Promise<DecentrProfileClient> {
    const stargateClient = await StargateClient.connect(nodeUrl);

    return new DecentrProfileClient(cerberusUrl, stargateClient);
  }

  public getAccount(walletAddress: Wallet['address']): Promise<Account | null> {
    return this.stargateClient.getAccount(walletAddress);
  }

  public setProfile(
    profile: Omit<ProfilePDV, 'type'>,
    keyPair: KeyPair,
  ): Promise<PDVAddress> {
    return sendPDV(
      this.cerberusUrl,
      [
        {
          ...profile,
          type: PDVType.Profile,
        },
      ],
      keyPair,
    );
  }

  public getProfile(
    walletAddress: Wallet['address'],
    keys?: KeyPair,
  ): Promise<Profile> {
    return this.getProfiles([walletAddress], keys)
      .then((profiles) => profiles[walletAddress]);
  }

  public getProfiles(
    walletAddresses: Wallet['address'][],
    keys?: KeyPair,
  ): Promise<Record<Profile['address'], Profile>> {
    let headers = {};

    if (keys) {
      const signature = getSignature(`/v1/profiles`, keys.privateKey);
      const signatureHex = bytesToHex(signature);

      headers = {
        'Public-Key': keys.publicKey,
        Signature: signatureHex,
      };
    }

    return fetchJson<Profile[]>(`${this.cerberusUrl}/v1/profiles`, {
      headers,
      queryParameters: {
        address: walletAddresses,
      },
    }).then((profilesResponse) => {
      const profiles: Record<Wallet['address'], Profile> = {};

      profilesResponse.forEach((profile) => {
        profiles[profile.address] = profile;
      });

      return profiles;
    });
  }
}
