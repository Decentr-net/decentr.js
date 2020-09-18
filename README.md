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

Let's demonstrate simple usage:

```ts
// Generate mnemonic phrase (12 words)
import { generateMnemonic } from 'decentr-js';
const mnemonic = generateMnemonic();

//Create wallet with address and keys
import { getNewWalletFromSeed } from "decentr-js"

const seed = ...12 seed words here  

const bech32prefix = 'cosmos';
const { cosmosAddress, privateKey, publicKey } = getNewWalletFromSeed(seed, bech32prefix)

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
