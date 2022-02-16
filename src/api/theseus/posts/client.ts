import { Wallet } from '../../../wallet';
import { fetchJson } from '../../../utils';
import { Post, PostResponse, PostsListFilterOptions, PostsListResponse } from './types';

export class TheseusPostsClient {
  private readonly controllerUrl = `${this.url}/v1/posts`;

  constructor(
    private readonly url: string,
  ) {
  }

  public getPost(params: Pick<Post, 'owner' | 'uuid'>, requestedBy: Wallet['address']): Promise<PostResponse> {
    const url = `${this.controllerUrl}/${params.owner}/${params.uuid}`;

    return fetchJson(url, {
      queryParameters: { requestedBy },
    });
  }

  public getPosts(filterOptions?: PostsListFilterOptions): Promise<PostsListResponse> {
    return fetchJson(this.controllerUrl, {
      queryParameters: { ...filterOptions },
    })
  }

}
