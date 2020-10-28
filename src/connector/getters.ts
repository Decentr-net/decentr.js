import { Wallet } from './../types';
// tslint:disable-next-line: no-unused-expression
'use strict'

import { decryptWithPrivatekey } from "../cosmos-keys"

/* eslint-env browser */

const RETRIES = 4

export default function Getters (cosmosRESTURL: any) {
  // request and retry
  async function get (path: any, { page, limit, all } = { page: 1, limit: 30, all: false }, tries = RETRIES): Promise<any> {
    while (tries) {
      try {
        let url = cosmosRESTURL + path
        const isTxsPagination = path.startsWith('/txs?')
        if (isTxsPagination) url = url + `&page=${page}&limit=${limit}`
        let headersDec = new Headers();
        headersDec.append('Access-Control-Allow-Origin', '*')
        const response = await fetch(url).then(res => {
          return res.json();
        })

        // handle txs pagination
        if (isTxsPagination) {
          if (!all || Number(response.page_number) >= Number(response.page_total)) return response.txs

          return response.txs.concat(await get(path, { page: page + 1, limit, all }))
        }

        // handle height wrappers
        // most responses are wrapped in a construct containing height and the actual result
        if (response.height !== undefined && response.result !== undefined) {
          return response.result
        }

        return response
      } catch (err) {
        if (--tries === 0) {
          throw err
        }
      }
    }
  }

  return {
    url: cosmosRESTURL,

    // meta
    connected: function () {
      return this.nodeVersion().then(() => true, () => false)
    },

    nodeVersion: () => fetch(cosmosRESTURL + `/node_version`).then(res => res.text()),
    // profiles

    publicProfile: (address: string) => get(`/profile/public/${address}`),

    privateProfile: function (wallet: any) {
      // tslint:disable-next-line: no-floating-promises
      return get(`/profile/private/${wallet.address}`).then(res => {
        if (res) {
          return decryptWithPrivatekey(res, wallet.privateKey)
        } else return '';
      })
    },


    // PDV

    // Get cerberus address
    cerberusAddress: () => get('/pdv/cerberus-addr').then(res => res.address),

    // Query pdv token balance
    tokenBalance: (address: string) => get(`/token/balance/${address}`).then(res => res),

    // List account's pdv
    pdvList: (owner: string) => get(`/pdv/${owner}/list`),

    // List account's daily stats
    pdvStats: (owner: string) => get(`/pdv/${owner}/stats`),

    // Query pdv full
    pdvFull: (address: string) => get(`/pdv/${address}/show`),

    // Query pdv owner by its address
    pdvOwner: (address: string) => get(`/pdv/${address}/owner`),


    // coins
    account: function (address: string) {
      const emptyAccount = {
        coins: [],
        sequence: `0`,
        account_number: `0`
      }
      return get(`/auth/accounts/${address}`)
        .then((res: any) => {
          if (!res) return emptyAccount
          let account = res.value || emptyAccount
          // HACK, hope for: https://github.com/cosmos/cosmos-sdk/issues/3885
          if (res.type === `auth/DelayedVestingAccount`) {
            if (!account.BaseVestingAccount) {
              console.error(
                `SDK format of vesting accounts responses has changed`
              )
              return emptyAccount
            }
            account = Object.assign(
              {},
              account.BaseVestingAccount.BaseAccount,
              account.BaseVestingAccount
            )
            delete account.BaseAccount
            delete account.BaseVestingAccount
          }
          return account
        })
        .catch((err: any) => {
          // if account not found, return null instead of throwing
          if (
            err.response &&
            (err.response.data.includes(`account bytes are empty`) ||
              err.response.data.includes(`failed to prove merkle proof`))
          ) {
            return emptyAccount
          }
          throw err
        })
    },
    txs: function (addr: string, paginationOptions: any) {
      return get(`/txs?message.sender=${addr}`, paginationOptions)
    },
    bankTxs: function (addr: string, paginationOptions: any) {
      return Promise.all([
        get(`/txs?message.sender=${addr}`, paginationOptions),
        get(`/txs?message.recipient=${addr}`, paginationOptions)
      ]).then(([senderTxs, recipientTxs]) => [].concat(senderTxs, recipientTxs))
    },
    txsByHeight: function (height: any, paginationOptions: any) {
      return get(`/txs?tx.height=${height}`, paginationOptions)
    },
    tx: (hash: string) => get(`/txs/${hash}`),

    /* ============ STAKE ============ */
    stakingTxs: async function (address: any, valAddress: any, paginationOptions: { page: number; limit: number; all: boolean } | undefined) {
      return Promise.all([
        get(
          `/txs?message.action=create_validator&message.destination-validator=${valAddress}`, paginationOptions),
        get(
          `/txs?message.action=edit_validator&message.destination-validator=${valAddress}`, paginationOptions),
        get(`/txs?message.action=delegate&message.delegator=${address}`),
        get(`/txs?message.action=begin_redelegate&message.delegator=${address}`, paginationOptions),
        get(`/txs?message.action=begin_unbonding&message.delegator=${address}`, paginationOptions),
        get(`/txs?message.action=unjail&message.source-validator=${valAddress}`, paginationOptions)
      ]).then(([
        createValidatorTxs,
        editValidatorTxs,
        delegationTxs,
        redelegationTxs,
        undelegationTxs,
        unjailTxs
      ]) =>
        [].concat(
          createValidatorTxs,
          editValidatorTxs,
          delegationTxs,
          redelegationTxs,
          undelegationTxs,
          unjailTxs
        )
      )
    },
    // Get all delegations information from a delegator
    delegations: function (addr: any) {
      return get(`/staking/delegators/${addr}/delegations`)
    },
    // undelegations: function (addr: any) {
    //   return get(

    //     `/staking/delegators/${addr}/unbonding_delegations`,
    //     true
    //   )
    // },
    redelegations: function (addr: any) {
      return get(`/staking/redelegations?delegator=${addr}`)
    },
    // Query all validators that a delegator is bonded to
    delegatorValidators: function (delegatorAddr: any) {
      return get(`/staking/delegators/${delegatorAddr}/validators`)
    },
    // Get a list containing all the validator candidates
    validators: () => Promise.all([
      get(`/staking/validators?status=unbonding`),
      get(`/staking/validators?status=bonded`),
      get(`/staking/validators?status=unbonded`)
    ]).then((validatorGroups) =>
      [].concat(...validatorGroups)
    ),
    // Get information from a validator
    validator: function (addr: any) {
      return get(`/staking/validators/${addr}`)
    },

    // Get the list of the validators in the latest validator set
    validatorSet: () => get(`/validatorsets/latest`),

    // Query a delegation between a delegator and a validator
    // delegation: function (delegatorAddr: any, validatorAddr: any) {
    //   return get(

    //     `/staking/delegators/${delegatorAddr}/delegations/${validatorAddr}`, true
    //   )
    // },
    // unbondingDelegation: function (delegatorAddr: any, validatorAddr: any) {
    //   return get(

    //     `/staking/delegators/${delegatorAddr}/unbonding_delegations/${validatorAddr}`,
    //     true
    //   )
    // },
    pool: () => get(`/staking/pool`),
    stakingParameters: () => get(`/staking/parameters`),

    /* ============ Slashing ============ */

    validatorSigningInfo: function (pubKey: any) {
      return get(`/slashing/validators/${pubKey}/signing_info`)
    },
    validatorSigningInfos: function () {
      return get(`/slashing/signing_infos`)
    },

    /* ============ Governance ============ */

    proposals: () => get(`/gov/proposals`),
    proposal: function (proposalId: any) {
      return get(`/gov/proposals/${proposalId}`)
    },
    proposer: function (proposalId: any) {
      return get(`/gov/proposals/${proposalId}/proposer`)
    },
    proposalVotes: function (proposalId: any) {
      return get(`/gov/proposals/${proposalId}/votes`)
    },
    proposalVote: function (proposalId: any, address: any) {
      return get(`/gov/proposals/${proposalId}/votes/${address}`)
    },
    proposalDeposits: function (proposalId: any) {
      return get(`/gov/proposals/${proposalId}/deposits`)
    },
    // proposalDeposit: function (proposalId: any, address: any) {
    //   return get(

    //     `/gov/proposals/${proposalId}/deposits/${address}`,
    //     true
    //   )
    // },
    proposalTally: function (proposalId: any) {
      return get(`/gov/proposals/${proposalId}/tally`)
    },
    govDepositParameters: () => get(`/gov/parameters/deposit`),
    govTallyingParameters: () => get(`/gov/parameters/tallying`),
    govVotingParameters: () => get(`/gov/parameters/voting`),
    governanceTxs: async function (address: any) {
      return Promise.all([
        get(`/txs?message.action=submit_proposal&message.proposer=${address}`),
        get(`/txs?message.action=deposit&message.depositor=${address}`),
        get(`/txs?message.action=vote&message.voter=${address}`)
      ]).then(([submitProposalTxs, depositTxs, voteTxs]) =>
        [].concat(submitProposalTxs, depositTxs, voteTxs)
      )
    },
    /* ============ Explorer ============ */
    block: function (blockHeight: any) {
      return get(`/blocks/${blockHeight}`)
    },
    /* ============ Distribution ============ */
    distributionTxs: async function (address: any, valAddress: any) {
      return Promise.all([
        get(`/txs?message.action=set_withdraw_address&message.delegator=${address}`),
        get(`/txs?message.action=withdraw_delegator_reward&message.delegator=${address}`),
        get(`/txs?message.action=withdraw_validator_rewards_all&message.source-validator=${valAddress}`)
      ]).then(([
        updateWithdrawAddressTxs,
        withdrawDelegationRewardsTxs,
        withdrawValidatorCommissionTxs
      ]) =>
        [].concat(
          updateWithdrawAddressTxs,
          withdrawDelegationRewardsTxs,
          withdrawValidatorCommissionTxs
        )
      )
    },
    delegatorRewards: function (delegatorAddr: any) {
      return get(`/distribution/delegators/${delegatorAddr}/rewards`)
    },
    delegatorRewardsFromValidator: async function (delegatorAddr: any, validatorAddr: any) {
      return (await get(
        `/distribution/delegators/${delegatorAddr}/rewards/${validatorAddr}`
      )) || []
    },
    validatorDistributionInformation: function (validatorAddr: any) {
      return get(`/distribution/validators/${validatorAddr}`)
    },
    validatorRewards: function (validatorAddr: any) {
      return get(`/distribution/validators/${validatorAddr}/rewards`)
    },
    distributionParameters: function () {
      return get(`/distribution/parameters`)
    },
    distributionOutstandingRewards: function () {
      return get(`/distribution/outstanding_rewards`)
    },

    annualProvisionedTokens: function () {
      return get(`/minting/annual-provisions`)
    },
    inflation: function () {
      return get(`/minting/inflation`)
    },
    mintingParameters: function () {
      return get(`/minting/parameters`)
    }
  }
}
