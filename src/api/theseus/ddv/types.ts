export interface DDVDateStat {
  date: string;
  value: number;
}

export interface DDVStats {
  total: number;
  stats: DDVDateStat[];
}
