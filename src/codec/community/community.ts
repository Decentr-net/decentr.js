/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "community";

export enum Category {
  CATEGORY_UNDEFINED = 0,
  CATEGORY_WORLD_NEWS = 1,
  CATEGORY_TRAVEL_AND_TOURISM = 2,
  CATEGORY_SCIENCE_AND_TECHNOLOGY = 3,
  CATEGORY_STRANGE_WORLD = 4,
  CATEGORY_ARTS_AND_ENTERTAINMENT = 5,
  CATEGORY_WRITERS_AND_WRITING = 6,
  CATEGORY_HEALTH_AND_FITNESS = 7,
  CATEGORY_CRYPTO_AND_BLOCKCHAIN = 8,
  CATEGORY_SPORTS = 9,
  UNRECOGNIZED = -1,
}

export function categoryFromJSON(object: any): Category {
  switch (object) {
    case 0:
    case "CATEGORY_UNDEFINED":
      return Category.CATEGORY_UNDEFINED;
    case 1:
    case "CATEGORY_WORLD_NEWS":
      return Category.CATEGORY_WORLD_NEWS;
    case 2:
    case "CATEGORY_TRAVEL_AND_TOURISM":
      return Category.CATEGORY_TRAVEL_AND_TOURISM;
    case 3:
    case "CATEGORY_SCIENCE_AND_TECHNOLOGY":
      return Category.CATEGORY_SCIENCE_AND_TECHNOLOGY;
    case 4:
    case "CATEGORY_STRANGE_WORLD":
      return Category.CATEGORY_STRANGE_WORLD;
    case 5:
    case "CATEGORY_ARTS_AND_ENTERTAINMENT":
      return Category.CATEGORY_ARTS_AND_ENTERTAINMENT;
    case 6:
    case "CATEGORY_WRITERS_AND_WRITING":
      return Category.CATEGORY_WRITERS_AND_WRITING;
    case 7:
    case "CATEGORY_HEALTH_AND_FITNESS":
      return Category.CATEGORY_HEALTH_AND_FITNESS;
    case 8:
    case "CATEGORY_CRYPTO_AND_BLOCKCHAIN":
      return Category.CATEGORY_CRYPTO_AND_BLOCKCHAIN;
    case 9:
    case "CATEGORY_SPORTS":
      return Category.CATEGORY_SPORTS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Category.UNRECOGNIZED;
  }
}

export function categoryToJSON(object: Category): string {
  switch (object) {
    case Category.CATEGORY_UNDEFINED:
      return "CATEGORY_UNDEFINED";
    case Category.CATEGORY_WORLD_NEWS:
      return "CATEGORY_WORLD_NEWS";
    case Category.CATEGORY_TRAVEL_AND_TOURISM:
      return "CATEGORY_TRAVEL_AND_TOURISM";
    case Category.CATEGORY_SCIENCE_AND_TECHNOLOGY:
      return "CATEGORY_SCIENCE_AND_TECHNOLOGY";
    case Category.CATEGORY_STRANGE_WORLD:
      return "CATEGORY_STRANGE_WORLD";
    case Category.CATEGORY_ARTS_AND_ENTERTAINMENT:
      return "CATEGORY_ARTS_AND_ENTERTAINMENT";
    case Category.CATEGORY_WRITERS_AND_WRITING:
      return "CATEGORY_WRITERS_AND_WRITING";
    case Category.CATEGORY_HEALTH_AND_FITNESS:
      return "CATEGORY_HEALTH_AND_FITNESS";
    case Category.CATEGORY_CRYPTO_AND_BLOCKCHAIN:
      return "CATEGORY_CRYPTO_AND_BLOCKCHAIN";
    case Category.CATEGORY_SPORTS:
      return "CATEGORY_SPORTS";
    default:
      return "UNKNOWN";
  }
}

export enum LikeWeight {
  LIKE_WEIGHT_ZERO = 0,
  LIKE_WEIGHT_UP = 1,
  LIKE_WEIGHT_DOWN = -1,
  UNRECOGNIZED = -1,
}

