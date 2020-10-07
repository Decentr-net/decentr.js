import _Getters  from './getters'

export class Cosmos {
  url: any = '';
  get: any = {};


  constructor (cosmosRESTURL: any, chainId = undefined) {
    this.url = cosmosRESTURL
    chainId = chainId

    const getters: any = _Getters(cosmosRESTURL)
    Object.keys(getters).forEach((getter: any) => {
      this.get[getter] = getters[getter]
    })
  }
}
