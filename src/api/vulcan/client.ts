import { VulcanReferralClient } from './referral';
import { VulcanRegistrationClient } from './registration';

export class VulcanClient {
  public readonly referral = new VulcanReferralClient(this.url);
  public readonly registration = new VulcanRegistrationClient(this.url);

  constructor(private readonly url: string) {
  }
}
