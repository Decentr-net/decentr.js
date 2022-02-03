import { CerberusConfigurationClient } from './configuration';
import { CerberusImageClient } from './image';
import { CerberusPDVClient } from './pdv';
import { CerberusProfileClient } from './profile';
import { CerberusRewardsClient } from './rewards';

export class CerberusClient {
  public readonly configuration: CerberusConfigurationClient = new CerberusConfigurationClient(this.url);

  public readonly image: CerberusImageClient = new CerberusImageClient(this.url);

  public readonly pdv: CerberusPDVClient = new CerberusPDVClient(this.url);

  public readonly profile: CerberusProfileClient = new CerberusProfileClient(this.url, this.pdv);

  public readonly rewards: CerberusRewardsClient = new CerberusRewardsClient(this.url);

  constructor(private readonly url: string) {
  }
}
