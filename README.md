# decentr-js

> decentr-js

[![NPM version](https://img.shields.io/npm/v/decentr-js.svg)](https://www.npmjs.com/package/decentr-js)
![Downloads](https://img.shields.io/npm/dm/decentr-js.svg)

---

## ✨ Features

- Mnemonic generation (24 words combination)
- Wallet generation based on mnemonic (address, private key, public key)
- Transactions with optional broadcasting

## 🔧 Installation

```sh
npm install decentr-js
```

## 🎬 Getting started

## Mnemonic

**Generate mnemonic phrase (24 words)**

```ts
import { generateMnemonic } from 'decentr-js';
const mnemonic = generateMnemonic();
/*
    fantasy scatter misery seminar resist file unique coral ordinary wash shoulder demise bubble calm sail protect divide write lend card sudden rally depart park
*/
```

## Wallet

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

# Using Decentr api

##! Notice

**All methods described in Decentr class below are available as standalone functions, but require extra parameters:**

```ts
const restUrl = 'http://rest.testnet.decentr.xyz';
const chainId = 'testnet';
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

AND

import { Decentr } from 'decentr-js';
const decentr = new DecentrConnect(restUrl, chainId);

decentr.profile.getAccount(walletAddress)
  .then((account) => ...)

OR

import { getAccount } from 'decentr-js';

getAccount(restUrl, chainId, walletAddress)
  .then((account) => ...)
```

**Some methods of Decentr class provide optional broadcasting, which is also available as standalone function**

```ts
const restUrl = 'http://rest.testnet.decentr.xyz';
const chainId = 'testnet';
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
const post = {
  category: PostCategory.Sports,
  text: 'Some text',
  title: 'Title',
  previewImage: '',
};

AND

import { Decentr } from 'decentr-js';

const decentr = new Decentr(restUrl, chainId);

decentr.community.createPost(
  walletAddress,
  post,
  {
    broadcast: true,
    privateKey,
  },
).then(...);

OR

import { Decentr, broadcast } from 'decentr-js';

const decentr = new Decentr(restUrl, chainId);

const stdTxResponse = await decentr.community.createPost(walletAddress, post);

const account = await decentr.profile.getAccount(walletAddress);
await broadcast(
  restUrl,
  chainId,
  stdTxResponse.value,
  {
    ...account,
    privateKey,
  },
);

```

## Decentr connector class

**For less text, we define some basic variables here**

```ts
import { Decentr } from 'decentr-js';

const REST_URL = 'http://rest.testnet.decentr.xyz';
const CHAIN_ID = 'testnet';

const decentr = new Decentr(REST_URL, CHAIN_ID);
```

## 📜 Node

**Get node info**
```ts

decentr.node.getNodeInfo().then(console.log);

/* 
CONSOLE OUTPUT:

{
  application_version: {
    build_deps: [
      "gopkg.in/yaml.v2@v2.3.0",
      ...
    ],
    build_tags: ""
    client_name: "decentrcli"
    commit: "0c2ff258f20269ab6538bf7c6771fbfac249308f"
    go: "go version go1.14.8 linux/amd64"
    name: "decentr"
    server_name: "decentrd"
    version: "1.1.0"
  },
  node_info: {
    channels: "4020212223303800",
    id: "8d044c9353d01fd6e1dff552b7804b6c8b3e961d",
    listen_addr: "tcp://0.0.0.0:26656",
    moniker: "TestNode",
    network: "testnet",
    other: {
      rpc_address: "tcp://0.0.0.0:26657",
      tx_index: "on"
    },
    protocol_version: {
      app: "0",
      block: "10",
      p2p: "7"
    },
    version: "0.33.9"
  }
}
*/
```

## 📜 Profile

**Get account**
>Note: returns `undefined` instead of empty fields if account doesn't exist 

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.profile.getAccount(walletAddress).then(console.log);

/* 
CONSOLE OUTPUT:

{
  address: "decentr1jejdpqt3xx3vu4h335ml8qmdddhv0nefhxxkdr",
  coins: [
    {
      denom: "udec",
      amount: "790000"
    }
  ],
  public_key: {
    type: "tendermint/PubKeySecp256k1"
    value: "A2Y+oEbooAQumYeb9r7jbediO1PMITBnBDiPA5K8ClHh",
  }
  account_number: "11",
  sequence: "42"
}
*/
```

**Set profile**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz'
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
const publicKey = '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6';

const profile = {
  avatar: 'http://avatar.png',
  bio: 'My bio',
  birthday: '1991-01-01',
  emails: ['email@email.com'],
  firstName: 'Firstname',
  gender: Gender.Male,
  lastName: 'Lastname',
};

await decentr.profile.setProfile(
  cerberusUrl,
  profile,
  {
    privateKey,
    publicKey,
  },
);
```

**Get profiles**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz'

const walletAddresses = ['decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5'];
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
const publicKey = '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6';

decentr.profile.getProfiles(cerberusUrl, walletAddresses, { privateKey, publicKey })
  .then(console.log);

/*
CONSOLE OUTPUT:
[
  decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5: {
    avatar: 'http://avatar.png',
    bio: 'My bio',
    birthday: '1991-01-01',
    // you will get 'emails' property if keyPair u provide belongs to this walletAddress
    emails: ['email@email.com'],
    firstName: 'Firstname',
    gender: Gender.Male,
    lastName: 'Lastname',
  }
]
*/
```

**Get profiles**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz'

const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
const publicKey = '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6';

decentr.profile.getProfile(cerberusUrl, walletAddress, { privateKey, publicKey })
  .then(console.log);

/*
CONSOLE OUTPUT:
{
  avatar: 'http://avatar.png',
  bio: 'My bio',
  birthday: '1991-01-01',
  // you will get 'emails' property if keyPair u provide belongs to this walletAddress
  emails: ['email@email.com'],
  firstName: 'Firstname',
  gender: Gender.Male,
  lastName: 'Lastname',
}
*/
```

## 📜 PDV (Personal Data Value)

**Get token balance**

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.pdv.getTokenBalance(walletAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

2e-7
*/
```

**Send PDV data**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';

const pdv = [{
  domain: 'decentr.net',
  path: '/',
  data: [
    {
      type: 'cookie',
      name: 'my test cookie',
      value: 'some test value',
      domain: '*',
      host_only: true,
      path: '*',
      secure: true,
      same_site: 'None',
      expiration_date: 1861920000
    },
  ],
}];

const wallet: Wallet = {
  address: 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

await decentr.pdv.sendPDV(pdv, wallet, {
  broadcast: true,
});
```

**Get PDV list**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';

const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

const paginationParams = { // Optional
  from: 1609255398, // Unix timestamp of previous pdv item, optional
  limit: 20,
}

decentr.pdv.getPDVlist(cerberusUrl, walletAddress, paginationParams)
  .then(console.log);

/*
CONSOLE OUTPUT:

[
  1609255398,    // id = timestamp
  1609212345,
[
*/
```

**Get PDV details**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';

const pDVaddress = '1622203271';

const wallet: Wallet = {
  address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

decentr.pdv.getPDVDetails(cerberusUrl, PDVaddress, wallet)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  version: 'v1',
  pdv: [
    {
      type: 'cookie',
      name: 'my test cookie',
      value: 'some test value',
      domain: '*',
      hostOnly: true,
      path: '*',
      secure: true,
      sameSite: 'None',
      expirationDate: 1861920000
    },
  ]
}
*/
```

**Get PDV meta**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';
const pdvAddress: number = 1612457008;
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.pdv.getPDVMeta(cerberusUrl, pdvAddress, walletAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "object_types": {
    "cookie": 3600,   // [PDVType]:[reward]
  },
  "reward": 7600
}
*/
```

**Get rewards per PDV**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';

decentr.pdv.getRewards(cerberusUrl)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "advertiserId":1,
  "cookie":1,
  "location":1,
  "profile":1,
  "searchHistory":1,
}
*/
```

## 📜 Posts

**Get moderator accounts addresses**

```ts
decentr.community.getModeratorAddresses().then(console.log);

/*
CONSOLE OUTPUT:

[
  "decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5",
]
*/
```

**Create post**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const privateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const post = {
  category: PostCategory.WorldNews,
  previewImage: 'image source',
  title: 'Post title',
  text: 'Post text',
}

decentr.community.createPost(walletAddress, post,   {
  broadcast: true,
  privateKey,
});
```

**Delete post**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const privateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const authorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const postId = 'cf4699e5-3411-11eb-8f45-0242ac11000b'

decentr.community.deletePost(walletAddress, {
  author: authorWalletAddress,
  postId,
}, {
  broadcast: true,
  privateKey,
});
```

**Like post**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const privateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const authorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const postId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';

const likeWeight = LikeWeight.Down  (LikeWeight.Up, LikeWeight.Zero, LikeWeight.Down)

decentr.community.likePost(
  walletAddress,
  {
    author: authorWalletAddress,
    postId,
  },
  likeWeight,
  {
    broadcast: true,
    privateKey,
  },
);
```

**Follow**

```ts
const yourWalletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const yourPrivateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const followTargetWalletAddress = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

decentr.community.follow(
  yourWalletAddress,
  followTargetWalletAddress,
  {
    broadcast: true,
    privateKey: yourPrivateKey,
  },
);
```

**Unfollow**

```ts
const yourWalletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const yourPrivateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const unfollowTargetWalletAddress = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

decentr.community.unfollow(
  yourWalletAddress,
  unfollowTargetWalletAddress,
  {
    broadcast: true,
    privateKey: yourPrivateKey,
  },
);
```

**Get followees**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';

decentr.community.getFollowees(
  walletAddress,
).then(console.log);

/*
CONSOLE OUTPUT:

['decentr1lxhvzgpetd5tmdmd2g9arkun80m0nkvhckqvhc']
*/
```

## 🏦 Bank

**Get balances**

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.bank.getBankBalances(walletAddress).then(console.log);

/* 
CONSOLE OUTPUT:

[{
  "denom": "udec",
  "amount": "999955"
}]
*/
```

**Send coin**

```ts
const wallet: Wallet = {
  address:    'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5',
  privateKey: 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
};

const walletAddressTo = "decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu";
const amount = "15";
const comment = 'my test transfer';

decentr.bank.sendCoin(
  {
    from_address: wallet.address,
    to_address: walletAddressTo,
    amount,
    comment,
  },
  {
    broadcast: true,
    privateKey: wallet.privateKey,
  },
).then(console.log);

/*
CONSOLE OUTPUT:

{
  "from_address": "decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5",
  "to_address": "decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu",
  "amount": [
    {
      "denom": "udec",
      "amount": "15"
    }
  ]
}
*/
```

## 📜 Staking

**Get validators**

```ts
import { ValidatorStatus } from './types'

const filterParams = {    // OPTIONAL, will return Bonded by default
  status: ValidatorStatus.Unbonded,
}

decentr.staking.getValidators(filterParams)
  .then(console.log);

/*
CONSOLE OUTPUT:

[
  {
    operator_address: 'decentrvaloper1yw8degnl8e2h045rrewnqd2a37k5tkntg6wdcc',
    consensus_pubkey: 'decentrvalconspub1zcjduepqx7sjquzlf0nwcv85f94sd98xmvhetv8mrk4uxngumg6vwyvfmq4q73gt36',
    jailed: false,
    status: 2,
    tokens: '100000000000000',
    delegator_shares: '100000000000000.000000000000000000',
    description: {
      moniker: 'poseidon',
      identity: '',
      website: '',
      security_contact: '',
      details: ''
    },
    unbonding_height: '0',
    unbonding_time: '1970-01-01T00:00:00Z',
    commission: {
      commission_rates: {
        rate: '0.100000000000000000',
        max_rate: '0.200000000000000000',
        max_change_rate: '0.010000000000000000'
      },
      update_time: '2020-12-23T19:04:43.316496Z'
    },
    min_self_delegation: '1'
  }
]
*/
```

**Get validator**

```ts

const validatorAddress = 'decentrvaloper1yw8degnl8e2h045rrewnqd2a37k5tkntg6wdcc';

decentr.staking.getValidator(validatorAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  operator_address: 'decentrvaloper1yw8degnl8e2h045rrewnqd2a37k5tkntg6wdcc',
  consensus_pubkey: 'decentrvalconspub1zcjduepqx7sjquzlf0nwcv85f94sd98xmvhetv8mrk4uxngumg6vwyvfmq4q73gt36',
  jailed: false,
  status: 2,
  tokens: '100000000000000',
  delegator_shares: '100000000000000.000000000000000000',
  description: {
    moniker: 'poseidon',
    identity: '',
    website: '',
    security_contact: '',
    details: ''
  },
  unbonding_height: '0',
  unbonding_time: '1970-01-01T00:00:00Z',
  commission: {
    commission_rates: {
      rate: '0.100000000000000000',
      max_rate: '0.200000000000000000',
      max_change_rate: '0.010000000000000000'
    },
    update_time: '2020-12-23T19:04:43.316496Z'
  },
  min_self_delegation: '1'
}
*/
```

**Get pool**

```ts

decentr.staking.getPool()
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "not_bonded_tokens": "97029900000000",
  "bonded_tokens": "398010000000000"
}
*/
```

## 🔲 Blocks

**Get latest block**

```ts

decentr.blocks.getLatestBlock()
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "block_id": {
    "hash": "375D47568E1E9001E178D52DC948FC28401A57D94CF48DDF3662402E57FD6751",
    "parts": {
      "total": "1",
      "hash": "4D710E15E8D0C32BB0BC9B4CFB4E1566F946805B5E01902FE98DA10732E89119"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "testnet4",
      "height": "3394",
      "time": "2021-03-10T23:21:41.269688854Z",
      "last_block_id": {
        "hash": "03561F01ED82A0BA2B6B976C22EDA5172851961CD99245582E58A1830F53AE05",
        "parts": {
          "total": "1",
          "hash": "B8607F87E5DD7BA89EDE90F819BC5B0A16361EB620C16C79427EC85510248E74"
        }
      },
      "last_commit_hash": "7FC9ED7629534B04C864C31DB5C872AE61A4D5C56FF3C6ACEFE88FB2CFEE6C6B",
      "data_hash": "",
      "validators_hash": "BE14F8B06ED7F8BA532BEEF4948CEB42C2B063096471233ADFFDE26D901C944B",
      "next_validators_hash": "BE14F8B06ED7F8BA532BEEF4948CEB42C2B063096471233ADFFDE26D901C944B",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "6E9C4649FC6D72F2844EB6FF2C613ED0FC08DE9C97D1451DDF0FD96D6237F48B",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "54B612929384D59CE870FAF0147E48D3E4F93F1B"
    },
    "data": {
      "txs": null
    },
    "evidence": {
      "evidence": null
    },
    "last_commit": {
      "height": "3393",
      "round": "0",
      "block_id": {
        "hash": "03561F01ED82A0BA2B6B976C22EDA5172851961CD99245582E58A1830F53AE05",
        "parts": {
          "total": "1",
          "hash": "B8607F87E5DD7BA89EDE90F819BC5B0A16361EB620C16C79427EC85510248E74"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "02693DD1D220E641EC96AD131943312DFF1B71A0",
          "timestamp": "2021-03-10T23:21:41.269797389Z",
          "signature": "BOkvY2TMtoCV2RtZDfAaYw/LvS2rWM7MHoh+U1HXovD5QYfKsqCZVxTzaMWyjVz7rbrAm/bZoVG5ttrEQsr5CQ=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "279620A2A6636072F5A4E26576EBEA7383F49F0D",
          "timestamp": "2021-03-10T23:21:41.269688854Z",
          "signature": "H4dTIbFXrzvFsoPrB0G3Hu84DY5VEf0PoLiez+rUO9DJkm/XYzxVGL4FGGtaIrlUNGQShO58ATJJtUv1IC6OCA=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "4A14E0888B5623FA42FDB33CD8A320B48F1899E2",
          "timestamp": "2021-03-10T23:21:41.2403987Z",
          "signature": "NbQkDYlqqS2meB1e+RTD03tzXRJrbuXJpufXEVqsL1aNwhQGMVRKr28pS/rfiqk4Y3EiRV23fde+akEJyHBpAA=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "54B612929384D59CE870FAF0147E48D3E4F93F1B",
          "timestamp": "2021-03-10T23:21:41.269141575Z",
          "signature": "uTzDKh9dUczn6195Pc6nYLgEQWJgb7rpsDO4SjF5ZxIFIT8KZlkAig0UIoRYFYGemlaEyGrEOBW5TFh7otSNDw=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "5E24F5BF6B4877D5478A75FB2E3EB2B4E9C9F46D",
          "timestamp": "2021-03-10T23:21:41.26991759Z",
          "signature": "+7VVu58xeg/FU3xKNcP7zDmNO1hz+ye+Bq5qrpYymhES0fhhp2hY96WxH/zot7yWxwWXLEFis7fyXPOIfCPdCA=="
        }
      ]
    }
  }
}
*/
```

**Get block**

```ts

decentr.blocks.getBlock(blockHeight)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "block_id": {
    "hash": "CCAAD54727918CF22A7E95FD9E8B459B62BBA771F5A67A77DEFB3C3FFCF992C3",
    "parts": {
      "total": "1",
      "hash": "7C2A2979844A897869CE650E03C35E4C6A997A837474123C2D94CAE85AF21DCC"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "testnet4",
      "height": "11248",
      "time": "2021-03-11T11:27:16.049483366Z",
      "last_block_id": {
        "hash": "3F73AAFFD13AD9541C3115E6E7FABB751EFFF8A66725F35E7517B0339F91F43A",
        "parts": {
          "total": "1",
          "hash": "A984481B3227DAAF8126A825413A9F1B466A80D63BDF452133F92419D996DC8B"
        }
      },
      "last_commit_hash": "929688CD048DEF64D99D4C739925DF6D779A8ACF590963FABE9D4FDDF58D2BBF",
      "data_hash": "",
      "validators_hash": "BE14F8B06ED7F8BA532BEEF4948CEB42C2B063096471233ADFFDE26D901C944B",
      "next_validators_hash": "BE14F8B06ED7F8BA532BEEF4948CEB42C2B063096471233ADFFDE26D901C944B",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "71760D41E109575F6DA179565ACD085466BBDE12441BB3393331EB262B3AFA4F",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "279620A2A6636072F5A4E26576EBEA7383F49F0D"
    },
    "data": {
      "txs": null
    },
    "evidence": {
      "evidence": null
    },
    "last_commit": {
      "height": "11247",
      "round": "0",
      "block_id": {
        "hash": "3F73AAFFD13AD9541C3115E6E7FABB751EFFF8A66725F35E7517B0339F91F43A",
        "parts": {
          "total": "1",
          "hash": "A984481B3227DAAF8126A825413A9F1B466A80D63BDF452133F92419D996DC8B"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "02693DD1D220E641EC96AD131943312DFF1B71A0",
          "timestamp": "2021-03-11T11:27:16.053413018Z",
          "signature": "nx1AuHMPMTo5QjXn4nFZrfcdFn7gMPYxdTl0EbiDfrQlsICEPAHq3RUH55uEyuL2ClX9OvCUKdhKu+akYUyACw=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "279620A2A6636072F5A4E26576EBEA7383F49F0D",
          "timestamp": "2021-03-11T11:27:16.047697288Z",
          "signature": "eJsRULPhqhifsWn9RwQsFkgQAJsQdfJ8KJV3s2hy6+RzYBtXF+joQ/bDJMBBVbfTsdLsnJJX8VMWvaTTfGToBQ=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "4A14E0888B5623FA42FDB33CD8A320B48F1899E2",
          "timestamp": "2021-03-11T11:27:16.049483366Z",
          "signature": "3+/nVuaD7H0MgW2FJTuJMDj4m2vuBoQ0MsIWgkXiClVJaVs7MG6fqbVC+TFyjfwV/NIEGeoNLwwaAN8+r5pBBw=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "54B612929384D59CE870FAF0147E48D3E4F93F1B",
          "timestamp": "2021-03-11T11:27:16.05413328Z",
          "signature": "NpPnUPGQA0eQxS754yJ+glhsY/jjeCFW6jvi/i5m15KCoLVU1Hu3Rir1w14JBR4BTPP9X560OKN1bU1Aqh+BAw=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "5E24F5BF6B4877D5478A75FB2E3EB2B4E9C9F46D",
          "timestamp": "2021-03-11T11:27:16.049083252Z",
          "signature": "bha3l+TT6kHp7qhWfta9jpiviL2h0HOblDIOZ0WZRXHPMHoW99ev9cKbN7lBAjOwPU8lIxq0rSqL3R5jexRrBg=="
        }
      ]
    }
  }
}
*/
```

## Minting

**Get inflation**
```ts
decentr.minting.getInflation()

/*
CONSOLE OUTPUT:

"0.050028961753403722"
*/
```

## Supply

**Get total supply**
```ts
decentr.supply.getTotalSupply()

/*
CONSOLE OUTPUT:

[{
  "denom": "udec",
  "amount": "1493691736827925"
}]
*/
```

**Get coin supply**
```ts
decentr.supply.getTotalSupply('udec')

/*
CONSOLE OUTPUT:

"1493691736827925"
*/
```

## Images

**Save image**
```ts
const file: File = 'your image file';

const wallet: Wallet = {
  address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

decentr.images.saveImage(image, wallet)
  .then(console.log)

/*
CONSOLE OUTPUT:

{
  hd: "https://domain.com/decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu/abc123"
  thumb: "https://domain.com/decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu/abc123/thumb"
}
*/
```


## Swap 

** Get Fee **
```ts
decentr.swap.getFee('decentr1tet7xxem50t6hxfh605ge3r30mau7gl9xch825', 'decentr', amount: 0.00001)
  .then(console.log);

/*
CONSOLE OUTPUT:

"0.002"
*/
```

** Get Swap by id **
```ts
decentr.swap.getSwapById(1)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "closureReason": "collecting-timeout-exceeded"
  "createdAt": "2021-08-16T18:37:54.060126Z"
  "destinationAddress": "0x088fa3A57D9C44eBA719da2507a8F3E71ad1e430"
  "destinationNetwork": "decentr"
  "id": 18
  "state": "closed"
  "stateBlock": 9127040
  "updatedAt": "2021-08-16T20:37:56.994756Z"
}
*/
```

** Get Swap list **
```ts
const swapListPaginationOptions: SwapListPaginationOptions = {
  after: 50,
  limit: 10,
}

decentr.swap.getSwapList(swapListPaginationOptions)
  .then(console.log);

/*
CONSOLE OUTPUT:

[{
  "closureReason": "collecting-timeout-exceeded"
  "createdAt": "2021-08-16T18:37:54.060126Z"
  "destinationAddress": "0x088fa3A57D9C44eBA719da2507a8F3E71ad1e430"
  "destinationNetwork": "decentr"
  "id": 18
  "state": "closed"
  "stateBlock": 9127040
  "updatedAt": "2021-08-16T20:37:56.994756Z"
}]
*/
```

** Create swap **
```ts
const wallet: Wallet = {
  address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

decentr.swap.createSwap(wallet, 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu', 'decentr')
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "closureReason": "collecting-timeout-exceeded"
  "createdAt": "2021-08-16T18:37:54.060126Z"
  "destinationAddress": "0x088fa3A57D9C44eBA719da2507a8F3E71ad1e430"
  "destinationNetwork": "decentr"
  "id": 18
  "state": "closed"
  "stateBlock": 9127040
  "updatedAt": "2021-08-16T20:37:56.994756Z"
}
*/
```

## 🏦 Txs

** Search **

```ts

decentr.txs.search({ messageAction: 'set_like' }) // check TXsSearchParams interface for more params
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "total_count": "1",
  "count": "1",
  "page_number": "1",
  "page_total": "1",
  "limit": "30",
  "txs": [
    {
      "height": "72964",
      "txhash": "33F6C9B80BF758BCB5AC133AC69FD2EC931DDE9AF38843036BF4E9DBA70D5FA9",
      "raw_log": "[{\"msg_index\":0,\"log\":\"\",\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"set_like\"}]}]}]",
      "logs": [
        {
          "msg_index": 0,
          "log": "",
          "events": [
            {
              "type": "message",
              "attributes": [
                {
                  "key": "action",
                  "value": "set_like"
                }
              ]
            }
          ]
        }
      ],
      "tx": {
        "type": "cosmos-sdk/StdTx",
        "value": {
          "msg": [
            {
              "type": "community/SetLike",
              "value": {
                "postOwner": "decentr1exw8026vwdkhczydu0wy2hh8kzmqxthmcslj6e",
                "postUUID": "f9c6f6ec-8556-11eb-aebe-0242ac11000a",
                "owner": "decentr1t6zuwl57sn2tkqnrwt6ug8zy3v0xcajt9s7wqh",
                "weight": 1
              }
            }
          ],
          "fee": {
            "amount": [],
            "gas": "0"
          },
          "signatures": [
            {
              "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value": "Ak+p0asDvre5dbOaPYLslXAIpnyVucSsz+pzz54rosCd"
              },
              "signature": "Cp1RQxKk49m0dEYwg80RodJ6+7XocGImN2gvtE/JhyZMsLeMAH4p3tLYOEAZxz7BYOGzsbTqLbaqzcjLQ/p/iw=="
            }
          ],
          "memo": ""
        }
      },
      "timestamp": "2021-03-15T10:26:08Z"
    },
  },
}
*/
```

**Get by hash**

```ts

