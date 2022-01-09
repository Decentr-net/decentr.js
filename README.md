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
   1. [Auth](#auth)
   2. [Bank](#bank)
   3. [Blocks](#blocks)
   4. [Community](#community)
   5. [Distribution](#distribution)
   6. [Image](#image)
   7. [Mint](#mint)
   8. [Node](#node)
   9. [Operations](#operations)
   10. [PDV](#pdv)
   11. [Profile](#profile)
   12. [Staking](#staking)
   13. [Token](#token)
   14. [Tx](#tx)
4. [License](#license)

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

const CERBERUS_URL = 'https://cerberus.testnet.decentr.xyz'; // pdv server
const THESEUS_URL = 'https://theseus.testnet.decentr.xyz'; // offchain server

const decentrClient = new Decentr(NODE_URL, {
  cerberus: CERBERUS_URL,
  theseus: THESEUS_URL,
});
```

## 📜 Auth <a id="auth" />

**Auth client has the following interface**

```
  class DecentrAuthClient {
    getAccount(walletAddress: Wallet['address']): Promise<Account | null>;
  }
```

**How to get instance of auth client**
```
  const authClient = await decentrClient.auth();
  
  OR
  
  import { DecentrAuthClient } from 'decentr-js'
  const authClient = await DecentrAuthClient.create(NODE_URL);
```

### Methods

1. **Get account**
```ts
  const walletAddress = 'decentr1234567890abcdefghijklmno';
  const account = await authClient.getAccount(walletAddress);
```
Response of `getAccount` method is an [Account](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/stargate/src/accounts.ts#L15) or `null` if account is not exist.

## 📜 Bank <a id="bank" />

**Bank client has the following interface**

```
  class DecentrBankClient {
    getBalance(walletAddress: Wallet['address']): Promise<Coin[]>;

    getDenomBalance(walletAddress: Wallet['address'], denom: string): Promise<Coin>;

    getSupply(): Promise<Coin[]>;
    
    getDenomSupply(denom: string): Promise<Coin>;
    
    public sendTokens(
      request: MsgSend,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
  }
```

**How to get instance of bank client**
```
  const bankClient = await decentrClient.bank();
  
  OR
  
  import { DecentrBankClient } from 'decentr-js'
  const bankClient = await DecentrBankClient.create(NODE_URL);
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
  const privateKey = '1234567890abcdefghijklmno';
  const memo = 'My gift to decentr user';
  const transactionSigner = bankClient.sendTokens(message, privateKey, { memo });
```

<a id="transactionSigner"></a>
`transactionSigner` is an interface that allows `simulate` or `broadcast` transaction

```ts
  const gas = await transactionSigner.simulate(); // estimated gas that will be spent on broadcasting
```

```ts
  const transaction = await transactionSigner.signAndBroadcast();
```
Response of `signAndBroadcast` method is a [DeliverTxResponse](https://github.com/cosmos/cosmjs/blob/57a56cfa6ae8c06f4c28949a1028dc764816bbe8/packages/stargate/src/stargateclient.ts#L99).

## 📜 Blocks <a id="blocks" />

**Blocks client has the following interface**
```
  class DecentrBlocksClient {
    getBlock(height?: BlockHeader['height']): Promise<DecodedBlock>;
  }
```
**How to get instance of bank client**
```
  const blocksClient = await decentrClient.blocks();
  
  OR
  
  import { DecentrBlocksClient } from 'decentr-js'
  const blocksClient = await DecentrBlocksClient.create(NODE_URL);
```

### Methods

1. **Get block**
```ts
  const height = 12345;
  const block = await blocksClient.getBlock(decentr1234567890abcdefghijklmno)
```
*Notice*: `height` is an optional param, method will return the latest block if `height` is not supplied.

Response of `getBlock` method is a [DecodedBlock](https://github.com/Decentr-net/decentr.js/blob/master/src/api/blocks/types.ts#L5).

## 📜 Community <a id="community" />

**Community client has the following interface**
```
  class DecentrCommunityClient {
    getModeratorAddresses(): Promise<Wallet['address'][]>;

    getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]>;

    createPost(
      request: MsgCreatePost['post'],
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;

    deletePost(
      request: MsgDeletePost,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;

    setLike(
      request: MsgSetLike['like'],
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;

    follow(
      request: MsgFollow,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;

    unfollow(
      request: MsgUnfollow,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
  }
```
**How to get instance of community client**
```
  const communityClient = await decentrClient.community();
  
  OR
  
  import { DecentrCommunityClient } from 'decentr-js'
  const communityClient = await DecentrCommunityClient.create(NODE_URL);
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = communityClient.createPost(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

4. **Delete post**
```ts
  const message = {
    postOwner: 'decentrAuthorAddress',
    postUuid: '12345-abcde-67890-fghijk',
    owner: 'decentrInitiatorAddress',
  };
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = communityClient.deletePost(message, privateKey);
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = communityClient.deletePost(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

6. **Follow**
```ts
  import { LikeWeight } from 'decentr-js'
  const message = {
    owner: 'decentrFollowerAddress',
    whom: 'decentrWhomToFollowAddress',
  };
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = communityClient.deletePost(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

7. **Unfollow**
```ts
  import { LikeWeight } from 'decentr-js'
  const message = {
    owner: 'decentrFollowerAddress',
    whom: 'decentrWhomToUnfollowAddress',
  };
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = communityClient.deletePost(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Distribution <a id="distribution" />

**Distribution client has the following interface**
```
  class DecentrDistributionClient {
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
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
    
    withdrawDelegatorRewards(
      request: WithdrawDelegatorRewardRequest,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
    
    withdrawValidatorRewards(
      request: WithdrawValidatorCommissionRequest,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
  }
```
**How to get instance of distribution client**
```
  const distributionClient = await decentrClient.distribution();
  
  OR
  
  import { DecentrDistributionClient } from 'decentr-js'
  const distributionClient = await DecentrDistributionClient.create(NODE_URL);
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = distributionClient.setWithdrawAddress(message, privateKey);
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = distributionClient.withdrawDelegatorRewards(messages, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

10. **Withdraw validator rewards**
```ts
  const message = {
     validatorAddress: 'decentrvaloperValidatorAddress',
  };
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = distributionClient.withdrawValidatorRewards(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Image <a id="image" />

**Image client has the following interface**

```
  class DecentrImageClient {
    saveImage(image: File, keyPair: KeyPair): Promise<SaveImageResponse>;
  }
```

**How to get instance of image client**
```
  const imageClient = decentrClient.image;
  
  OR
  
  import { DecentrImageClient } from 'decentr-js'
  const imageClient = new DecentrImageClient(CERBERUS_URL);
```

### Methods

1. **Save image**
```ts
  const image = 'your image file of File interface';
  const keyPair = {
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  const imageResponse = await imageClient.saveImage(image, keyPair);
```
Response of `saveImage` method is an [SaveImageResponse](https://github.com/Decentr-net/decentr.js/blob/master/src/api/image/types.ts#L1)

## 📜 Mint <a id="mint" />

**Mint client has the following interface**

```
  class DecentrMintClient {
    getInflation(): Promise<string>;
  }
```

**How to get instance of mint client**
```
  const mintClient = await decentrClient.mint();
  
  OR
  
  import { DecentrMintClient } from 'decentr-js'
  const mintClient = await DecentrMintClient.create(NODE_URL);
```

### Methods

1. **Get inflation**
```ts
  const inflation = await mintClient.getInflation();
```
Response of `getInflation` method is a string like `0.135`.

## 📜 Node <a id="node" />

**Node client has the following interface**

```
  class DecentrNodeClient {
    getNodeInfo(): Promise<StatusResponse>;
  }
```

**How to get instance of node client**
```
  const nodeClient = await decentrClient.node();
  
  OR
  
  import { DecentrNodeClient } from 'decentr-js'
  const nodeClient = await DecentrNodeClient.create(NODE_URL);
```

### Methods

1. **Get node info**
```ts
  const nodeInfo = await nodeClient.getNodeInfo();
```
Response of `getNodeInfo` method is a [StatusResponse](https://github.com/cosmos/cosmjs/blob/e7b107a0d0419fbd5280645a70153548235617fa/packages/tendermint-rpc/src/tendermint34/responses.ts#L127).

## 📜 Operations <a id="operations" />

**Operations client has the following interface**

```
  class DecentrOperationsClient {
    getMinGasPrice(): Promise<Coin>;

    resetAccount(
      request: ResetAccountRequest,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
  }
```

**How to get instance of operations client**
```
  const operationsClient = await decentrClient.operations();
  
  OR
  
  import { DecentrOperationsClient } from 'decentr-js'
  const operationsClient = await DecentrOperationsClient.create(NODE_URL);
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = operationsClient.resetAccount(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 PDV <a id="pdv" />

**PDV client has the following interface**

```
  class DecentrPDVClient {
    getPDVBlacklist(): Promise<PDVBlacklist>;

    getPDVList(
      walletAddress: Wallet['address'],
      paginationOptions?: PDVListPaginationOptions,
    ): Promise<PDVListItem[]>;
    
    getPDVMeta(pdvAddress: number, walletAddress: Wallet['address']): Promise<PDVMeta>;
    
    getPDVDetails(pdvAddress: number, wallet: Wallet): Promise<PDVDetails>;
    
    getRewards(): Promise<PDVRewards>;
    
    sendPDV(pdv: PDV[], keyPair: KeyPair): Promise<PDVAddress>
  }
```

**How to get instance of PDV client**
```
  const pDVClient = decentrClient.pdv;
  
  OR
  
  import { DecentrPDVClient } from 'decentr-js'
  const pDVClient = new DecentrPDVClient(CERBERUS_URL);
```

### Methods

1. **Get PDV blacklist**
```ts
  const pDVBlacklist = await pDVClient.getPDVBlacklist();
```
Response of `getPDVBlacklist` method is a [PDVBlacklist](https://github.com/Decentr-net/decentr.js/blob/master/src/api/pdv/types.ts#L1)

2. **Get PDV list**
```ts
  const walletAddress = 'decentrPDVOwnerAddress';
  const pagination = {
    limit: 20,
    from: 12345678, // optional, timestamp of previous PDVListItem
  };
  const privateKey = '1234567890abcdefghijklmno';
  const pdvList = operationsClient.getPDVList(walletAddress, pagination);
```
Response of `getPDVList` method is an id (timestamp) array like `[1641748368, 1641744563, 164158725]`

3. **Get PDV meta**
```ts
  const walletAddress = 'decentrPDVOwnerAddress';
  const pDVAddress = 1641748368;
  const pDVMeta = await pDVClient.getPDVMeta(pDVAddress, walletAddress);
```
Response of `getPDVMeta` method is a [PDVMeta](https://github.com/Decentr-net/decentr.js/blob/master/src/api/pdv/types.ts#L94)

4. **Get PDV details**
```ts
  const wallet = { 
    address: 'decentrPDVOwnerAddress',
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  const pDVAddress = 1641748368;
  const pDVDetails = await pDVClient.getPDVDetails(pDVAddress, wallet);
```
Response of `getPDVDetails` method is a [PDVMeta](https://github.com/Decentr-net/decentr.js/blob/master/src/api/pdv/types.ts#L89)

5. **Get rewards configuration**
```ts
  const rewards = await pDVClient.getRewards();
```
Response of `getRewards` method is a [PDVMeta](https://github.com/Decentr-net/decentr.js/blob/master/src/api/pdv/types.ts#L99)

6. **Send PDV**
```ts
  const PDV = []; // array of your PDV's;
  const keyPair = {
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  const pDVAddress = await pDVClient.sendPDV(pdv, keyPair);
```
Response of `sendPDV` method is an id (timestamp) of PDV.

## 📜 Profile <a id="profile" />

**Profile client has the following interface**

```
  class DecentrProfileClient {
    setProfile(profile: ProfileUpdate, keyPair: KeyPair): Promise<PDVAddress>;

    getProfile(walletAddress: Wallet['address'], keys?: KeyPair): Promise<Profile>;
    
    getProfiles(
      walletAddresses: Wallet['address'][],
      keys?: KeyPair,
    ): Promise<Record<Profile['address'], Profile>>;
    
    getStats(walletAddress: Wallet['address']): Promise<ProfileStatistics>;
  }
```

**How to get instance of PDV client**
```
  const profileClient = decentrClient.profile;
  
  OR
  
  import { DecentrProfileClient } from 'decentr-js'
  const profileClient = new DecentrProfileClient(CERBERUS_URL, THESEUS_URL);
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
  const keyPair = {
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  const pDVAddress = await profileClient.setProfile(profile, keyPair);
```
Response of `sendPDV` method is an id (timestamp) of PDV.

2. **Get profile**
```ts
  const walletAddress = 'decentrAddress';
  const keyPair = {
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  // keyPair is an optional param required to get private profile data (birthday, gender etc.)
  const profile = await profileClient.getProfile(walletAddress, keyPair);
```
Response of `getProfile` method is a [Profile](https://github.com/Decentr-net/decentr.js/blob/master/src/api/profile/types.ts#L4)

3. **Get profiles**
```ts
  const walletAddresses = ['decentrAddress1', 'decentrAddress2'];
  const keyPair = {
    privateKey: '1234567890abcdefghijklmno',
    publicKey: 'abcdefghijklmno1234567890',
  };
  // keyPair is an optional param required to get private profile data only for request initiator's profile (birthday, gender etc.)
  const profiles = await profileClient.getProfiles(walletAddress, keyPair);
```
Response of `getProfile` method is an object of type `{ decentrAddress1: profileObj1, decentrAddress2: profileObj2 }`.

4. **Get profile stats**
```ts
  const walletAddress = 'decentrAddress';
  const stats = await pDVClient.getStats(walletAddress);
```
Response of `getStats` method is a [ProfileStatistics](https://github.com/Decentr-net/decentr.js/blob/master/src/api/profile/types.ts#L15)

## 📜 Staking <a id="staking" />

**Staking client has the following interface**
```
  class DecentrStakingClient {
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
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
    
    undelegateTokens(
      request: UndelegateTokensRequest,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
    
    redelegateTokens(
      request: RedelegateTokensRequest,
      privateKey: Wallet['privateKey'],
      options?: {
        memo?: string,
      },
    ): TransactionSigner;
  }
```
**How to get instance of staking client**
```
  const stakingClient = await decentrClient.staking();
  
  OR
  
  import { DecentrStakingClient } from 'decentr-js'
  const stakingClient = await DecentrStakingClient.create(NODE_URL);
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

5. **Get unbonding delegation**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const unbondingDelegation = await stakingClient
    .getUnbondingDelegation(delegatorAddress, validatorAddress);
```
Response of `getUnbondingDelegation` method is a [UnbondingDelegation](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L197)

6. **Get validator unbonding delegations**
```ts
  const validatorAddress = 'decentrvaloperValidatorAddress';
  const unboindingDelegations = await stakingClient
    .getValidatorUnbondingDelegations(validatorAddress, validatorAddress);
```
Response of `getValidatorUnbondingDelegations` method is a [UnbondingDelegation](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L197) array.

7. **Get redelegations**
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

8. **Get delegator validators**
```ts
  const delegatorAddress = 'decentrDelegatorAddress';
  const validators = await stakingClient.getDelegatorValidators(delegatorAddress);
```
Response of `getDelegatorValidators` method is a [Validator](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L117) array.

8. **Get staking parameters**
```ts
  const parameters = await stakingClient.getStakingParameters();
```
Response of `getStakingParameters` method is a [Params](https://github.com/confio/cosmjs-types/blob/e3e0c4ba52d38af45522f5705c24eb734494b9a4/src/cosmos/staking/v1beta1/staking.ts#L246)

9. **Delegate tokens**
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = stakingClient.delegateTokens(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

9. **Undelegate tokens**
```ts
  const message = {
    delegatorAddress: 'decentrDelegatorAddress',
    validatorAddress: 'decentrvaloperValidatorAddress',
    amount: {
      amount: '100000000',
      denom: 'udec',
    },
  };
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = stakingClient.undelegateTokens(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

9. **Redelegate tokens**
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
  const privateKey = '1234567890abcdefghijklmno';
  const transactionSigner = stakingClient.redelegateTokens(message, privateKey);
```
*Notice*: more about `transactionSigner` you can read [here](#transactionSigner)

## 📜 Token <a id="token" />

**Token client has the following interface**

```
  class DecentrTokenClient {
    getBalance(walletAddress: Wallet['address']): Promise<string>;
    
    getAdvDdvStats(): Promise<AdvDdvStatistics>;
    
    getDelta(walletAddress: Wallet['address']): Promise<TokenDelta>;
    
    getPool(): Promise<TokenPool>;
  }
```

**How to get instance of token client**
```
  const tokenClient = await decentrClient.token();
  
  OR
  
  import { DecentrTokenClient } from 'decentr-js';
  const tokenClient = await DecentrTokenClient.create(NODE_URL, CERBERUS_URL, THESEUS_URL);
```

### Methods

1. **Get PDV balance**
```ts
  const walletAddress = 'decentrWalletAddress';
  const balance = await tokenClient.getBalance(walletAddress);
```
Response of `getBalance` method is a string like `1.001234`.

2. **Get ADV/DDV stats**
```ts
  const walletAddress = 'decentrWalletAddress';
  const balance = await tokenClient.getAdvDdvStats();
```
Response of `getAdvDdvStats` method is an [AdvDdvStatistics](https://github.com/Decentr-net/decentr.js/blob/009e3ea9ceddf63426df262d1686bb5fd833b999/src/api/token/types.ts#L1)

3. **Get delta**
```ts
  const walletAddress = 'decentrWalletAddress';
  const delta = await tokenClient.getDelta(walletAddress);
```
Response of `getDelta` method is an [TokenDelta](https://github.com/Decentr-net/decentr.js/blob/009e3ea9ceddf63426df262d1686bb5fd833b999/src/api/token/types.ts#L12)

4. **Get pool**
```ts
  const pool = await tokenClient.getPool();
```
Response of `getDelta` method is an [TokenPool](https://github.com/Decentr-net/decentr.js/blob/009e3ea9ceddf63426df262d1686bb5fd833b999/src/api/token/types.ts#L6)

## 📜 Tx <a id="tx" />

**Tx client has the following interface**

```
  class DecentrTxClient {
    search(query: SearchTxQuery,filter: SearchTxFilter = {}): Promise<DecodedIndexedTx[]>
    
    getByHash(hash: IndexedTx['hash']): Promise<DecodedIndexedTx>;
  }
```

**How to get instance of tx client**
```
  const txClient = await decentrClient.tx();
  
  OR
  
  import { DecentrTxClient } from 'decentr-js';
  const txClient = await DecentrTxClient.create(NODE_URL);
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
Response of `search` method is an [DecodedIndexedTx](https://github.com/Decentr-net/decentr.js/blob/009e3ea9ceddf63426df262d1686bb5fd833b999/src/api/tx/types.ts#L10) array.

2. **Get by hash**
```ts
  const txHash = 'ABCDEF0123456GHIJKL7890';
  const tx = await txClient.getByHash(txHash);
```
Response of `getByHash` method is an [DecodedIndexedTx](https://github.com/Decentr-net/decentr.js/blob/009e3ea9ceddf63426df262d1686bb5fd833b999/src/api/tx/types.ts#L10)

## 🥂 License <a id="license" />

[MIT](./LICENSE.md) as always
