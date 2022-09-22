# decentr-js

> decentr-js

[![NPM version](https://img.shields.io/npm/v/decentr-js.svg)](https://www.npmjs.com/package/decentr-js)
![Downloads](https://img.shields.io/npm/dm/decentr-js.svg)

---

## ✨ Features

- Mnemonic generation (24 words combination)
- Wallet generation based on mnemonic (address, private key, public key)
- Querying to almost all decentr services
- Creating and broadcasting transactions

## 🔧 Installation

```sh
npm install decentr-js
```

## 🎬 Getting started

#Table of contents
1. [Mnemonic](#mnemonic)
2. [Wallet](#wallet)
3. [Decentr API](#decentr-api)
   1. [Status](#decentr-status)
   2. [Auth](#decentr-auth)
   3. [Bank](#decentr-bank)
   4. [Blocks](#decentr-blocks)
   5. [Community](#decentr-community)
   6. [Distribution](#decentr-distribution)
   7. [Mint](#decentr-mint)
   8. [Operations](#decentr-operations)
   9. [Staking](#decentr-staking)
   10. [Token](#decentr-token)
   11. [Tx](#decentr-tx)
4. [Cerberus API](#cerberus-api)
   1. [Configuration](#cerberus-configuration)   
   2. [Image](#cerberus-image)
   3. [PDV](#cerberus-pdv)
   4. [Profile](#cerberus-profile)
   5. [Rewards](#cerberus-rewards)
5. [Theseus API](#theseus-api)
   1. [DDV](#theseus-ddv)
   2. [Posts](#theseus-posts)
   3. [Profile](#theseus-profile)
6. [Vulcan API](#vulcan-api)
   1. [Referral](#vulcan-referral)
   2. [Registration](#vulcan-registration)
   3. [Loan](#vulcan-loan)
7. [License](#license)

## Mnemonic <a id="mnemonic" />

**Generate mnemonic phrase (24 words)**

```ts
import { generateMnemonic } from 'decentr-js';
const mnemonic = generateMnemonic();
/*
    fantasy scatter misery seminar resist file unique coral ordinary wash shoulder demise bubble calm sail protect divide write lend card sudden rally depart park
*/
```

## Wallet <a id="wallet" />

**Create wallet with address and keys**

```ts
import { createWalletFromMnemonic } from "decentr-js"

const seed = ...12 seed words here  
const wallet = createWalletFromMnemonic(seed);

/*
{
    address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
    validatorAddress: 'decentrvaloper1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5',
    privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
    publicKey: '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}
*/
```

# Using Decentr api <a id="decentr-api" />

## Decentr client

**For less text, we define some basic variables here**

```ts
import { DecentrClient } from 'decentr-js';

const NODE_URL = 'http://rest.testnet.decentr.xyz:26657'; // blockchain node

const privateKey = 'decentrPrivateKey'; // optional, if you do not need to use sign functionality

const decentrClient = await DecentrClient.create(NODE_URL, privateKey);
```

## Status <a id="decentr-status" />

```ts
  const status = await decentrClient.status();
```
Response of `status` method is a [StatusResponse](https://github.com/cosmos/cosmjs/blob/e7b107a0d0419fbd5280645a70153548235617fa/packages/tendermint-rpc/src/tendermint34/responses.ts#L127).

## 📜 Auth <a id="decentr-auth" />

**Auth client has the following interface**

```
  class AuthClient {
    getAccount(walletAddress: Wallet['address']): Promise<Account | null>;
  }
```

**How to get instance of auth client**
```
  const authClient = decentrClient.auth;
```

### Methods

1. **Get account**
```ts
  const walletAddress = 'decentr1234567890abcdefghijklmno';
  const account = await authClient.getAccount(walletAddress);
```
Response of `getAccount` method is an [Account](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/stargate/src/accounts.ts#L15) or `null` if account is not exist.

## 📜 Bank <a id="decentr-bank" />

**Bank client has the following interface**

```
  class BankClient {
    getBalance(walletAddress: Wallet['address']): Promise<Coin[]>;

    getDenomBalance(walletAddress: Wallet['address'], denom: string): Promise<Coin>;

    getSupply(): Promise<Coin[]>;
    
    getDenomSupply(denom: string): Promise<Coin>;
    
    public sendTokens(
      request: SendTokensRequest,
    ): TransactionSigner;
  }
```

**How to get instance of bank client**
```
  const bankClient = decentrClient.bank;
```

### Methods

1. **Get balance**
```ts
  const walletAddress = 'decentr1234567890abcdefghijklmno';
  const balance = await bankClient.getBalance(decentr1234567890abcdefghijklmno);
```

Response of `getBalance` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

2. **Get denom balance**
```ts
  const walletAddress = 'decentr1234567890abcdefghijklmno';
  const denom = 'udec';
  const denomBalance = await bankClient.getDenomBalance(decentr1234567890abcdefghijklmno, denom);
```
*Notice*: `denom` is an optional param, it is `udec` by default.

Response of `getDenomBalance` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3).

3. **Get supply**
```ts
  const walletAddress = 'decentr1234567890abcdefghijklmno';
  const supply = await bankClient.getSupply(decentr1234567890abcdefghijklmno);
```
Response of `getSupply` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

4. **Get denom supply**
```ts
  const denom = 'udec';
  const denomSupply = await bankClient.getDenomSupply(denom);
```
*Notice*: `denom` is an optional param, it is `udec` by default.

Response of `getDenomSupply` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3).

5. **Send tokens**
```ts
  const message = {
    fromAddress: 'decentrFromAddress',
    toAddress: 'decentrToAddress',
    amount: [
      {
        amount: '100000000',
        denom: 'udec',
      },
    ],
  };
  const transactionSigner = bankClient.sendTokens(message);
```

<a id="transactionSigner"></a>
`transactionSigner` is an interface that allows `simulate` or `broadcast` transaction

```ts
  const gas = await transactionSigner.simulate(); // estimated gas that will be spent on broadcasting
```

```ts
  const transaction = await transactionSigner.signAndBroadcast('My gift to decentr user');
```
Response of `signAndBroadcast` method is a [DeliverTxResponse](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/stargate/src/stargateclient.ts#L99).

## 📜 Blocks <a id="decentr-blocks" />

**Blocks client has the following interface**
```
  class BlocksClient {
    getBlock(height?: BlockHeader['height']): Promise<Block>;
  }
```
**How to get instance of bank client**
```
  const blocksClient = decentrClient.blocks;
```

### Methods

1. **Get block**
```ts
  const height = 12345;
  const block = await blocksClient.getBlock(decentr1234567890abcdefghijklmno)
```
*Notice*: `height` is an optional param, method will return the latest block if `height` is not supplied.

Response of `getBlock` method is a [Block](https://github.com/Decentr-net/decentr.js/blob/master/src/api/blockchain/cosmos/blocks/types.ts#L7).

## 📜 Community <a id="decentr-community" />

**Community client has the following interface**
```
  class CommunityClient {
    getModeratorAddresses(): Promise<Wallet['address'][]>;

    getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]>;

    createPost(
      request: MsgCreatePost['post'],
    ): TransactionSigner;

    deletePost(
      request: MsgDeletePost,
    ): TransactionSigner;

    setLike(
      request: MsgSetLike['like'],
    ): TransactionSigner;

    follow(
      request: MsgFollow,
    ): TransactionSigner;

    unfollow(
      request: MsgUnfollow,
    ): TransactionSigner;
  }
```
**How to get instance of community client**
```
  const communityClient = decentrClient.community;
```

### Methods

1. **Get moderators**
```ts
  const moderators = await communityClient.getModeratorAddresses();
```
Response of `getModeratorAddresses` method is a wallet addresses array;

2. **Get followees**
```ts
  const walletAddress = 'decentr123456789abcdefghijklmno';
  const followees = await communityClient.getFollowees(walletAddress);
```
Response of `getFollowees` method is a wallet address array;

3. **Create post**
```ts
  import { PostCategory } from 'decentr-js';
  const message = {
    owner: 'decentrAuthorAddress', // author's walletAddress
    uuid: '12345-abcde-67890-fghijk',
    title: 'Post title',
    previewImage: 'http://image.png',
    category: PostCategory.CATEGORY_TRAVEL_AND_TOURISM,
    text: 'Post text',
  };
  const transactionSigner = communityClient.createPost(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

4. **Delete post**
```ts
  const message = {
    postOwner: 'decentrAuthorAddress',
    postUuid: '12345-abcde-67890-fghijk',
    owner: 'decentrInitiatorAddress',
  };
  const transactionSigner = communityClient.deletePost(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

5. **Set like**
```ts
  import { LikeWeight } from 'decentr-js'
  const message = {
    postOwner: 'decentrAuthorAddress',
    postUuid: '12345-abcde-67890-fghijk',
    owner: 'decentrInitiatorAddress',
    weight: LikeWeight.LIKE_WEIGHT_UP,
  };
  const transactionSigner = communityClient.deletePost(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

6. **Follow**
```ts
  import { LikeWeight } from 'decentr-js'
  const message = {
    owner: 'decentrFollowerAddress',
    whom: 'decentrWhomToFollowAddress',
  };
  const transactionSigner = communityClient.deletePost(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

7. **Unfollow**
```ts
  import { LikeWeight } from 'decentr-js'
  const message = {
    owner: 'decentrFollowerAddress',
    whom: 'decentrWhomToUnfollowAddress',
  };
  const transactionSigner = communityClient.deletePost(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Distribution <a id="distribution" />

**Distribution client has the following interface**
```
  class DistributionClient {
    getCommunityPool(): Promise<Coin[]>;

    getDistributionParameters(): Promise<Params>;

    getDelegatorRewards(delegatorAddress: Wallet['address']): Promise<QueryDelegationTotalRewardsResponse>;

    getDelegatorRewardsFromValidator(
      delegatorAddress: Wallet['address'],
      validatorAddress: Validator['operatorAddress'],
    ): Promise<Coin[]>;

    getWithdrawAddress(delegatorAddress: Wallet['address']): Promise<Wallet['address']>;

    getValidatorCommission(validatorAddress: Validator['operatorAddress']): Promise<Coin[]>;

    getValidatorOutstandingRewards(validatorAddress: Validator['operatorAddress']): Promise<Coin[]>;

    setWithdrawAddress(
      request: SetWithdrawAddressRequest,
    ): TransactionSigner;
    
    withdrawDelegatorRewards(
      request: WithdrawDelegatorRewardRequest,
    ): TransactionSigner;
    
    withdrawValidatorRewards(
      request: WithdrawValidatorCommissionRequest,
    ): TransactionSigner;
  }
```
**How to get instance of distribution client**
```
  const distributionClient = decentrClient.distribution;
```

### Methods

1. **Get community pool**
```ts
  const communityPool = await distributionClient.getCommunityPool();
```
Response of `getCommunityPool` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

2. **Get parameters**
```ts
  const parameters = await distributionClient.getDistributionParameters(walletAddress);
```
Response of `getDistributionParameters` method is a [Params](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/distribution/v1beta1/distribution.ts#L9);

3. **Get delegator rewards**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const delegatorRewards = await distributionClient.getDelegatorRewards(delegatorAddress);
```
Response of `getDelegatorRewards` method is a [QueryDelegationTotalRewardsResponse](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/distribution/v1beta1/query.ts#L119)

4. **Get delegator rewards from validator**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const delegatorRewards = await distributionClient.getDelegatorRewardsFromValidator(delegatorAddress, validatorAddress);
```
Response of `getDelegatorRewardsFromValidator` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

5. **Get withdraw address**
```ts
  const walletAddress = 'decentrWalletAddress';
  const withdrawAddress = await distributionClient.getWithdrawAddress(walletAddress);
```
Response of `getWithdrawAddress` method is a wallet address where staking rewards will be transferred;

6. **Get validator commission**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const commission = await distributionClient.getValidatorCommission(validatorAddress);
```
Response of `getValidatorCommission` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

7. **Get validator outstanding rewards**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const outstandingRewards = await distributionClient.getValidatorOutstandingRewards(validatorAddress);
```
Response of `getValidatorOutstandingRewards` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

8. **Set withdraw address**
```ts
  const message = {
    delegatorAddress: 'decentrDelegatorAddress',
    withdrawAddress: 'decentrWithdrawAddrews',
  };
  const transactionSigner = distributionClient.setWithdrawAddress(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

9. **Withdraw delegator rewards**
```ts
  const messages = [
    {
      delegatorAddress: 'decentrDelegatorAddress',
      validatorAddress: 'decentrWithdrawAddrews1',
    },
    {
      delegatorAddress: 'decentrDelegatorAddress',
      validatorAddress: 'decentrWithdrawAddrews2',
    },
  ];
  const transactionSigner = distributionClient.withdrawDelegatorRewards(messages);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

10. **Withdraw validator rewards**
```ts
  const message = {
     validatorAddress: 'decentrvaloperValidatorAddress',
  };
  const transactionSigner = distributionClient.withdrawValidatorRewards(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Mint <a id="decentr-mint" />

**Mint client has the following interface**

```
  class MintClient {
    getInflation(): Promise<string>;
  }
```

**How to get instance of mint client**
```
  const mintClient = decentrClient.mint;
```

### Methods

1. **Get inflation**
```ts
  const inflation = await mintClient.getInflation();
```
Response of `getInflation` method is a string like `0.135`.

## 📜 Operations <a id="decentr-operations" />

**Operations client has the following interface**

```
  class OperationsClient {
    getMinGasPrice(): Promise<Coin>;

    resetAccount(
      request: ResetAccountRequest,
    ): TransactionSigner;
  }
```

**How to get instance of operations client**
```
  const operationsClient = decentrClient.operations;
```

### Methods

1. **Get min gas price**
```ts
  const minGasPrice = await operationsClient.getMinGasPrice();
```
Response of `getMinGasPrice` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3)

2. **Reset account**
```ts
  const message = {
    owner: 'decentrInitiatorAddress',
    address: 'decentrResetAddress',
  };
  const transactionSigner = operationsClient.resetAccount(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Staking <a id="decentr-staking" />

**Staking client has the following interface**
```
  class StakingClient {
    getPool(): Promise<Pool>;

    getValidators(status: BondStatusString): Promise<Validator[]>;

    getValidator(address: Validator['operatorAddress']): Promise<Validator>;

    getDelegations(delegatorAddress: Wallet['address']): Promise<DelegationResponse[]>;

    getDelegation(
      delegatorAddress: Wallet['address'],
      validatorAddress: Validator['operatorAddress'],
    ): Promise<Coin | null>;

    getValidatorDelegations(validatorAddress: Validator['operatorAddress']): Promise<DelegationResponse[]>;

    getUnbondingDelegations(delegatorAddress: Wallet['address']): Promise<UnbondingDelegation[]>;

    getUnbondingDelegation(
      delegatorAddress: Wallet['address'],
      validatorAddress: Validator['operatorAddress'],
    ): Promise<UnbondingDelegation | undefined>;
    
    getValidatorUnbondingDelegations(
      validatorAddress: Validator['operatorAddress'],
    ): Promise<UnbondingDelegation[]>;
    
    getRedelegations(
      delegatorAddress: Wallet['address'],
      sourceValidatorAddress: Validator['operatorAddress'],
      destinationValidatorAddress: Validator['operatorAddress'],
    ): Promise<RedelegationResponse[]>;
    
    getDelegatorValidators(
      delegatorAddress: Wallet['address'],
    ): Promise<Validator[]>;
    
    getStakingParameters(): Promise<Params>;
    
    delegateTokens(
      request: DelegateTokensRequest,
    ): TransactionSigner;
    
    undelegateTokens(
      request: UndelegateTokensRequest,
    ): TransactionSigner;
    
    redelegateTokens(
      request: RedelegateTokensRequest,
    ): TransactionSigner;
  }
```
**How to get instance of staking client**
```
  const stakingClient = decentrClient.staking;
```

### Methods

1. **Get pool**
```ts
  const pool = await stakingClient.getPool();
```
Response of `pool` method is a [Pool](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L292)

2. **Get validators**
```ts
  const validators = await stakingClient.getValidators('BOND_STATUS_BONDED');
```
Response of `getValidators` method is a [Validator](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L117) array.

3. **Get validator**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const validator = await stakingClient.getValidator(validatorAddress);
```
Response of `getDelegatorRewards` method is a [Validator](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L117)

4. **Get delegations**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const delegations = await stakingClient.getDelegations(delegatorAddress);
```
Response of `getDelegatorRewardsFromValidator` method is a [DelegationResponse](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L263) array.

5. **Get delegation**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const delegation = await stakingClient.getDelegation(delegatorAddress, validatorAddress);
```
Response of `getDelegation` method is a [Coin](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/amino/src/coins.ts#L3) array.

6. **Get validator delegations**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const validatorDelegations = await stakingClient.getValidatorDelegations(validatorAddress);
```
Response of `getValidatorDelegations` method is a [DelegationResponse](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L263) array.

7. **Get unbonding delegations**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const unbondingDelegations = await stakingClient.getUnbondingDelegations(delegatorAddress);
```
Response of `getUnbondingDelegations` method is a [UnbondingDelegation](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L197) array.

8. **Get unbonding delegation**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const unbondingDelegation = await stakingClient
    .getUnbondingDelegation(delegatorAddress, validatorAddress);
```
Response of `getUnbondingDelegation` method is a [UnbondingDelegation](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L197)

9. **Get validator unbonding delegations**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const unboindingDelegations = await stakingClient
    .getValidatorUnbondingDelegations(validatorAddress, validatorAddress);
```
Response of `getValidatorUnbondingDelegations` method is a [UnbondingDelegation](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L197) array.

10. **Get redelegations**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const sourceValidatorAddress = 'decentrvaloperSourceValidatorAddress';
  const destinationValidatorAddress = 'decentrvaloperDestinationValidatorAddress';
  const redelegations = await stakingClient.getRedelegations(
    delegatorAddress,
    sourceValidatorAddress,
    destinationValidatorAddress,
  );
```
Response of `getRedelegations` method is a [RedelegationResponse](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L283) array.

11. **Get delegator validators**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validators = await stakingClient.getDelegatorValidators(delegatorAddress);
```
Response of `getDelegatorValidators` method is a [Validator](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L117) array.

12. **Get staking parameters**
```ts
  const parameters = await stakingClient.getStakingParameters();
```
Response of `getStakingParameters` method is a [Params](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L246)

13. **Delegate tokens**
```ts
  const message = {
    delegatorAddress: 'decentrDelegatorAddress',
    validatorAddress: 'decentrvaloperValidatorAddress',
    amount: [
      {
        amount: '100000000',
        denom: 'udec',
      },
    ],
  };
  const transactionSigner = stakingClient.delegateTokens(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

14. **Undelegate tokens**
```ts
  const message = {
    delegatorAddress: 'decentrDelegatorAddress',
    validatorAddress: 'decentrvaloperValidatorAddress',
    amount: {
      amount: '100000000',
      denom: 'udec',
    },
  };
  const transactionSigner = stakingClient.undelegateTokens(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

15. **Redelegate tokens**
```ts
  const message = {
    delegatorAddress: 'decentrDelegatorAddress',
    validatorSrcAddress: 'decentrvaloperSourceValidatorAddress',
    validatorDstAddress: 'decentrvaloperDestinationValidatorAddress',
    amount: {
      amount: '100000000',
      denom: 'udec',
    },
  };
  const transactionSigner = stakingClient.redelegateTokens(message);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Token <a id="decentr-token" />

**Token client has the following interface**

```
  class TokenClient {
    getBalance(walletAddress: Wallet['address']): Promise<string>;
  }
```

**How to get instance of token client**
```
  const tokenClient = decentrClient.token;
```

### Methods

1. **Get PDV balance**
```ts
  const walletAddress = 'decentrWalletAddress';
  const balance = await tokenClient.getBalance(walletAddress);
```
Response of `getBalance` method is a string like `1.001234`.

## 📜 Tx <a id="decentr-tx" />

**Tx client has the following interface**

```
  class TxClient {
    search(query: SearchTxQuery,filter: SearchTxFilter = {}): Promise<DecodedIndexedTx[]>
    
    getByHash(hash: IndexedTx['hash']): Promise<DecodedIndexedTx>;
  }
```

**How to get instance of tx client**
```
  const txClient = decentrClient.tx;
```

### Methods

1. **Search txs**
```ts
  const queryByHeight = { height: 123456 };
  const txsByHeight = await txClient.search(queryByHeight);

  const queryBySentFromOrTo = { sentFromOrTo: 'decentrWalletAddress' };
  const txsBySentFromOrTo = await txClient.search(queryByHeight);

  const queryByTags = { tags: [
      {
        key: 'message.module',
        value: 'staking',
      },
      {
        key: 'message.sender',
        value: 'decentrWalletAddress',
      },
    ],
  };
  const txsByTags = await txClient.search(queryByHeight);
```
Response of `search` method is an [DecodedIndexedTx](https://github.com/Decentr-net/decentr.js/blob/master/src/api/blockchain/cosmos/tx/types.ts#L11) array.

2. **Get by hash**
```ts
  const txHash = 'ABCDEF0123456GHIJKL7890';
  const tx = await txClient.getByHash(txHash);
```
Response of `getByHash` method is an [DecodedIndexedTx](https://github.com/Decentr-net/decentr.js/blob/master/src/api/blockchain/cosmos/tx/types.ts#L11)

# Using Cerberus api <a id="cerberus-api" />

## Cerberus client

**For less text, we define some basic variables here**

```ts
import { CerberusClient } from 'decentr-js';

const CERBERUS_URL = 'https://cerberus.mainnet.decentr.xyz';

const cerberusClient = new CerberusClient(CERBERUS_URL);
```

## 📜 Configuration <a id="cerberus-configuration" />

**Configuration client has the following interface**

```
  class CerberusConfigurationClient {
    getPDVBlacklist(): Promise<PDVBlacklist>;

    getPDVRewards(): Promise<PDVRewards>;
  }
```

**How to get instance of configuration client**
```
  const configurationClient = cerberusClient.configuration;
```

### Methods

1. **Get PDV blacklist**
```ts
  const pDVBlacklist = await configurationClient.getPDVBlacklist();
```
Response of `getPDVBlacklist` method is a [PDVBlacklist](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/configuration/types.ts#L3)

2. **Get PDV rewards configuration**
```ts
  const pDVRewards = await configurationClient.getPDVRewards();
```
Response of `getPDVRewards` method is a [PDVRewards](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/configuration/types.ts#L7)

## 📜 Image <a id="cerberus-image" />

**Image client has the following interface**

```
  class CerberusImageClient {
    save(image: File, privateKey: Wallet['privateKey']): Promise<SaveImageResponse>;
  }
```

**How to get instance of image client**
```
  const imageClient = cerberusClient.image;
```

### Methods

1. **Save image**
```ts
  const image = 'your image file of File interface';
  const privateKey = '1234567890abcdefghijklmno';
  const imageResponse = await imageClient.saveImage(image, privateKey);
```
Response of `saveImage` method is an [SaveImageResponse](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/image/types.ts#L1)

## 📜 PDV <a id="cerberus-pdv" />

**PDV client has the following interface**

```
  class CerberusPDVClient {
    getPDVList(
      walletAddress: Wallet['address'],
      paginationOptions?: PDVListPaginationOptions,
    ): Promise<PDVListItem[]>;
    
    getPDVMeta(pdvAddress: number, walletAddress: Wallet['address']): Promise<PDVMeta>;
    
    getPDVDetails(pdvAddress: number, wallet: Wallet): Promise<PDVDetails>;
    
    sendPDV(pdv: PDV[], privateKey: Wallet['privateKey']): Promise<PDVAddress>;
    
    validate(pdv: PDV[]): Promise<number[]>;
  }
```

**How to get instance of PDV client**
```
  const pDVClient = cerberusClient.pdv;
```

### Methods

1. **Get PDV list**
```ts
  const walletAddress = 'decentrPDVOwnerAddress';
  const pagination = {
    limit: 20,
    from: 12345678, // optional, timestamp of previous PDVListItem
  };
  const pdvList = operationsClient.getPDVList(walletAddress, pagination);
```
Response of `getPDVList` method is an id (timestamp) array like `[1641748368, 1641744563, 164158725]`

2. **Get PDV meta**
```ts
  const walletAddress = 'decentrPDVOwnerAddress';
  const pDVAddress = 1641748368;
  const pDVMeta = await pDVClient.getPDVMeta(pDVAddress, walletAddress);
```
Response of `getPDVMeta` method is a [PDVMeta](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/pdv/types.ts#L91)

3. **Get PDV details**
```ts
  const wallet = { 
    address: 'decentrPDVOwnerAddress',
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  const pDVAddress = 1641748368;
  const pDVDetails = await pDVClient.getPDVDetails(pDVAddress, wallet);
```
Response of `getPDVDetails` method is a [PDVDetails](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/pdv/types.ts#L86)

4. **Send PDV**
```ts
  const PDV = []; // array of your PDV's;
  const privateKey: '1234567890abcdefghijklmno';
  const pDVAddress = await pDVClient.sendPDV(pdv, privateKey);
```
Response of `sendPDV` method is an id (timestamp) of PDV.

5. **Validate PDV**
```ts
  const PDV = []; // array of your PDV's;
  const invalidPDVIndexes = await pDVClient.validate(pdv);
```
Response of `validate` method is an indexes array of invalid PDV.

## 📜 Profile <a id="cerberus-profile" />

**Profile client has the following interface**

```
  class CerberusProfileClient {
    setProfile(
      profile: ProfileUpdate,
      privateKey: Wallet['privateKey'],
    ): Promise<PDVAddress>;

    getProfile(
      walletAddress: Wallet['address'],
      privateKey: Wallet['privateKey'],
   ): Promise<Profile>;
    
    getProfiles(
      walletAddresses: Wallet['address'][],
      privateKey: Wallet['privateKey'],
    ): Promise<Record<Profile['address'], Profile>>;
  }
```

**How to get instance of PDV client**
```
  const profileClient = cerberusClient.profile;
```

### Methods

1. **Set profile**
```ts
  import { Gender } from 'decentr-js';
  const profile = {
    avatar: 'http://avatar.png',
    bio: 'bio',
    birthday: '1991-01-01',
    emails: ['email@email.com'],
    firstName: 'firstName',        // maxlength: 64
    gender: Gender.Male,
    lastName: 'lastName',          // maxlength: 64
  } 
  const privateKey = '1234567890abcdefghijklmno';
  const pDVAddress = await profileClient.setProfile(profile, privateKey);
```
Response of `setProfile` method is an id (timestamp) of PDV.

2. **Get profile**
```ts
  const walletAddress = 'decentrAddress';
  const privateKey = '1234567890abcdefghijklmno';
  // privateKey is an optional param required to get private profile data (birthday, gender etc.)
  const profile = await profileClient.getProfile(walletAddress, privateKey);
```
Response of `getProfile` method is a [Profile](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/profile/types.ts#L4)

3. **Get profiles**
```ts
  const walletAddresses = ['decentrAddress1', 'decentrAddress2'];
  const privateKey = '1234567890abcdefghijklmno';
  // privateKey is an optional param required to get private profile data only for request initiator profile (birthday, gender etc.)
  const profiles = await profileClient.getProfiles(walletAddress, privateKey);
```
Response of `getProfiles` method is an object of type `{ decentrAddress1: profileObj1, decentrAddress2: profileObj2 }`.

## 📜 Rewards <a id="cerberus-rewards" />

**Rewards client has the following interface**

```
  class CerberusRewardsClient {
    getDelta(walletAddress: Wallet['address']): Promise<TokenDelta>;
    
    getPool(): Promise<TokenPool>;
  }
```

**How to get instance of rewards client**
```
  const rewardsClient = cerberusClient.rewards;
```

### Methods

1. **Get delta**
```ts
  const walletAddress = 'decentrWalletAddress';
  const delta = await tokenClient.getDelta(walletAddress);
```
Response of `getDelta` method is an [TokenDelta](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/rewards/types.ts#L7)

2. **Get pool**
```ts
  const pool = await tokenClient.getPool();
```
Response of `getPool` method is an [TokenPool](https://github.com/Decentr-net/decentr.js/blob/master/src/api/cerberus/rewards/types.ts#L1)

# Using Theseus api <a id="theseus-api" />

## Theseus client

**For less text, we define some basic variables here**

```ts
import { TheseusClient } from 'decentr-js';

const THESEUS_URL = 'https://theseus.mainnet.decentr.xyz';

const theseusClient = new TheseusClient(THESEUS_URL);
```

## 📜 DDV <a id="theseus-ddv" />

**DDV client has the following interface**

```
  class TheseusDDVClient {
    getStats(): Promise<DDVStats>;
  }
```

**How to get instance of ddv client**
```
  const ddvClient = theseusClient.ddv;
```

### Methods

1. **Get stats**
```ts
  const stats = await ddvClient.getStats();
```
Response of `getStats` method is a [DDVStats](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/ddv/types.ts#L6)

## 📜 Posts <a id="theseus-posts" />

**Posts client has the following interface**

```
  class TheseusPostsClient {
    getPost(params: Pick<Post, 'owner' | 'uuid'>, requestedBy: Wallet['address']): Promise<PostResponse>;

    getPosts(filterOptions?: PostsListFilterOptions): Promise<PostsListResponse>;
  }
```

**How to get instance of profile client**
```
  const postsClient = theseusClient.posts;
```

### Methods

1. **Get post**
```ts
  const postParams = { 
    owner: 'decentrWalletAddress',
    uuid: 'post-uuid-1234',
  };
  const requestedBy = 'decentrSameOrAnotherWalletAddress';
  const stats = await postsClient.getPost(postParams, requestedBy);
```
Response of `getPost` method is a [PostResponse](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/posts/types.ts#L31)

2. **Get posts**
```ts
  const filter = {
    category: PostCategory.CATEGORY_WORLD_NEWS,
    requestedBy: 'decentrSameOrAnotherWalletAddress',
  }; // optional
  const balance = await postsClient.getPosts(filter);
```
Interface of `filter` object described here [PostsListFilterOptions](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/posts/types.ts#L15)

Response of `getPosts` method is an [PostsListResponse](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/posts/types.ts#L40)

## 📜 Profile <a id="theseus-profile" />

**Profile client has the following interface**

```
  class TheseusProfileClient {
    getProfileStats(walletAddress: Wallet['address']): Promise<ProfileStatistics>;

    getAdvDdvStats(): Promise<AdvDdvStatistics>;
  }
```

**How to get instance of profile client**
```
  const profileClient = theseusClient.profile;
```

### Methods

1. **Get profile stats**
```ts
  const walletAddress = 'decentrAddress';
  const stats = await profileClient.getProfileStats(walletAddress);
```
Response of `getProfileStats` method is a [ProfileStatistics](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/profile/types.ts#L11)

2. **Get ADV/DDV stats**
```ts
  const walletAddress = 'decentrWalletAddress';
  const balance = await profileClient.getAdvDdvStats();
```
Response of `getAdvDdvStats` method is an [AdvDdvStatistics](https://github.com/Decentr-net/decentr.js/blob/master/src/api/theseus/profile/types.ts#L1)

# Using Vulcan api <a id="vulcan-api" />

## Vulcan client

**For less text, we define some basic variables here**

```ts
import { VulcanClient } from 'decentr-js';

const VULCAN_URL = 'https://vulcan.mainnet.decentr.xyz';

const vulcanClient = new VulcanClient(VULCAN_URL);
```

## 📜 Referral <a id="vulcan-referral" />

**Referral client has the following interface**

```
  class VulcanReferralClient {
    getCode(walletAddress: Wallet['address']): Promise<string>;

    getConfig(): Promise<ReferralConfig>;
    
    getStats(walletAddress: Wallet['address']): Promise<ReferralTimeStats>;
    
    trackInstall(walletAddress: Wallet['address']): Promise<void>;
  }
```

**How to get instance of referral client**
```
  const referralClient = vulcanClient.referral;
```

### Methods

1. **Get code**
```ts
  const walletAddress = 'decentrAddress';
  const code = await referralClient.getCode(walletAddress);
```
Response of `getCode` method is a string code like `abc123`

2. **Get configuration**
```ts
  const config = await referralClient.getConfig();
```
Response of `getConfig` method is an [ReferralConfig](https://github.com/Decentr-net/decentr.js/blob/master/src/api/vulcan/referral/types.ts#L14)

3. **Get statistics**
```ts
  const walletAddress = 'decentrAddress';
  const stats = await referralClient.getStats();
```
Response of `getStats` method is an [ReferralTimeStats](https://github.com/Decentr-net/decentr.js/blob/master/src/api/vulcan/referral/types.ts#L28)

4. **Track install**
```ts
  const walletAddress = 'decentrAddress';
  await referralClient.trackInstall(walletAddress);
```

## 📜 Registration <a id="vulcan-registration" />

**Registration client has the following interface**

```
  class VulcanReferralClient {
    register(walletAddress: Wallet['address'], email: string): Promise<void>;

    confirm(email: string, code: string): Promise<void>;
    
    hesoyam(walletAddress: Wallet['address']): Promise<void>;
    
    getStats(): Promise<RegistrationStats>;
  }
```

**How to get instance of registration client**
```
  const registrationClient = vulcanClient.registration;
```

### Methods

1. **Register user**
```ts
  const walletAddress = 'decentrAddress';
  const email = 'email@email.com';
  await registrationClient.register(walletAddress, email);
```

2. **Confirm registration**
```ts
  const email = 'email@email.com';
  const code = 'a1b2c3';
  await registrationClient.confirm(email, code);
```

3. **Hesoyam**
```ts
  const walletAddress = 'decentrAddress';
  await registrationClient.hesoyam(walletAddress);
```

4. **Get stats**
```ts
  await registrationClient.getStats();
```
Response of `getStats` method is an [RegistrationStats](https://github.com/Decentr-net/decentr.js/blob/master/src/api/vulcan/registration/types.ts#L6)


## 📜 Loan <a id="vulcan-loan" />

**Loan client has the following interface**

```
  class VulcanLoanClient {
    requestLoan(loan: Loan): Promise<void>;
  }
```

**How to get instance of loan client**
```
  const loanClient = vulcanClient.loan;
```

### Methods

1. **Request loan**
```ts
  const loan = {
    firstName: "John",
    lastName: "Doe", *(Optional)*
    pdvRate: 1.12345678,
    walletAddress: "decentrAddress"
  }
  await loanClient.requestLoan(loan);
```

# 🥂 License <a id="license" />

[MIT](./LICENSE.md) as always
