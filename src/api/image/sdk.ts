import { KeyPair } from '../../wallet';
import { SaveImageResponse } from './types';
import { saveImage } from './api';

export class DecentrImageSDK {
  constructor(
    private cerberusUrl: string,
  ) {
  }

  public saveImage(
    image: File,
    keyPair: KeyPair,
  ): Promise<SaveImageResponse> {
    return saveImage(this.cerberusUrl, image, keyPair);
  }
}
