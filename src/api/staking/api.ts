import { BroadcastTxResponse, SigningStargateClient } from '@cosmjs/stargate';
import { coin } from '@cosmjs/proto-signing';
import { createSecp256k1WalletFromPrivateKey, Wallet } from '../../wallet';
import { fetchJson } from '../../utils';
import { assertIsBroadcastSuccess, createDecentrCoin, signAndBroadcast } from '../api-utils';
import { getMinGasPrice } from '../operations';
import {
  DelegateTokensOptions,
  Delegation,
  Pool,
  RedelegateTokensOptions,
  Redelegation,
  RedelegationsFilterParameters,
  StakingParameters,
  UnbondingDelegation,
  UndelegateTokensOptions,
  Validator,
  ValidatorsFilterParameters,
} from './types';

export function getPool(
  nodeUrl: string,
): Promise<Pool> {
  return fetchJson<{ pool: Pool }>(`${nodeUrl}/cosmos/staking/v1beta1/pool`)
    .then(({ pool }) => pool);
}

export function getValidators(
  nodeUrl: string,
  filter?: ValidatorsFilterParameters,
): Promise<Validator[]> {
  return fetchJson<{ validators: Validator[] }>(`${nodeUrl}/cosmos/staking/v1beta1/validators`, {
    queryParameters: {
      status: filter?.status,
    },
  })
    .then(({ validators }) => validators);
}

export function getValidator(
  nodeUrl: string,
  address: Validator['operator_address'],
): Promise<Validator> {
  return fetchJson<{ validator: Validator }>(`${nodeUrl}/cosmos/staking/v1beta1/validators/${address}`)
    .then(({ validator }) => validator);
}

