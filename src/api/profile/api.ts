import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { getSignature } from '../api-utils';
import { PDVAddress, PDVType, ProfileUpdate, sendPDV } from '../pdv';
import { Account, Profile } from './types';

export async function getAccount(
  nodeUrl: string,
  walletAddress: Wallet['address'],
): Promise<Account | undefined> {
  const url = `${nodeUrl}/cosmos/auth/v1beta1/accounts/${walletAddress}`;

  return fetchJson<{ account: Account }>(url)
    .then(({ account }) => account.address ? account : undefined)
    .catch(() => void 0);
}

export function setProfile(
  cerberusUrl: string,
  profile: ProfileUpdate,
  keyPair: KeyPair,
): Promise<PDVAddress> {
  return sendPDV(
    cerberusUrl,
    [
      {
        ...profile,
        type: PDVType.Profile,
      },
    ],
    keyPair,
  );
}

export function getProfile(
  cerberusUrl: string,
  walletAddress: Wallet['address'],
  keys?: KeyPair,
): Promise<Profile> {
  return getProfiles(cerberusUrl, [walletAddress], keys)
    .then((profiles) => profiles[walletAddress]);
}

export function getProfiles(
  cerberusUrl: string,
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

  return fetchJson<Profile[]>(`${cerberusUrl}/v1/profiles`, {
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
