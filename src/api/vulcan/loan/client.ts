import { fetchJson } from '../../../utils';
import { Loan } from './types';

export class VulcanLoanService {
  private readonly controllerUrl = `${this.url}/v1`;

  constructor(
    private readonly url: string,
  ) {
  }

  public requestLoan(loan: Loan): Promise<void> {
    const url = `${this.controllerUrl}/dloan`;
    return fetchJson(url, {
      method: 'POST',
      body: loan,
    });
  }
}
