export interface RegistrationDateStat {
  date: string;
  value: number;
}

export interface RegistrationStats {
  stats: RegistrationDateStat[];
  total: number;
}