decentr.txs.getByHash('33F6C9B80BF758BCB5AC133AC69FD2EC931DDE9AF38843036BF4E9DBA70D5FA9')
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  "height": "72964",
  "txhash": "33F6C9B80BF758BCB5AC133AC69FD2EC931DDE9AF38843036BF4E9DBA70D5FA9",
  "raw_log": "[{\"msg_index\":0,\"log\":\"\",\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"set_like\"}]}]}]",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "set_like"
            }
          ]
        }
      ]
    }
  ],
  "tx": {
    "type": "cosmos-sdk/StdTx",
    "value": {
      "msg": [
        {
          "type": "community/SetLike",
          "value": {
            "postOwner": "decentr1exw8026vwdkhczydu0wy2hh8kzmqxthmcslj6e",
            "postUUID": "f9c6f6ec-8556-11eb-aebe-0242ac11000a",
            "owner": "decentr1t6zuwl57sn2tkqnrwt6ug8zy3v0xcajt9s7wqh",
            "weight": 1
          }
        }
      ],
      "fee": {
        "amount": [],
        "gas": "0"
      },
      "signatures": [
        {
          "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "Ak+p0asDvre5dbOaPYLslXAIpnyVucSsz+pzz54rosCd"
          },
          "signature": "Cp1RQxKk49m0dEYwg80RodJ6+7XocGImN2gvtE/JhyZMsLeMAH4p3tLYOEAZxz7BYOGzsbTqLbaqzcjLQ/p/iw=="
        }
      ],
      "memo": ""
    }
  },
  "timestamp": "2021-03-15T10:26:08Z"
}
*/
```

## 🥂 License

[MIT](./LICENSE.md) as always