export function likeWeightFromJSON(object: any): LikeWeight {
  switch (object) {
    case 0:
    case "LIKE_WEIGHT_ZERO":
      return LikeWeight.LIKE_WEIGHT_ZERO;
    case 1:
    case "LIKE_WEIGHT_UP":
      return LikeWeight.LIKE_WEIGHT_UP;
    case -1:
    case "LIKE_WEIGHT_DOWN":
      return LikeWeight.LIKE_WEIGHT_DOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LikeWeight.UNRECOGNIZED;
  }
}

export function likeWeightToJSON(object: LikeWeight): string {
  switch (object) {
    case LikeWeight.LIKE_WEIGHT_ZERO:
      return "LIKE_WEIGHT_ZERO";
    case LikeWeight.LIKE_WEIGHT_UP:
      return "LIKE_WEIGHT_UP";
    case LikeWeight.LIKE_WEIGHT_DOWN:
      return "LIKE_WEIGHT_DOWN";
    default:
      return "UNKNOWN";
  }
}

export interface Params {
  moderators: string[];
  fixedGas?: FixedGasParams;
}

export interface FixedGasParams {
  createPost: Long;
  deletePost: Long;
  setLike: Long;
  follow: Long;
  unfollow: Long;
}

export interface Post {
  owner: string;
  uuid: string;
  title: string;
  previewImage: string;
  category: Category;
  text: string;
}

export interface Like {
  owner: string;
  postOwner: string;
  postUuid: string;
  weight: LikeWeight;
}

function createBaseParams(): Params {
  return { moderators: [], fixedGas: undefined };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.moderators) {
      writer.uint32(10).string(v!);
    }
    if (message.fixedGas !== undefined) {
      FixedGasParams.encode(
        message.fixedGas,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moderators.push(reader.string());
          break;
        case 2:
          message.fixedGas = FixedGasParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      moderators: Array.isArray(object?.moderators)
        ? object.moderators.map((e: any) => String(e))
        : [],
      fixedGas: isSet(object.fixedGas)
        ? FixedGasParams.fromJSON(object.fixedGas)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.moderators) {
      obj.moderators = message.moderators.map((e) => e);
    } else {
      obj.moderators = [];
    }
    message.fixedGas !== undefined &&
      (obj.fixedGas = message.fixedGas
        ? FixedGasParams.toJSON(message.fixedGas)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.moderators = object.moderators?.map((e) => e) || [];
    message.fixedGas =
      object.fixedGas !== undefined && object.fixedGas !== null
        ? FixedGasParams.fromPartial(object.fixedGas)
        : undefined;
    return message;
  },
};

function createBaseFixedGasParams(): FixedGasParams {
  return {
    createPost: Long.UZERO,
    deletePost: Long.UZERO,
    setLike: Long.UZERO,
    follow: Long.UZERO,
    unfollow: Long.UZERO,
  };
}

