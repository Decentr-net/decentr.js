import { KeyPair } from '../../wallet';
import { SaveImageResponse } from './types';
import { saveImage } from './image';

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
