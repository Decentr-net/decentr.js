import { KeyPair, Wallet } from '../../wallet';
import { DecentrPDVClient, PDVAddress, PDVType, ProfilePDV } from '../pdv';
import { fetchJson, getAuthHeaders } from '../../utils';
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
    const path = `/v1/profiles`;

    const headers = keys
      ? getAuthHeaders(path, keys)
      : {};

    return fetchJson<Profile[]>(`${this.cerberusUrl}${path}`, {
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
