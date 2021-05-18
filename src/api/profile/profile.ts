import { Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { blockchainFetch } from '../api-utils';
import { PDVAddress, PDVType, ProfilePDV, sendPDV } from '../pdv';
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

export function saveProfile(
  cerberusUrl: string,
  profile: Omit<ProfilePDV, 'type'>,
  wallet: Wallet,
): Promise<PDVAddress> {
  return sendPDV(
    cerberusUrl,
    [
      {
        ...profile,
        type: PDVType.Profile,
      },
    ],
    wallet,
  );
}

export function getProfile(
  cerberusUrl: string,
  walletAddress: Wallet['address'],
): Promise<Profile> {
  return fetchJson<Profile[]>(`${cerberusUrl}/profiles`, {
    queryParameters: {
      address: walletAddress,
    },
  }).then((profilesResponse) => profilesResponse[0]);
}
