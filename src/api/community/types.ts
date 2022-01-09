import { Post as BlockchainPost } from '../../codec/community/community';

export interface Post extends BlockchainPost {
  createdAt: number;
  dislikesCount: number;
  likesCount: number;
  pdv: number;
  slug: string;
}
