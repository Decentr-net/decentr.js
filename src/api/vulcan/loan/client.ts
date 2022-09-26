import { fetchJson } from '../../../utils';
import { Loan } from './types';

export class VulcanLoanClient {
  private readonly controllerUrl = `${this.url}/v1/dloan`;

  constructor(
    private readonly url: string,
  ) {
  }

  public requestLoan(loan: Loan): Promise<void> {
    const url = this.controllerUrl;
    return fetchJson(url, {
      method: 'POST',
      body: loan,
    });
  }
}