export const FixedGasParams = {
  encode(
    message: FixedGasParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.createPost.isZero()) {
      writer.uint32(8).uint64(message.createPost);
    }
    if (!message.deletePost.isZero()) {
      writer.uint32(16).uint64(message.deletePost);
    }
    if (!message.setLike.isZero()) {
      writer.uint32(24).uint64(message.setLike);
    }
    if (!message.follow.isZero()) {
      writer.uint32(32).uint64(message.follow);
    }
    if (!message.unfollow.isZero()) {
      writer.uint32(40).uint64(message.unfollow);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FixedGasParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFixedGasParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createPost = reader.uint64() as Long;
          break;
        case 2:
          message.deletePost = reader.uint64() as Long;
          break;
        case 3:
          message.setLike = reader.uint64() as Long;
          break;
        case 4:
          message.follow = reader.uint64() as Long;
          break;
        case 5:
          message.unfollow = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FixedGasParams {
    return {
      createPost: isSet(object.createPost)
        ? Long.fromString(object.createPost)
        : Long.UZERO,
      deletePost: isSet(object.deletePost)
        ? Long.fromString(object.deletePost)
        : Long.UZERO,
      setLike: isSet(object.setLike)
        ? Long.fromString(object.setLike)
        : Long.UZERO,
      follow: isSet(object.follow)
        ? Long.fromString(object.follow)
        : Long.UZERO,
      unfollow: isSet(object.unfollow)
        ? Long.fromString(object.unfollow)
        : Long.UZERO,
    };
  },

  toJSON(message: FixedGasParams): unknown {
    const obj: any = {};
    message.createPost !== undefined &&
      (obj.createPost = (message.createPost || Long.UZERO).toString());
    message.deletePost !== undefined &&
      (obj.deletePost = (message.deletePost || Long.UZERO).toString());
    message.setLike !== undefined &&
      (obj.setLike = (message.setLike || Long.UZERO).toString());
    message.follow !== undefined &&
      (obj.follow = (message.follow || Long.UZERO).toString());
    message.unfollow !== undefined &&
      (obj.unfollow = (message.unfollow || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FixedGasParams>, I>>(
    object: I
  ): FixedGasParams {
    const message = createBaseFixedGasParams();
    message.createPost =
      object.createPost !== undefined && object.createPost !== null
        ? Long.fromValue(object.createPost)
        : Long.UZERO;
    message.deletePost =
      object.deletePost !== undefined && object.deletePost !== null
        ? Long.fromValue(object.deletePost)
        : Long.UZERO;
    message.setLike =
      object.setLike !== undefined && object.setLike !== null
        ? Long.fromValue(object.setLike)
        : Long.UZERO;
    message.follow =
      object.follow !== undefined && object.follow !== null
        ? Long.fromValue(object.follow)
        : Long.UZERO;
    message.unfollow =
      object.unfollow !== undefined && object.unfollow !== null
        ? Long.fromValue(object.unfollow)
        : Long.UZERO;
    return message;
  },
};

function createBasePost(): Post {
  return {
    owner: "",
    uuid: "",
    title: "",
    previewImage: "",
    category: 0,
    text: "",
  };
}

export const Post = {
  encode(message: Post, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.uuid !== "") {
      writer.uint32(18).string(message.uuid);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.previewImage !== "") {
      writer.uint32(34).string(message.previewImage);
    }
    if (message.category !== 0) {
      writer.uint32(40).int32(message.category);
    }
    if (message.text !== "") {
      writer.uint32(50).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Post {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.uuid = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.previewImage = reader.string();
          break;
        case 5:
          message.category = reader.int32() as any;
          break;
        case 6:
          message.text = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Post {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      title: isSet(object.title) ? String(object.title) : "",
      previewImage: isSet(object.previewImage)
        ? String(object.previewImage)
        : "",
      category: isSet(object.category) ? categoryFromJSON(object.category) : 0,
      text: isSet(object.text) ? String(object.text) : "",
    };
  },

  toJSON(message: Post): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.title !== undefined && (obj.title = message.title);
    message.previewImage !== undefined &&
      (obj.previewImage = message.previewImage);
    message.category !== undefined &&
      (obj.category = categoryToJSON(message.category));
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Post>, I>>(object: I): Post {
    const message = createBasePost();
    message.owner = object.owner ?? "";
    message.uuid = object.uuid ?? "";
    message.title = object.title ?? "";
    message.previewImage = object.previewImage ?? "";
    message.category = object.category ?? 0;
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseLike(): Like {
  return { owner: "", postOwner: "", postUuid: "", weight: 0 };
}

export const Like = {
  encode(message: Like, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.postOwner !== "") {
      writer.uint32(18).string(message.postOwner);
    }
    if (message.postUuid !== "") {
      writer.uint32(26).string(message.postUuid);
    }
    if (message.weight !== 0) {
      writer.uint32(32).int32(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Like {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLike();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.postOwner = reader.string();
          break;
        case 3:
          message.postUuid = reader.string();
          break;
        case 4:
          message.weight = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Like {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      postOwner: isSet(object.postOwner) ? String(object.postOwner) : "",
      postUuid: isSet(object.postUuid) ? String(object.postUuid) : "",
      weight: isSet(object.weight) ? likeWeightFromJSON(object.weight) : 0,
    };
  },

  toJSON(message: Like): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.postOwner !== undefined && (obj.postOwner = message.postOwner);
    message.postUuid !== undefined && (obj.postUuid = message.postUuid);
    message.weight !== undefined &&
      (obj.weight = likeWeightToJSON(message.weight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Like>, I>>(object: I): Like {
    const message = createBaseLike();
    message.owner = object.owner ?? "";
    message.postOwner = object.postOwner ?? "";
    message.postUuid = object.postUuid ?? "";
    message.weight = object.weight ?? 0;
    return message;
  },
};

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
