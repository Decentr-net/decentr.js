import { VulcanLoanClient } from './loan';
import { VulcanReferralClient } from './referral';
import { VulcanRegistrationClient } from './registration';

export class VulcanClient {
  public readonly loan = new VulcanLoanClient(this.url);
  public readonly referral = new VulcanReferralClient(this.url);
  public readonly registration = new VulcanRegistrationClient(this.url);

  constructor(private readonly url: string) {
  }
}
