# decentr-js

> decentr-js

[![NPM version](https://img.shields.io/npm/v/decentr-js.svg)](https://www.npmjs.com/package/decentr-js)
![Downloads](https://img.shields.io/npm/dm/decentr-js.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

---

## ✨ Features

- Generate mnemonic
- Create wallet (address, private key, publick key)

## 🔧 Installation

```sh
npm install decentr-js
```

## 🎬 Getting started

Generate mnemonic phrase (24 words)

```ts
import { generateMnemonic } from 'decentr-js';
const mnemonic = generateMnemonic();
/*
    fantasy scatter misery seminar resist file unique coral ordinary wash shoulder demise bubble calm sail protect divide write lend card sudden rally depart park
*/
```
Create wallet with address and keys
```ts
import { createWalletFromMnemonic } from "decentr-js"

const seed = ...24 seed words here  
const wallet = createWalletFromMnemonic(seed);

/*
{
    address:    'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5',
    privateKey: Uint8Array [
        202,  60, 140, 106, 178, 180,  60,   1,
        186,  68, 206, 224, 207, 179,  79,  81,
        119,  98,  98,   1, 207, 170, 209, 161,
          1, 124, 151, 236, 205, 151,   3, 229
    ],
    publicKey:  Uint8Array [
          3, 159,  35,  41, 130,  48,   3, 247,
        139, 242, 113,  41, 200, 176,  73,  27,
        102, 232, 113, 226,  80, 184, 107, 144,
        217,  88, 151,  21,  22, 185,  68,  28,
        211
    ]
}
*/
```

Create Cosmos connector
```ts
import { Cosmos } from 'decentr-js';

  REST_URL = 'http://rest.testnet.decentr.xyz';
  CHAIN_ID = 'testnet';
  
  const cosmos = new Cosmos(REST_URL, CHAIN_ID);
```

Get Accaunt information
```ts
    const address = 'decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5';
    
    const account = from(cosmos.get.account(address));
    account.subscribe(/*do something*/);
    
    /*
    {
   "address":"decentr1p4s4djk5dqstfswg6k8sljhkzku4a6ve9dmng5",
   "coins":[
      {
         "denom":"udec",
         "amount":"9999900000000000000"
      }
   ],
   "public_key":"decentrpub1addwnpepqdypqhcvrp3eheh0nj4dcccklhx8r9qp89s3yel0aaz7vguy6jj3wwcld2w",
   "account_number":6,
   "sequence":1
}
*/
```

Set public profile data
```ts
import {
  Cosmos,
  setPublicProfile,
  signMessage,
  broadcastTx
} from 'decentr-js';

const cosmos = new Cosmos(REST_URL, CHAIN_ID);

const publicData = {
    gender: 'male',
    birthday: '2019-12-11'
}
const publicProfileTx = from(this.cosmos.setPublicProfile(wallet.address,publicData));

publicProfileTx.subscribe(message => {
    const signedMsg = signMessage(message, wallet.privateKey)
    this.cosmos.broadcastTx(signedMsg);
});
```



## 🎭 Examples

Go checkout [examples](./examples) !

## 📜 API

> Document your API here

### `publicMethodOne(value:string): string`

This methods does foo bar moo...

**Example:**

```ts
// example
```

## 🎓 Guides

<details>
<summary>How to do Foo</summary>
Today we're gonna build Foo....
</details>

### 🕵️ Troubleshooting

## 🥂 License

[MIT](./LICENSE.md) as always
