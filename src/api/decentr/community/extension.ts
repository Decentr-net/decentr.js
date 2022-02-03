import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';

import { Post } from '../../../codec/community/community';
import {
  GetPostRequest,
  ListFollowedRequest,
  ListUserPostsRequest,
  QueryClientImpl,
} from '../../../codec/community/query';
import { Wallet } from '../../../wallet';

export interface CommunityExtension {
  readonly community: {
    readonly getFollowees: (request: ListFollowedRequest) => Promise<Wallet['address'][]>;
    readonly getModerators: () => Promise<Wallet['address'][]>;
    readonly getPost: (request: GetPostRequest) => Promise<Post | undefined>;
    readonly getUserPosts: (request: ListUserPostsRequest) => Promise<Post[]>;
  };
}

export function setupCommunityExtension(base: QueryClient): CommunityExtension  {
  const rpcClient = createProtobufRpcClient(base);

  const queryService = new QueryClientImpl(rpcClient);

  return {
    community: {
      getFollowees: (request: ListFollowedRequest) => queryService.ListFollowed(request)
        .then((response) => response.followed),

      getModerators: () => queryService.Moderators({})
        .then((response) => response.moderators),

      getPost: (request: GetPostRequest) => queryService.GetPost(request)
        .then((response) => response.post),

      getUserPosts: (request: ListUserPostsRequest) => queryService.ListUserPosts(request)
        .then((response) => response.posts)
    },
  };
}
