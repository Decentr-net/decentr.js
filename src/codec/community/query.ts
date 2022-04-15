/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Post } from "../community/community";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "community";

export interface GetPostRequest {
  postOwner: string;
  postUuid: string;
}

export interface GetPostResponse {
  post?: Post;
}

export interface ListUserPostsRequest {
  owner: string;
  pagination?: PageRequest;
}

export interface ListUserPostsResponse {
  posts: Post[];
  pagination?: PageResponse;
}

export interface ModeratorsRequest {}

export interface ModeratorsResponse {
  moderators: string[];
}

export interface ListFollowedRequest {
  owner: string;
  pagination?: PageRequest;
}

export interface ListFollowedResponse {
  followed: string[];
  pagination?: PageResponse;
}

function createBaseGetPostRequest(): GetPostRequest {
  return { postOwner: "", postUuid: "" };
}

export const GetPostRequest = {
  encode(
    message: GetPostRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.postOwner !== "") {
      writer.uint32(10).string(message.postOwner);
    }
    if (message.postUuid !== "") {
      writer.uint32(18).string(message.postUuid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPostRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.postOwner = reader.string();
          break;
        case 2:
          message.postUuid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPostRequest {
    return {
      postOwner: isSet(object.postOwner) ? String(object.postOwner) : "",
      postUuid: isSet(object.postUuid) ? String(object.postUuid) : "",
    };
  },

  toJSON(message: GetPostRequest): unknown {
    const obj: any = {};
    message.postOwner !== undefined && (obj.postOwner = message.postOwner);
    message.postUuid !== undefined && (obj.postUuid = message.postUuid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPostRequest>, I>>(
    object: I
  ): GetPostRequest {
    const message = createBaseGetPostRequest();
    message.postOwner = object.postOwner ?? "";
    message.postUuid = object.postUuid ?? "";
    return message;
  },
};

function createBaseGetPostResponse(): GetPostResponse {
  return { post: undefined };
}

export const GetPostResponse = {
  encode(
    message: GetPostResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.post !== undefined) {
      Post.encode(message.post, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPostResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.post = Post.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPostResponse {
    return {
      post: isSet(object.post) ? Post.fromJSON(object.post) : undefined,
    };
  },

  toJSON(message: GetPostResponse): unknown {
    const obj: any = {};
    message.post !== undefined &&
      (obj.post = message.post ? Post.toJSON(message.post) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPostResponse>, I>>(
    object: I
  ): GetPostResponse {
    const message = createBaseGetPostResponse();
    message.post =
      object.post !== undefined && object.post !== null
        ? Post.fromPartial(object.post)
        : undefined;
    return message;
  },
};

function createBaseListUserPostsRequest(): ListUserPostsRequest {
  return { owner: "", pagination: undefined };
}

export const ListUserPostsRequest = {
  encode(
    message: ListUserPostsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserPostsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserPostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserPostsRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: ListUserPostsRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUserPostsRequest>, I>>(
    object: I
  ): ListUserPostsRequest {
    const message = createBaseListUserPostsRequest();
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseListUserPostsResponse(): ListUserPostsResponse {
  return { posts: [], pagination: undefined };
}

export const ListUserPostsResponse = {
  encode(
    message: ListUserPostsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.posts) {
      Post.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListUserPostsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListUserPostsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.posts.push(Post.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListUserPostsResponse {
    return {
      posts: Array.isArray(object?.posts)
        ? object.posts.map((e: any) => Post.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: ListUserPostsResponse): unknown {
    const obj: any = {};
    if (message.posts) {
      obj.posts = message.posts.map((e) => (e ? Post.toJSON(e) : undefined));
    } else {
      obj.posts = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListUserPostsResponse>, I>>(
    object: I
  ): ListUserPostsResponse {
    const message = createBaseListUserPostsResponse();
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseModeratorsRequest(): ModeratorsRequest {
  return {};
}

export const ModeratorsRequest = {
  encode(
    _: ModeratorsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeratorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeratorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ModeratorsRequest {
    return {};
  },

  toJSON(_: ModeratorsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeratorsRequest>, I>>(
    _: I
  ): ModeratorsRequest {
    const message = createBaseModeratorsRequest();
    return message;
  },
};

function createBaseModeratorsResponse(): ModeratorsResponse {
  return { moderators: [] };
}

export const ModeratorsResponse = {
  encode(
    message: ModeratorsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.moderators) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeratorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModeratorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moderators.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeratorsResponse {
    return {
      moderators: Array.isArray(object?.moderators)
        ? object.moderators.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ModeratorsResponse): unknown {
    const obj: any = {};
    if (message.moderators) {
      obj.moderators = message.moderators.map((e) => e);
    } else {
      obj.moderators = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeratorsResponse>, I>>(
    object: I
  ): ModeratorsResponse {
    const message = createBaseModeratorsResponse();
    message.moderators = object.moderators?.map((e) => e) || [];
    return message;
  },
};

function createBaseListFollowedRequest(): ListFollowedRequest {
  return { owner: "", pagination: undefined };
}

export const ListFollowedRequest = {
  encode(
    message: ListFollowedRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFollowedRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFollowedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFollowedRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: ListFollowedRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListFollowedRequest>, I>>(
    object: I
  ): ListFollowedRequest {
    const message = createBaseListFollowedRequest();
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseListFollowedResponse(): ListFollowedResponse {
  return { followed: [], pagination: undefined };
}

export const ListFollowedResponse = {
  encode(
    message: ListFollowedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.followed) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListFollowedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFollowedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.followed.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFollowedResponse {
    return {
      followed: Array.isArray(object?.followed)
        ? object.followed.map((e: any) => String(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: ListFollowedResponse): unknown {
    const obj: any = {};
    if (message.followed) {
      obj.followed = message.followed.map((e) => e);
    } else {
      obj.followed = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListFollowedResponse>, I>>(
    object: I
  ): ListFollowedResponse {
    const message = createBaseListFollowedResponse();
    message.followed = object.followed?.map((e) => e) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  GetPost(request: GetPostRequest): Promise<GetPostResponse>;
  ListUserPosts(request: ListUserPostsRequest): Promise<ListUserPostsResponse>;
  Moderators(request: ModeratorsRequest): Promise<ModeratorsResponse>;
  ListFollowed(request: ListFollowedRequest): Promise<ListFollowedResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetPost = this.GetPost.bind(this);
    this.ListUserPosts = this.ListUserPosts.bind(this);
    this.Moderators = this.Moderators.bind(this);
    this.ListFollowed = this.ListFollowed.bind(this);
  }
  GetPost(request: GetPostRequest): Promise<GetPostResponse> {
    const data = GetPostRequest.encode(request).finish();
    const promise = this.rpc.request("community.Query", "GetPost", data);
    return promise.then((data) => GetPostResponse.decode(new _m0.Reader(data)));
  }

  ListUserPosts(request: ListUserPostsRequest): Promise<ListUserPostsResponse> {
    const data = ListUserPostsRequest.encode(request).finish();
    const promise = this.rpc.request("community.Query", "ListUserPosts", data);
    return promise.then((data) =>
      ListUserPostsResponse.decode(new _m0.Reader(data))
    );
  }

  Moderators(request: ModeratorsRequest): Promise<ModeratorsResponse> {
    const data = ModeratorsRequest.encode(request).finish();
    const promise = this.rpc.request("community.Query", "Moderators", data);
    return promise.then((data) =>
      ModeratorsResponse.decode(new _m0.Reader(data))
    );
  }

  ListFollowed(request: ListFollowedRequest): Promise<ListFollowedResponse> {
    const data = ListFollowedRequest.encode(request).finish();
    const promise = this.rpc.request("community.Query", "ListFollowed", data);
    return promise.then((data) =>
      ListFollowedResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
