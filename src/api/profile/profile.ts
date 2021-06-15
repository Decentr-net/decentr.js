import { bytesToHex, fetchJson } from '../../utils';
import { KeyPair, Wallet } from '../../wallet';
import { blockchainFetch, getSignature } from '../api-utils';
import { PDVAddress, PDVType, ProfileUpdate, sendPDV } from '../pdv';
import { Account, AccountResponse, Profile } from './types';

export async function getAccount(
  apiUrl: string,
  walletAddress: Wallet['address'],
): Promise<Account | undefined> {
  const response = await blockchainFetch<AccountResponse>(
    `${apiUrl}/auth/accounts/${walletAddress}`,
  );

  const account = response.value;

  return account.address ? account : undefined;
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
