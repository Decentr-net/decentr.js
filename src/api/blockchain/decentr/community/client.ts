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
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityCreatePost,
      { post: request },
    );

    return this.transactionSignerFactory(message, options);
  }

  public deletePost(
    request: DeletePostRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityDeletePost,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public setLike(
    request: LikeRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunitySetLike,
      { like: request },
    );

    return this.transactionSignerFactory(message, options);
  }

  public follow(
    request: FollowRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityFollow,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }

  public unfollow(
    request: UnfollowRequest,
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityUnfollow,
      request,
    );

    return this.transactionSignerFactory(message, options);
  }
}
