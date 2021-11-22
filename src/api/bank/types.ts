import { Wallet } from '../../wallet';

export interface SendTokensOptions {
  readonly amount: number | string;
  readonly comment?: string;
  readonly denom?: string;
  readonly recipient: Wallet['address'];
}
