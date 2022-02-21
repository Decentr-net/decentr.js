import { TheseusDDVClient } from './ddv';
import { TheseusPostsClient } from './posts';
import { TheseusProfileClient } from './profile';

export class TheseusClient {
  public readonly ddv = new TheseusDDVClient(this.url);
  public readonly posts = new TheseusPostsClient(this.url);
  public readonly profile = new TheseusProfileClient(this.url);

  constructor(private readonly url: string) {
  }
}
