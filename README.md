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

const seed = ...24 seed words here  
const wallet = createWalletFromMnemonic(seed);

/*
{
    address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
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
const publicData = {
  avatar: 'image source',
  birthday: '1991-02-03',
  gender: 'male',
  firstName: 'first name',
  lastName: 'last name',
};

  AND

import { Decentr } from 'decentr-js';
const decentr = new Decentr(restUrl, chainId);

decentr.profile.setPublicProfile(
  walletAddress,
  publicData, 
  {
    broadcast: true,
    privateKey,
  },
).then(...)

  OR

import { Decentr, broadcast } from 'decentr-js';
const decentr = new Decentr(restUrl, chainId);

const stdTxResponse = await decentr.profile.setPublicProfile(walletAddress, publicData);

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

**Set public profile**

```ts
import { PublicProfile } from 'decentr-js';

const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';

const publicProfile: PublicProfile = {
  birthday: '1991-02-03',
  gender: 'male',
  avatar: 'http://hosting.com/avatar.png',
  lastName: 'lastName',
  firstName: 'firstName',
}

await decentr.profile.setPublicProfile<YourPrivateProfile>(
  walletAddress,
  publicProfile,
  {
    broadcast: true,
    privateKey,
  },
);
```

**Get public profile**

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.profile.getPublicProfile(wallet.address).then(console.log);

/*
CONSOLE OUTPUT:

{
  birthday: '1991-02-03',
  gender: 'male',
  avatar: 'http://hosting.com/avatar.png',
  lastName: 'lastName',
  firstName: 'firstName',
  registeredAt: '',
}
*/
```

**Set private profile**

```ts
import { PrivateProfile } from 'decentr-js';

interface YourPrivateProfile extends PrivateProfile {
  emails: string[];
  usernames: string[];
}

const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';

const privateProfile: YourPrivateProfile = {
  emails: ['ex@mex.com'],
  name: ['Ex'],
}

await decentr.profile.setPrivateProfile<YourPrivateProfile>(
  walletAddress,
  privateProfile,
  privateKey,
  {
    broadcast: true,
  },
);
```

**Get private profile data**

*Type of returned data depends on type set in `setProfileProfile`*

```ts
interface YourPrivateProfile extends PrivateProfile {
  emails: string[];
  usernames: string[];
}

const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const privateKey = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';

decentr.profile.getPrivateProfile<YourPrivateProfile>(walletAddress, privateKey)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  emails: ['ex@mex.com'],
  name: ['Ex'],
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

**Get PDV statistics**

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.pdv.getPDVStats(walletAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

[
  {
    date: "2020-11-04"
    value: 2e-7,
  },
  {
    date: "2020-11-05"
    value: 0.0000011,
  },
[
*/
```

**Get PDV details**

```ts
const cerberusUrl = 'https://cerberus.testnet.decentr.xyz';

const pDVaddress = '9664d0817131a2ce56f18d37f3836d6b6ec7cf29-1877c66aaa918bd2ad0c3f6d02ce7ef55fb9c28c44abed94117f4782e1d0a952';

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
  version: "v1"
  pdv: {
    domain: "decentr.net",
    path: "/",
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
  }
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
    "cookie": 3600,
    "login_cookie": 100
  },
  "reward": 7600
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

decentr.bank.sendCoin(
  {
    from_address: wallet.address,
    to_address: walletAddressTo,
    amount,
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

**Transfer history**

```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
const role: 'recipient' | 'sender' = 'sender';
const page = 1;
const limit = 100;

decentr.bank.getTransferHistory(
  walletAddress,
  role,
  {
    page,
    limit,
  },
).then(console.log);;

/*
CONSOLE OUTPUT:

{
  count: 1,
  page: 1,
  limit: 100,
  transactions: [{
    amount: '10',
    recipient: 'decentr1ltx6yymrs8eq4nmnhzfzxj6tspjuymh8mgd6gz',
    sender: 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5',
    timestamp: '2021-01-06T22:56:20Z'
  }],
}
*/
```

## 📜 Staking

**Get validators**

```ts

const filterParams = {    // OPTIONAL
  status: 'bonded',       // 'unbonding' | 'bonded' | 'unbonded'
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
## 🥂 License

[MIT](./LICENSE.md) as always
