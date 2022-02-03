import { TheseusProfileClient } from './profile';

export class TheseusClient {
  public readonly profile = new TheseusProfileClient(this.url);

  constructor(private readonly url: string) {
  }
}
