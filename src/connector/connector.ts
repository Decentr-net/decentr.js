import { Wallet, PublicProfile, PrivateProfile, Fee } from './../types';
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

  public QueryPublicProfile(address: string ,publicData: PublicProfile) {
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
  return this.fetchData('POST' , url, data)
  }

  public QueryPrivateProfile(privateData: PrivateProfile, wallet: Wallet) {
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
  return this.fetchData('POST', url, data)
  }

  private QueryPdvTx(pdvAddress: string, accAddress: string) {
    const url =this.url + '/pdv';
    const data = {
      base_req: {
          chain_id: this.chainId,
          from: accAddress
      },
      address: pdvAddress
  }
  // tslint:disable-next-line: no-floating-promises
  return this.fetchData('POST', url, data)
  }

  private async QueryPdvAddress(pdv: any, wallet: Wallet){
    const url = await this.get.cerberusAddress() + '/v1/pdv';
    const headersData = getPdvHeaders(pdv, wallet);
    const headers = {
      'Public-Key': headersData.publicKeyHex,
      'Signature': headersData.signatureString
    }
    const address = await this.fetchData('POST', url, pdv, headers).then(res => res.address);
    return address;
  }

  public async setPublicProfile(address: string, publicData: PublicProfile, fee?: Fee){
    // tslint:disable-next-line: no-floating-promises
    const tx = await this.QueryPublicProfile(address, publicData);
    const acc = await this.get.account(address);
    const msgBody = msgData(tx, acc, this.chainId, fee);
    const msg = newStdMsg(msgBody)
    return msg
  }

  public async setPrivateProfile(privateData: PrivateProfile, wallet: Wallet, fee?: Fee){
    // tslint:disable-next-line: no-floating-promises
    const acc = await this.get.account(wallet.address);
    const tx = await this.QueryPrivateProfile(privateData, wallet);
    const msgBody = msgData(tx, acc, this.chainId, fee);
    const msg = newStdMsg(msgBody)
    return msg
  }

  public async sendPDV(pdv: any, wallet: Wallet, fee?: Fee) {
    const pdvAddress = await this.QueryPdvAddress(pdv, wallet);
    const tx = await this.QueryPdvTx(pdvAddress, wallet.address);
    const acc = await this.get.account(wallet.address);
    const msgBody = msgData(tx, acc, this.chainId, fee);
    const msg = newStdMsg(msgBody)
    return msg;
  }

  public async getPdvByAddress(pdvAddress: string, wallet: Wallet){
    const url = await this.get.cerberusAddress() + '/v1/pdv/' + pdvAddress;
    const headersData = getPdvHeaders(pdvAddress, wallet);
    const headers = {
      'Public-Key': headersData.publicKeyHex,
      'Signature': headersData.signatureString
    }
    const address = await this.fetchData('GET', url, {}, headers).then(res => res);
    return address;
  }

  public broadcastTx(tx: any): Promise<any> {
    const url = this.url + '/txs'
    return this.fetchData('POST', url, tx);
  }

  private async fetchData(method: string ,url = '', data = {}, options?: any): Promise<any> {
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: options,
      body: method === 'POST' ? JSON.stringify(data) : null  // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}
