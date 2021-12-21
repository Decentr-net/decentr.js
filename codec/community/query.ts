/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
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

const baseGetPostRequest: object = { postOwner: "", postUuid: "" };

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
    const message = { ...baseGetPostRequest } as GetPostRequest;
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
    const message = { ...baseGetPostRequest } as GetPostRequest;
    message.postOwner =
      object.postOwner !== undefined && object.postOwner !== null
        ? String(object.postOwner)
        : "";
    message.postUuid =
      object.postUuid !== undefined && object.postUuid !== null
        ? String(object.postUuid)
        : "";
    return message;
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
    const message = { ...baseGetPostRequest } as GetPostRequest;
    message.postOwner = object.postOwner ?? "";
    message.postUuid = object.postUuid ?? "";
    return message;
  },
};

const baseGetPostResponse: object = {};

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
    const message = { ...baseGetPostResponse } as GetPostResponse;
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
    const message = { ...baseGetPostResponse } as GetPostResponse;
    message.post =
      object.post !== undefined && object.post !== null
        ? Post.fromJSON(object.post)
        : undefined;
    return message;
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
    const message = { ...baseGetPostResponse } as GetPostResponse;
    message.post =
      object.post !== undefined && object.post !== null
        ? Post.fromPartial(object.post)
        : undefined;
    return message;
  },
};

const baseListUserPostsRequest: object = { owner: "" };

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
    const message = { ...baseListUserPostsRequest } as ListUserPostsRequest;
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
    const message = { ...baseListUserPostsRequest } as ListUserPostsRequest;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
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
    const message = { ...baseListUserPostsRequest } as ListUserPostsRequest;
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseListUserPostsResponse: object = {};

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
    const message = { ...baseListUserPostsResponse } as ListUserPostsResponse;
    message.posts = [];
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
    const message = { ...baseListUserPostsResponse } as ListUserPostsResponse;
    message.posts = (object.posts ?? []).map((e: any) => Post.fromJSON(e));
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
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
    const message = { ...baseListUserPostsResponse } as ListUserPostsResponse;
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseModeratorsRequest: object = {};

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
    const message = { ...baseModeratorsRequest } as ModeratorsRequest;
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
    const message = { ...baseModeratorsRequest } as ModeratorsRequest;
    return message;
  },

  toJSON(_: ModeratorsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeratorsRequest>, I>>(
    _: I
  ): ModeratorsRequest {
    const message = { ...baseModeratorsRequest } as ModeratorsRequest;
    return message;
  },
};

const baseModeratorsResponse: object = { moderators: "" };

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
    const message = { ...baseModeratorsResponse } as ModeratorsResponse;
    message.moderators = [];
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
    const message = { ...baseModeratorsResponse } as ModeratorsResponse;
    message.moderators = (object.moderators ?? []).map((e: any) => String(e));
    return message;
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
    const message = { ...baseModeratorsResponse } as ModeratorsResponse;
    message.moderators = object.moderators?.map((e) => e) || [];
    return message;
  },
};

const baseListFollowedRequest: object = { owner: "" };

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
    const message = { ...baseListFollowedRequest } as ListFollowedRequest;
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
    const message = { ...baseListFollowedRequest } as ListFollowedRequest;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
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
    const message = { ...baseListFollowedRequest } as ListFollowedRequest;
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseListFollowedResponse: object = { followed: "" };

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
    const message = { ...baseListFollowedResponse } as ListFollowedResponse;
    message.followed = [];
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
    const message = { ...baseListFollowedResponse } as ListFollowedResponse;
    message.followed = (object.followed ?? []).map((e: any) => String(e));
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
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
    const message = { ...baseListFollowedResponse } as ListFollowedResponse;
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
