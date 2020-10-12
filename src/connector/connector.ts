import { newStdMsg } from '../cosmos-keys';
import _Getters  from './getters'

export class Cosmos {
  url: any = '';
  get: any = {};
  chainId = '';


  constructor (cosmosRESTURL: string, chainId: string) {
    this.url = cosmosRESTURL
    this.chainId = chainId

    const getters: any = _Getters(cosmosRESTURL)
    Object.keys(getters).forEach((getter: any) => {
      this.get[getter] = getters[getter]
    })
  }

  public QueryPublicProfile(address: string ,publicData: {gender: string, birthday: string}) {
    const url = this.url + '/profile/public/' + address;
    const data = {
      base_req: {
          chain_id: this.chainId,
          from: address
      },
      public: {
          gender: publicData.gender,
          birthday: publicData.birthday
      }
  }
  // tslint:disable-next-line: no-floating-promises
  return this.postData(url, data)
  }

  public QueryPrivateProfile(address: string, privateData: string) {
    const url = this.url + '/profile/private/' + address;
    const data = {
      base_req: {
          chain_id: this.chainId,
          from: address
      },
      private: privateData
  }
  // tslint:disable-next-line: no-floating-promises
  return this.postData(url, data)
  }

  public async setPublicProfile(address: string, publicData: any){
    // tslint:disable-next-line: no-floating-promises
    const tx = await this.QueryPublicProfile(address, publicData);
    const acc = await this.get.account(address);
    const msg = newStdMsg(
      {
        msgs: [
          {
                type: tx.value.msg[0].type,
                value: tx.value.msg[0].value
              }
        ],
        chain_id: this.chainId,
        fee: { amount: [ { amount: "5000", denom: "udec" } ], gas: String(200000) },
        memo: "",
        account_number: String(acc.account_number),
        sequence: String(acc.sequence)
      }
    )
    return msg
  }

  public async setPrivateProfile(address: string, privateData: string){
    // tslint:disable-next-line: no-floating-promises
    const tx = await this.QueryPrivateProfile(address, privateData);
    const acc = await this.get.account(address);
    const msg = newStdMsg(
      {
        msgs: [
          {
                type: tx.value.msg[0].type,
                value: tx.value.msg[0].value
              }
        ],
        chain_id: this.chainId,
        fee: { amount: [ { amount: "5000", denom: "udec" } ], gas: String(200000) },
        memo: "",
        account_number: String(acc.account_number),
        sequence: String(acc.sequence)
      }
    )
    return msg
  }

  public broadcastTx(tx: any) {
    const url = this.url + '/txs'
    // tslint:disable-next-line: no-floating-promises
    this.postData(url, tx);
  }

  private async postData(url = '', data = {}): Promise<any> {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}


