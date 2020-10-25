import { getPdvHeaders, msgData, decryptWithPrivatekey, encryptWithPrivatekey, getKeyBytes, newStdMsg } from '../cosmos-keys';
import _Getters  from './getters'

export class Decentr {
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

  public QueryPrivateProfile(privateData: any, wallet: any) {
    const url =this.url + '/profile/private/' + wallet.address;
    const encrypted = encryptWithPrivatekey(privateData, wallet.privateKey);
    // const privKeyBytes = getKeyBytes(privateKey);
    const data = {
      base_req: {
          chain_id: this.chainId,
          from: wallet.address
      },
      private: encrypted
  }
  // tslint:disable-next-line: no-floating-promises
  return this.postData(url, data)
  }

  public QueryPdvTx(pdvAddress: string, accAddress: string) {
    const url =this.url + '/pdv';
    const data = {
      base_req: {
          chain_id: this.chainId,
          from: accAddress
      },
      address: pdvAddress
  }
  // tslint:disable-next-line: no-floating-promises
  return this.postData(url, data)
  }

  public async QueryPdvAddress(pdv: any, wallet: any){
    const url = await this.get.cerberusAddress() + '/v1/pdv';
    const headersData = getPdvHeaders(pdv, wallet);
    const headers = {
      'Public-Key': headersData.publicKeyHex,
      'Signature': headersData.signatureString
    }
    const address = await this.postData(url, pdv, headers).then(res => res.address);
    return address;
  }

  public async setPublicProfile(address: string, publicData: any){
    // tslint:disable-next-line: no-floating-promises
    const tx = await this.QueryPublicProfile(address, publicData);
    const acc = await this.get.account(address);
    const msgBody = msgData(tx, acc, this.chainId);
    const msg = newStdMsg(msgBody)
    return msg
  }

  public async setPrivateProfile(privateData: string, wallet: any){
    // tslint:disable-next-line: no-floating-promises
    const tx = await this.QueryPrivateProfile(privateData, wallet);
    const acc = await this.get.account(wallet.address);
    const msgBody = msgData(tx, acc, this.chainId);
    const msg = newStdMsg(msgBody)
    return msg
  }

  public async sendPDV(pdv: any, wallet: any) {
    const pdvAddress = await this.QueryPdvAddress(pdv, wallet);
    const tx = await this.QueryPdvTx(pdvAddress, wallet.address);
    const acc = await this.get.account(wallet.address);
    const msgBody = msgData(tx, acc, this.chainId);
    const msg = newStdMsg(msgBody)
    return msg;
  }

  public broadcastTx(tx: any): Promise<any> {
    const url = this.url + '/txs'
    return this.postData(url, tx);
  }

  private async postData(url = '', data = {}, options?: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: options,
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}
