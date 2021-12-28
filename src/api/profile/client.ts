import { KeyPair, Wallet } from '../../wallet';
import { DecentrPDVClient, PDVAddress, PDVType, ProfilePDV } from '../pdv';
import { getSignature } from '../api-utils';
import { bytesToHex, fetchJson } from '../../utils';
import { Profile } from './types';

export class DecentrProfileClient {
  constructor(
    private cerberusUrl: string,
  ) {
  }

  public setProfile(
    profile: Omit<ProfilePDV, 'type'>,
    keyPair: KeyPair,
  ): Promise<PDVAddress> {
    const pdvClient = new DecentrPDVClient(this.cerberusUrl);

    const pdv: ProfilePDV = {
      ...profile,
      type: PDVType.Profile,
    };

    return pdvClient.sendPDV([pdv], keyPair);
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
