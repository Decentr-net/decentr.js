export interface AdvDdvStatistics {
  adv: number;
  ddv: number;
}

export interface ProfilePDVStatisticsItem {
  date: string;
  value: number;
}

export interface ProfileStatistics {
  postsCount: number;
  stats: ProfilePDVStatisticsItem[];
}
