import { BroadcastTxResponse, Coin } from '@cosmjs/stargate';

import { createWalletFromPrivateKey, Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { signAndBroadcast } from '../api-utils';
import { getMinGasPrice } from '../operations';
import { Validator } from '../staking';
import { DelegatorRewards, DistributionParameters } from './types';

export function getCommunityPool(nodeUrl: string): Promise<Coin[]> {
  const url = `${nodeUrl}/cosmos/distribution/v1beta1/community_pool`;

  return fetchJson<{ pool: Coin[] }>(url)
    .then(({ pool }) => pool);
}

export function getDistributionParameters(nodeUrl: string): Promise<DistributionParameters> {
  const url = `${nodeUrl}/cosmos/distribution/v1beta1/params`;

  return fetchJson<{ params: DistributionParameters }>(url)
    .then(({ params }) => params);
}

export function getDelegatorRewards(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<DelegatorRewards> {
  const url = `${nodeUrl}/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`;

  return fetchJson(url);
}

export function getDelegatorRewardsFromValidator(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
  validatorAddress?: Validator['operator_address'],
): Promise<DelegatorRewards | Coin[]> {
  const url
    = `${nodeUrl}/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`;

  return fetchJson<{ rewards: Coin[] }>(url)
    .then(({ rewards }) => rewards);
}

export function getWithdrawAddress(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Wallet['address']> {
  const url = `${nodeUrl}/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/withdraw_address`;

  return fetchJson<{ withdraw_address: Wallet['address'] }>(url)
    .then(({ withdraw_address }) => withdraw_address);
}

export function getValidatorCommission(
  nodeUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<Coin[]> {
  const url = `${nodeUrl}/cosmos/distribution/v1beta1/validators/${validatorAddress}/commission`;

  return fetchJson<{ commission: { commission: Coin[] } }>(url)
    .then((response) => response.commission.commission);
}

export function getValidatorOutstandingRewards(
  nodeUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<Coin[]> {
  const url
    = `${nodeUrl}/cosmos/distribution/v1beta1/validators/${validatorAddress}/outstanding_rewards`;

  return fetchJson<{ rewards: { rewards: Coin[] } }>(url)
    .then((response) => response.rewards.rewards);
}

export async function replaceWithdrawAddress(
  nodeUrl: string,
  withdrawAddress: Wallet['address'],
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
    value: {
      delegatorAddress: wallet.address,
      withdrawAddress,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

// TODO
// export async function calculateWithdrawDelegatorRewardsFee(
//   nodeUrl: string,
//   delegatorAddress: Wallet['address'],
//   fromValidatorAddress?: Validator['operator_address'],
// ): Promise<Coin[]> {
//   const url = createWithdrawDelegatorRewardsUrl(
//     nodeUrl,
//     delegatorAddress,
//     fromValidatorAddress,
//   );
//
//   const queryBody = await prepareQueryBody(
//     url,
//     chainId,
//     {},
//     delegatorAddress,
//   );
//
//   return calculateTransactionFeeAmount(nodeUrl, queryBody.base_req.gas as string);
// }

export async function withdrawDelegatorRewards(
  nodeUrl: string,
  validatorAddresses: Validator['operator_address'][],
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const messages = validatorAddresses.map((validatorAddress) => ({
    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    value: {
      delegatorAddress: wallet.address,
      validatorAddress,
    },
  }));

  return signAndBroadcast(
    nodeUrl,
    messages,
    minGasPrice,
    privateKey,
  );
}

// TODO: deprecated?
// export function getValidatorDistribution(
//   nodeUrl: string,
//   validatorAddress: Validator['operator_address'],
// ): Promise<ValidatorDistribution> {
//   return blockchainFetch(
//     `${nodeUrl}/distribution/validators/${validatorAddress}`,
//   );
// }

// TODO
// export async function calculateWithdrawValidatorRewardsFee(
//   nodeUrl: string,
//   walletAddress: Wallet['address'],
//   validatorAddress: Validator['operator_address'],
// ): Promise<Fee[]> {
// }

export async function withdrawValidatorRewards(
  nodeUrl: string,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createWalletFromPrivateKey(privateKey);

  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
    value: {
      validatorAddress: wallet.validatorAddress,
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}
