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

## 🥂 License

[MIT](./LICENSE.md) as always
