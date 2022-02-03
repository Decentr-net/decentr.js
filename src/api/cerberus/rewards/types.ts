export interface TokenPool {
  size: string,
  total_delta: string;
  next_distribution_date: string;
}

export interface TokenDelta {
  delta: string;
  pool: TokenPool;
}
