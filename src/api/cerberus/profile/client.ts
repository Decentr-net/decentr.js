import { fetchJson, getAuthHeaders } from '../../../utils';
import { Wallet } from '../../../wallet';
import { CerberusPDVClient, PDVAddress, PDVType, ProfilePDV, ProfileUpdate } from '../pdv';
import { Profile } from './types';

export class CerberusProfileClient {
  constructor(
    private readonly url: string,
    private readonly pdvClient: CerberusPDVClient,
  ) {
  }

  public setProfile(
    profile: ProfileUpdate,
    privateKey: Wallet['privateKey'],
  ): Promise<PDVAddress> {
    const pdv: ProfilePDV = {
      ...profile,
      type: PDVType.Profile,
    };

    return this.pdvClient.sendPDV([pdv], privateKey);
  }

  public getProfile(
    walletAddress: Wallet['address'],
    privateKey?: Wallet['privateKey'],
  ): Promise<Profile> {
    return this.getProfiles([walletAddress], privateKey)
      .then((profiles) => profiles[walletAddress]);
  }

  public getProfiles(
    walletAddresses: Wallet['address'][],
    privateKey?: Wallet['privateKey'],
  ): Promise<Record<Profile['address'], Profile>> {
    const path = `/v1/profiles`;

    const headers = privateKey
      ? getAuthHeaders(path, privateKey)
      : {};

    return fetchJson<Profile[]>(`${this.url}${path}`, {
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
