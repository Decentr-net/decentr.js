import { fetchJson, getAuthHeaders } from '../../../utils';
import { KeyPair, Wallet } from '../../../wallet';
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
    keyPair: KeyPair,
  ): Promise<PDVAddress> {
    const pdv: ProfilePDV = {
      ...profile,
      type: PDVType.Profile,
    };

    return this.pdvClient.sendPDV([pdv], keyPair);
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
