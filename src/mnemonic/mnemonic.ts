import * as bip39 from 'bip39'

export function generateMnemonic() {
  return getSeed();
}

/* tslint:disable-next-line:strict-type-predicates */
const windowObject: Window | null = typeof window === 'undefined' ? null : window

// returns a byte buffer of the size specified
export function randomBytes(size: number, window = windowObject): Buffer {
  // in browsers
  if (window && window.crypto) {
    return windowRandomBytes(size, window)
  }

  try {
    // native node crypto
    const crypto = require('crypto')
    return crypto.randomBytes(size)
  } catch (err) {
    // no native node crypto available
  }

  throw new Error(
    'There is no native support for random bytes on this system. Key generation is not safe here.'
  )
}

function windowRandomBytes(size: number, window: Window) {
  const chunkSize = size / 4
  let hexString = ''
  let keyContainer = new Uint32Array(chunkSize)
  keyContainer = window.crypto.getRandomValues(keyContainer)

  for (let keySegment = 0; keySegment < keyContainer.length; keySegment++) {
    let chunk = keyContainer[keySegment].toString(16) // Convert int to hex
    while (chunk.length < chunkSize) {
      // fill up so we get equal sized chunks
      chunk = '0' + chunk
    }
    hexString += chunk // join
  }
  return Buffer.from(hexString, 'hex')
}


export function getSeed(randomBytesFunc: (size: number) => Buffer = randomBytes): string {
  const entropy = randomBytesFunc(32)
  if (entropy.length !== 32) throw Error(`Entropy has incorrect length`)
  const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'))

  return mnemonic
}