export function getDelegations(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Delegation[]> {
  const url = `${nodeUrl}/cosmos/staking/v1beta1/delegations/${delegatorAddress}`;

  return fetchJson<{ delegation_responses: Delegation[] }>(url)
    .then((response) => response.delegation_responses);
}

export function getDelegation(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<Delegation> {
  const url =
    `${nodeUrl}/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}`;

  return fetchJson<{ delegation_response: Delegation }>(url)
    .then((response) => response.delegation_response);
}

// TODO
// export async function calculateCreateDelegationFee(
//   nodeUrl: string,
//   chainId: string,
//   delegation: CreateDelegationRequest,
// ): Promise<Fee[]> {
//   const url = getCreateDelegationUrl(nodeUrl, delegation.delegator_address);
//
//   const queryBody = await prepareQueryBody(
//     url,
//     chainId,
//     delegation,
//     delegation.delegator_address,
//   );
//
//   return calculateTransactionFeeAmount(nodeUrl, queryBody.base_req.gas as string);
// }

export async function delegateTokens(
  nodeUrl: string,
  options: DelegateTokensOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  // TODO: replace with gasPrice
  const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet);
  // const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet, { gasPrice });

  const accounts = await wallet.getAccounts();

  const result = await signingStargateClient.delegateTokens(
    accounts[0].address,
    options.validatorAddress,
    options.denom
      ? coin(options.amount, options.denom)
      : createDecentrCoin(options.amount),
    // TODO: change to 'auto'
    {
      amount: [createDecentrCoin(options.amount)],
      gas: '1',
    },
    options.comment,
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}

export function getValidatorDelegations(
  nodeUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<Delegation[]> {
  const url = `${nodeUrl}/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations`;

  return fetchJson<{ delegation_responses: Delegation[] }>(url)
    .then(({ delegation_responses }) => delegation_responses);
}

// TODO
// export async function calculateCreateUnbondingDelegationFee(
//   nodeUrl: string,
//   unbondingDelegation: CreateUnbondingDelegationRequest,
// ): Promise<Fee[]> {
//   const url = getCreateUnbondingDelegationUrl(nodeUrl, unbondingDelegation.delegator_address);
//
//   const queryBody = await prepareQueryBody(
//     url,
//     chainId,
//     unbondingDelegation,
//     unbondingDelegation.delegator_address,
//   );
//
//   return calculateTransactionFeeAmount(nodeUrl, queryBody.base_req.gas as string);
// }

export async function undelegateTokens(
  nodeUrl: string,
  options: UndelegateTokensOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const wallet = await createSecp256k1WalletFromPrivateKey(privateKey);

  // TODO: replace with gasPrice
  const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet);
  // const signingStargateClient = await SigningStargateClient.connectWithSigner(nodeUrl, wallet, { gasPrice });

  const accounts = await wallet.getAccounts();

  const result = await signingStargateClient.undelegateTokens(
    accounts[0].address,
    options.validatorAddress,
    options.denom
      ? coin(options.amount, options.denom)
      : createDecentrCoin(options.amount),
    // TODO: change to 'auto'
    {
      amount: [createDecentrCoin(options.amount)],
      gas: '1',
    },
    options.comment,
  );

  signingStargateClient.disconnect();

  assertIsBroadcastSuccess(result);

  return result;
}

export function getUnbondingDelegations(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<UnbondingDelegation[]> {
  const url
    = `${nodeUrl}/cosmos/staking/v1beta1/delegators/${delegatorAddress}/unbonding_delegations`;

  return fetchJson<{ unbonding_responses: UnbondingDelegation[] }>(url)
    .then(({ unbonding_responses }) => unbonding_responses);
}

export function getUnbondingDelegationsFromValidator(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
  validatorAddress: Validator['operator_address'],
): Promise<UnbondingDelegation> {
  const url
    = `${nodeUrl}/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}/unbonding_delegation`

  return fetchJson<{ unbond: UnbondingDelegation }>(url)
    .then(({ unbond }) => unbond);
}

export function getValidatorUnbondingDelegations(
  nodeUrl: string,
  validatorAddress: Validator['operator_address'],
): Promise<UnbondingDelegation[]> {
  const url
    = `${nodeUrl}/cosmos/staking/v1beta1/validators/${validatorAddress}/unbonding_delegations`

  return fetchJson<{ unbonding_responses: UnbondingDelegation[] }>(url)
    .then(({ unbonding_responses }) => unbonding_responses);
}

// TODO
// export async function calculateCreateRedelegationFee(
//   nodeUrl: string,
//   redelegation: CreateRedelegationRequest,
// ): Promise<Coin[]> {
// }

export async function redelegateTokens(
  nodeUrl: string,
  options: RedelegateTokensOptions,
  privateKey: Wallet['privateKey'],
): Promise<BroadcastTxResponse> {
  const minGasPrice = await getMinGasPrice(nodeUrl);

  const message = {
    typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
    value: {
      ...options,
      amount: options.denom
        ? coin(options.amount, options.denom)
        : createDecentrCoin(options.amount),
    },
  };

  return signAndBroadcast(
    nodeUrl,
    message,
    minGasPrice,
    privateKey,
  );
}

export async function getRedelegations(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
  filter?: RedelegationsFilterParameters,
): Promise<Redelegation[]> {
  const url
    = `${nodeUrl}/cosmos/staking/v1beta1/delegators/${delegatorAddress}/redelegations`

  return fetchJson<{ redelegation_responses: Redelegation[] }>(url, {
    queryParameters: {
      dst_validator_addr: filter?.validatorDstAddress,
      src_validator_addr: filter?.validatorSrcAddress,
    },
  })
    .then(({ redelegation_responses }) => redelegation_responses);
}

export async function getDelegatorValidators(
  nodeUrl: string,
  delegatorAddress: Wallet['address'],
): Promise<Validator[]> {
  const url = `${nodeUrl}/cosmos/staking/v1beta1/delegators/${delegatorAddress}/validators`;

  return fetchJson<{ validators: Validator[] }>(url)
    .then(({ validators }) => validators);
}

export async function getStakingParameters(
  nodeUrl: string,
): Promise<StakingParameters> {
  const url = `${nodeUrl}/cosmos/staking/v1beta1/params`;

  return fetchJson<{ params: StakingParameters }>(url)
    .then(({ params }) => params);
}
