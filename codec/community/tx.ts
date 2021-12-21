/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Post, Like } from "../community/community";

export const protobufPackage = "community";

export interface MsgCreatePost {
  post?: Post;
}

export interface MsgCreatePostResponse {}

export interface MsgDeletePost {
  postOwner: string;
  postUuid: string;
  owner: string;
}

export interface MsgDeletePostResponse {}

export interface MsgSetLike {
  like?: Like;
}

export interface MsgSetLikeResponse {}

export interface MsgFollow {
  owner: string;
  whom: string;
}

export interface MsgFollowResponse {}

export interface MsgUnfollow {
  owner: string;
  whom: string;
}

export interface MsgUnfollowResponse {}

const baseMsgCreatePost: object = {};

export const MsgCreatePost = {
  encode(
    message: MsgCreatePost,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.post !== undefined) {
      Post.encode(message.post, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePost {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePost } as MsgCreatePost;
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

  fromJSON(object: any): MsgCreatePost {
    const message = { ...baseMsgCreatePost } as MsgCreatePost;
    message.post =
      object.post !== undefined && object.post !== null
        ? Post.fromJSON(object.post)
        : undefined;
    return message;
  },

  toJSON(message: MsgCreatePost): unknown {
    const obj: any = {};
    message.post !== undefined &&
      (obj.post = message.post ? Post.toJSON(message.post) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePost>, I>>(
    object: I
  ): MsgCreatePost {
    const message = { ...baseMsgCreatePost } as MsgCreatePost;
    message.post =
      object.post !== undefined && object.post !== null
        ? Post.fromPartial(object.post)
        : undefined;
    return message;
  },
};

const baseMsgCreatePostResponse: object = {};

export const MsgCreatePostResponse = {
  encode(
    _: MsgCreatePostResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePostResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse;
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

  fromJSON(_: any): MsgCreatePostResponse {
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse;
    return message;
  },

  toJSON(_: MsgCreatePostResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePostResponse>, I>>(
    _: I
  ): MsgCreatePostResponse {
    const message = { ...baseMsgCreatePostResponse } as MsgCreatePostResponse;
    return message;
  },
};

const baseMsgDeletePost: object = { postOwner: "", postUuid: "", owner: "" };

export const MsgDeletePost = {
  encode(
    message: MsgDeletePost,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.postOwner !== "") {
      writer.uint32(10).string(message.postOwner);
    }
    if (message.postUuid !== "") {
      writer.uint32(18).string(message.postUuid);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeletePost {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeletePost } as MsgDeletePost;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.postOwner = reader.string();
          break;
        case 2:
          message.postUuid = reader.string();
          break;
        case 3:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeletePost {
    const message = { ...baseMsgDeletePost } as MsgDeletePost;
    message.postOwner =
      object.postOwner !== undefined && object.postOwner !== null
        ? String(object.postOwner)
        : "";
    message.postUuid =
      object.postUuid !== undefined && object.postUuid !== null
        ? String(object.postUuid)
        : "";
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    return message;
  },

  toJSON(message: MsgDeletePost): unknown {
    const obj: any = {};
    message.postOwner !== undefined && (obj.postOwner = message.postOwner);
    message.postUuid !== undefined && (obj.postUuid = message.postUuid);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeletePost>, I>>(
    object: I
  ): MsgDeletePost {
    const message = { ...baseMsgDeletePost } as MsgDeletePost;
    message.postOwner = object.postOwner ?? "";
    message.postUuid = object.postUuid ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

const baseMsgDeletePostResponse: object = {};

export const MsgDeletePostResponse = {
  encode(
    _: MsgDeletePostResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeletePostResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeletePostResponse } as MsgDeletePostResponse;
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

  fromJSON(_: any): MsgDeletePostResponse {
    const message = { ...baseMsgDeletePostResponse } as MsgDeletePostResponse;
    return message;
  },

  toJSON(_: MsgDeletePostResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeletePostResponse>, I>>(
    _: I
  ): MsgDeletePostResponse {
    const message = { ...baseMsgDeletePostResponse } as MsgDeletePostResponse;
    return message;
  },
};

const baseMsgSetLike: object = {};

export const MsgSetLike = {
  encode(
    message: MsgSetLike,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.like !== undefined) {
      Like.encode(message.like, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetLike {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetLike } as MsgSetLike;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.like = Like.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetLike {
    const message = { ...baseMsgSetLike } as MsgSetLike;
    message.like =
      object.like !== undefined && object.like !== null
        ? Like.fromJSON(object.like)
        : undefined;
    return message;
  },

  toJSON(message: MsgSetLike): unknown {
    const obj: any = {};
    message.like !== undefined &&
      (obj.like = message.like ? Like.toJSON(message.like) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetLike>, I>>(
    object: I
  ): MsgSetLike {
    const message = { ...baseMsgSetLike } as MsgSetLike;
    message.like =
      object.like !== undefined && object.like !== null
        ? Like.fromPartial(object.like)
        : undefined;
    return message;
  },
};

const baseMsgSetLikeResponse: object = {};

export const MsgSetLikeResponse = {
  encode(
    _: MsgSetLikeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetLikeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetLikeResponse } as MsgSetLikeResponse;
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

  fromJSON(_: any): MsgSetLikeResponse {
    const message = { ...baseMsgSetLikeResponse } as MsgSetLikeResponse;
    return message;
  },

  toJSON(_: MsgSetLikeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetLikeResponse>, I>>(
    _: I
  ): MsgSetLikeResponse {
    const message = { ...baseMsgSetLikeResponse } as MsgSetLikeResponse;
    return message;
  },
};

const baseMsgFollow: object = { owner: "", whom: "" };

export const MsgFollow = {
  encode(
    message: MsgFollow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.whom !== "") {
      writer.uint32(18).string(message.whom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgFollow } as MsgFollow;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.whom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFollow {
    const message = { ...baseMsgFollow } as MsgFollow;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.whom =
      object.whom !== undefined && object.whom !== null
        ? String(object.whom)
        : "";
    return message;
  },

  toJSON(message: MsgFollow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.whom !== undefined && (obj.whom = message.whom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFollow>, I>>(
    object: I
  ): MsgFollow {
    const message = { ...baseMsgFollow } as MsgFollow;
    message.owner = object.owner ?? "";
    message.whom = object.whom ?? "";
    return message;
  },
};

const baseMsgFollowResponse: object = {};

export const MsgFollowResponse = {
  encode(
    _: MsgFollowResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFollowResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgFollowResponse } as MsgFollowResponse;
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

  fromJSON(_: any): MsgFollowResponse {
    const message = { ...baseMsgFollowResponse } as MsgFollowResponse;
    return message;
  },

  toJSON(_: MsgFollowResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFollowResponse>, I>>(
    _: I
  ): MsgFollowResponse {
    const message = { ...baseMsgFollowResponse } as MsgFollowResponse;
    return message;
  },
};

const baseMsgUnfollow: object = { owner: "", whom: "" };

export const MsgUnfollow = {
  encode(
    message: MsgUnfollow,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.whom !== "") {
      writer.uint32(18).string(message.whom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfollow {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUnfollow } as MsgUnfollow;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.whom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUnfollow {
    const message = { ...baseMsgUnfollow } as MsgUnfollow;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.whom =
      object.whom !== undefined && object.whom !== null
        ? String(object.whom)
        : "";
    return message;
  },

  toJSON(message: MsgUnfollow): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.whom !== undefined && (obj.whom = message.whom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfollow>, I>>(
    object: I
  ): MsgUnfollow {
    const message = { ...baseMsgUnfollow } as MsgUnfollow;
    message.owner = object.owner ?? "";
    message.whom = object.whom ?? "";
    return message;
  },
};

const baseMsgUnfollowResponse: object = {};

export const MsgUnfollowResponse = {
  encode(
    _: MsgUnfollowResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnfollowResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUnfollowResponse } as MsgUnfollowResponse;
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

  fromJSON(_: any): MsgUnfollowResponse {
    const message = { ...baseMsgUnfollowResponse } as MsgUnfollowResponse;
    return message;
  },

  toJSON(_: MsgUnfollowResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnfollowResponse>, I>>(
    _: I
  ): MsgUnfollowResponse {
    const message = { ...baseMsgUnfollowResponse } as MsgUnfollowResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse>;
  DeletePost(request: MsgDeletePost): Promise<MsgDeletePostResponse>;
  SetLike(request: MsgSetLike): Promise<MsgSetLikeResponse>;
  Follow(request: MsgFollow): Promise<MsgFollowResponse>;
  Unfollow(request: MsgUnfollow): Promise<MsgUnfollowResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePost = this.CreatePost.bind(this);
    this.DeletePost = this.DeletePost.bind(this);
    this.SetLike = this.SetLike.bind(this);
    this.Follow = this.Follow.bind(this);
    this.Unfollow = this.Unfollow.bind(this);
  }
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse> {
    const data = MsgCreatePost.encode(request).finish();
    const promise = this.rpc.request("community.Msg", "CreatePost", data);
    return promise.then((data) =>
      MsgCreatePostResponse.decode(new _m0.Reader(data))
    );
  }

  DeletePost(request: MsgDeletePost): Promise<MsgDeletePostResponse> {
    const data = MsgDeletePost.encode(request).finish();
    const promise = this.rpc.request("community.Msg", "DeletePost", data);
    return promise.then((data) =>
      MsgDeletePostResponse.decode(new _m0.Reader(data))
    );
  }

  SetLike(request: MsgSetLike): Promise<MsgSetLikeResponse> {
    const data = MsgSetLike.encode(request).finish();
    const promise = this.rpc.request("community.Msg", "SetLike", data);
    return promise.then((data) =>
      MsgSetLikeResponse.decode(new _m0.Reader(data))
    );
  }

  Follow(request: MsgFollow): Promise<MsgFollowResponse> {
    const data = MsgFollow.encode(request).finish();
    const promise = this.rpc.request("community.Msg", "Follow", data);
    return promise.then((data) =>
      MsgFollowResponse.decode(new _m0.Reader(data))
    );
  }

  Unfollow(request: MsgUnfollow): Promise<MsgUnfollowResponse> {
    const data = MsgUnfollow.encode(request).finish();
    const promise = this.rpc.request("community.Msg", "Unfollow", data);
    return promise.then((data) =>
      MsgUnfollowResponse.decode(new _m0.Reader(data))
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
