import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import { Wallet } from '../../../../wallet';
import { createTypedEncodeObject } from '../../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner, TransactionSignerFactory } from '../../transaction-signer';
import { setupCommunityExtension } from './extension';
import {
  CreatePostRequest,
  DeletePostRequest,
  FollowRequest,
  LikeRequest,
  UnfollowRequest,
} from './types';

export class CommunityClient {
  private readonly queryClient = QueryClient.withExtensions(
    this.tmClient,
    setupCommunityExtension,
  );

  constructor(
    private readonly tmClient: Tendermint34Client,
    private readonly transactionSignerFactory: TransactionSignerFactory,
  ) {
  }

  public getModeratorAddresses(): Promise<Wallet['address'][]> {
    return this.queryClient.community.getModerators();
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return this.queryClient.community.getFollowees({ owner: follower });
  }

  public createPost(
    request: CreatePostRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityCreatePost,
      { post: request },
    );

    return this.transactionSignerFactory(message);
  }

  public deletePost(
    request: DeletePostRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityDeletePost,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public setLike(
    request: LikeRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunitySetLike,
      { like: request },
    );

    return this.transactionSignerFactory(message);
  }

  public follow(
    request: FollowRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityFollow,
      request,
    );

    return this.transactionSignerFactory(message);
  }

  public unfollow(
    request: UnfollowRequest,
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityUnfollow,
      request,
    );

    return this.transactionSignerFactory(message);
  }
}
