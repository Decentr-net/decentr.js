import { TheseusPostsClient } from './posts';
import { TheseusProfileClient } from './profile';

export class TheseusClient {
  public readonly posts = new TheseusPostsClient(this.url);
  public readonly profile = new TheseusProfileClient(this.url);

  constructor(private readonly url: string) {
  }
}
