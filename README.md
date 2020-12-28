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

decentr.getAccount(walletAddress)
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
const decentr = new DecentrConnect(restUrl, chainId);

decentr.setPublicProfile(
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

const stdTxResponse = await decentr.setPublicProfile(walletAddress, publicData);

const account = await decentr.getAccount(walletAddress);
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

decentr.getAccount(walletAddress).then(console.log);

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

**Get token balance**
```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.getTokenBalance(walletAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

2e-7
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

await decentr.setPublicProfile<YourPrivateProfile>(
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

decentr.getPublicProfile(wallet.address).then(console.log);

/*
CONSOLE OUTPUT:

{
  birthday: '1991-02-03',
  gender: 'male',
  avatar: 'http://hosting.com/avatar.png',
  lastName: 'lastName',
  firstName: 'firstName',
}
*/
```

####Set private profile
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

await decentr.setPrivateProfile<YourPrivateProfile>(
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

decentr.getPrivateProfile<YourPrivateProfile>(walletAddress, privateKey)
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
**Send PDV data**
```ts
const pdvType: PDVType; // 'Cookie' = 1, ...

const pdv = {
  version: 'v1',
  pdv: {
    domain: 'decentr.net',
    path: '/',
    data: [
      {
        version: 'v1',
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
  },
};

const wallet: Wallet = {
  address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

await decentr.sendPDV(pdv, pdvType, wallet, { broadcast: true });
```

**Get PDV list**
```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.getPDVlist(walletAddress)
  .then(console.log);

/*
CONSOLE OUTPUT:

[
  {
    address: "9664d0817131a2ce56f18d37f3836d6b6ec7cf29-1877c66aaa918bd2ad0c3f6d02ce7ef55fb9c28c44abed94117f4782e1d0a952",
    owner: "decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5",
    timestamp: "2020-11-05T18:49:39Z",
    type: "1",
  },
[
*/
```

**Get PDV statistics**
```ts
const walletAddress = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';

decentr.getPDVStats(walletAddress)
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

**get PDV details**
```ts
const pDVaddress = '9664d0817131a2ce56f18d37f3836d6b6ec7cf29-1877c66aaa918bd2ad0c3f6d02ce7ef55fb9c28c44abed94117f4782e1d0a952';
const wallet: Wallet = {
  address:    'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu',
  privateKey: '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60',
  publicKey:  '03dae8cf229d1db63c8d854bd1c73e280147ebd3bb40df12381d16b0eb071a72b6'
}

decentr.getPDVDetails(PDVaddress, wallet)
  .then(console.log);

/*
CONSOLE OUTPUT:

{
  calculated_data: {
    ip: "255.255.255.255",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
  },
  user_data: {
    version: "v1"
    pdv: {
      domain: "decentr.net",
      path: "/",
      data: [
        {
          version: 'v1',
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
  },
}
*/
```

## 📜 Posts

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

decentr.createPost(walletAddress, post,   {
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

decentr.deletePost(walletAddress, {
  author: authorWalletAddress,
  postId,
}, {
  broadcast: true,
  privateKey,
});
```

**Get one post**

```ts
// These params must be used in pair or not used at all
const author = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const postId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';

decentr.getPost({
  author,
  postId,
}).then(console.log);

/* 
CONSOLE OUTPUT:

{
  category: 1 (PostCategory),
  createdAt: 1606853668 (UNIX timestamp),
  dislikesCount: 0,
  owner: "decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux"
  pdv: 0,
  previewImage: 'http...',
  text: "Post text",
  title: "Post title",
  uuid: "cf4699e5-3411-11eb-8f45-0242ac11000b"
}
*/
```

**Get latest posts**

```ts
// These params are optional
const category = PostCategory.WorldNews;
const limit = 20;

// These params must be used in pair or not used at all
const fromAuthorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const fromPostId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';

decentr.getLatestPosts({
  fromOwner: fromAuthorWalletAddress,
  fromUUID: fromPostId,
  category,
  limit,
}).then(console.log);

/* 
CONSOLE OUTPUT:

[
  {
    category: 1 (PostCategory),
    createdAt: 1606853668 (UNIX timestamp),
    dislikesCount: 0,
    owner: "decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux"
    pdv: 0,
    previewImage: 'http...',
    text: "Post text",
    title: "Post title",
    uuid: "cf4699e5-3411-11eb-8f45-0242ac11000b"
  }
]
*/
```

**Get user posts**

```ts
const authorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';

// These params are optional
const fromPostId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';
const limit = 20;

decentr.getUserPosts(authorWalletAddress, {
  from: fromPostId,
  limit,
}).then(console.log);

/* 
CONSOLE OUTPUT:

[
  {
    category: 1 (PostCategory.WorldNews),
    createdAt: 1606853668 (UNIX timestamp),
    dislikesCount: 0,
    owner: "decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux"
    pdv: 0,
    previewImage: 'http...',
    text: "Post text",
    title: "Post title",
    uuid: "cf4699e5-3411-11eb-8f45-0242ac11000b"
  }
]
*/
```

**Get popular posts**

```ts
const period = 'week'; ('day' | 'week' | 'month')

// These params are optional
const category = PostCategory.WorldNews;
const limit = 20;

// These params must be used in pair or not used at all
const fromAuthorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const fromPostId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';

decentr.getPopularPosts(period, {
  fromOwner: fromAuthorWalletAddress,
  fromUUID: fromPostId,
  category,
  limit,
}).then(console.log);

/* 
CONSOLE OUTPUT:

[
  {
    category: 1 (PostCategory.WorldNews),
    createdAt: 1606853668 (UNIX timestamp),
    dislikesCount: 0,
    owner: "decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux"
    pdv: 0,
    previewImage: 'http...',
    text: "Post text",
    title: "Post title",
    uuid: "cf4699e5-3411-11eb-8f45-0242ac11000b"
  }
]
*/
```

**Like post**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';
const privateKey = '8c313682470073d56d2d8f5b7fde53c072024a9fd9135501125035d53c8a1f60';

const authorWalletAddress = 'decentr1urlzs0q6g8lqedjgfa5nxvnldp7nxlunnky8ux';
const postId = 'cf4699e5-3411-11eb-8f45-0242ac11000b';

const likeWeight = LikeWeight.Down  (LikeWeight.Up, LikeWeight.Zero, LikeWeight.Down)

decentr.likePost(
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

**Get liked posts**

```ts
const walletAddress = 'decentr1j6e6j53vh95jcq9k9lnsrsvj3h8dkdgmm20zhu';

decentr.getLikedPosts(walletAddress)
  .then(console.log);

/* 
CONSOLE OUTPUT:

{
  "decentr1ndzepz4myut7ydlq906g6hxe8k79qrdv4wfygs/36f86ac8-40b3-11eb-87c8-0242ac11000a": -1, (disliked)
  "decentr16pnd8v6jcpnfjazlfyte7adfn2ue4q48a9m3wc/d7992efc-3fb2-11eb-85e2-0242ac110007": 1   (liked)
}
*/
```


## 🥂 License

[MIT](./LICENSE.md) as always
