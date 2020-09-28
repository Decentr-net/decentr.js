import { Fee, SignMeta, Tx } from './../types';

export function test() {
  return 'asdadasdadasdasd';
}

export function createSignMessage ( jsonTx: Tx, {sequence, account_number, chain_id}: SignMeta
) {
  // sign bytes need amount to be an array
  const fee: Fee = {
    amount: jsonTx.fee.amount || [],
    gas: jsonTx.fee.gas
  }

  return JSON.stringify(
    removeEmptyProperties({
      fee,
      memo: jsonTx.memo,
      msgs: jsonTx.msg, // weird msg vs. msgs
      sequence: sequence,
      account_number: account_number,
      chain_id: chain_id
    })
  )
}

export function createSignature (
  signature: any,
  sequence: any,
  accountNumber: any,
  publicKey: any
) {
  return {
    signature: signature.toString(`base64`),
    account_number: accountNumber,
    sequence,
    pub_key: {
      type: `tendermint/PubKeySecp256k1`, // TODO: allow other keytypes
      value: publicKey.toString(`base64`)
    }
  }
}

export function removeEmptyProperties (jsonTx: any) : any {
  if (Array.isArray(jsonTx)) {
    return jsonTx.map(removeEmptyProperties)
  }

  // string or number
  if (typeof jsonTx !== `object`) {
    return jsonTx
  }

  const sorted: any = {}
  Object.keys(jsonTx)
    .sort()
    .forEach(key => {
      if (jsonTx[key] === undefined || jsonTx[key] === null) return

      sorted[key] = removeEmptyProperties(jsonTx[key])
    })
  return sorted
}
