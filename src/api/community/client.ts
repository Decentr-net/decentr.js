import { QueryClient } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

import {
  MsgCreatePost,
  MsgDeletePost,
  MsgFollow,
  MsgSetLike,
  MsgUnfollow,
} from '../../codec/community/tx';
import { Wallet } from '../../wallet';
import { createTypedEncodeObject } from '../api-utils';
import { TxMessageTypeUrl } from '../registry';
import { TransactionSigner } from '../transaction-signer';
import { CommunityExtension, setupCommunityExtension } from './extension';

export class DecentrCommunityClient {
  private constructor(
    private nodeUrl: string,
    private queryClient: QueryClient & CommunityExtension,
    private tmClient: Tendermint34Client,
  ) {
  }

  public static async create(nodeUrl: string): Promise<DecentrCommunityClient> {
    const tendermintClient = await Tendermint34Client.connect(nodeUrl);

    const queryClient = QueryClient.withExtensions(
      tendermintClient,
      setupCommunityExtension,
    );

    return new DecentrCommunityClient(nodeUrl, queryClient, tendermintClient);
  }

  public disconnect(): void {
    this.tmClient.disconnect();
  }

  public getModeratorAddresses(): Promise<Wallet['address'][]> {
    return this.queryClient.community.getModerators();
  }

  public getFollowees(follower: Wallet['address']): Promise<Wallet['address'][]> {
    return this.queryClient.community.getFollowees({ owner: follower });
  }

  public createPost(
    request: MsgCreatePost['post'],
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityCreatePost,
      { post: request },
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public deletePost(
    request: MsgDeletePost,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityDeletePost,
      request,
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public setLike(
    request: MsgSetLike['like'],
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunitySetLike,
      { like: request },
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public follow(
    request: MsgFollow,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityFollow,
      request,
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }

  public unfollow(
    request: MsgUnfollow,
    privateKey: Wallet['privateKey'],
    options?: {
      memo?: string,
    },
  ): TransactionSigner {
    const message = createTypedEncodeObject(
      TxMessageTypeUrl.CommunityUnfollow,
      request,
    );

    return new TransactionSigner(
      this.nodeUrl,
      message,
      privateKey,
      options,
    );
  }
}
