/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  Status,
  statusFromJSON,
  statusToJSON,
} from "../../../sentinel/types/v1/status";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "sentinel.node.v1";

/** MsgRegisterRequest defines the SDK message for registering a node */
export interface MsgRegisterRequest {
  from: string;
  provider: string;
  price: Coin[];
  remoteUrl: string;
}

/** MsgUpdateRequest defines the SDK message for updating a node */
export interface MsgUpdateRequest {
  from: string;
  provider: string;
  price: Coin[];
  remoteUrl: string;
}

/**
 * MsgSetStatusRequest defines the SDK message for modifying the status of a
 * node
 */
export interface MsgSetStatusRequest {
  from: string;
  status: Status;
}

/** MsgRegisterResponse defines the response of message MsgRegisterRequest */
export interface MsgRegisterResponse {}

/** MsgUpdateResponse defines the response of message MsgUpdateRequest */
export interface MsgUpdateResponse {}

/** MsgSetStatusResponse defines the response of message MsgSetStatusRequest */
export interface MsgSetStatusResponse {}

function createBaseMsgRegisterRequest(): MsgRegisterRequest {
  return { from: "", provider: "", price: [], remoteUrl: "" };
}

export const MsgRegisterRequest = {
  encode(
    message: MsgRegisterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    for (const v of message.price) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.remoteUrl !== "") {
      writer.uint32(34).string(message.remoteUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        case 3:
          message.price.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.remoteUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      price: Array.isArray(object?.price)
        ? object.price.map((e: any) => Coin.fromJSON(e))
        : [],
      remoteUrl: isSet(object.remoteUrl) ? String(object.remoteUrl) : "",
    };
  },

  toJSON(message: MsgRegisterRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.provider !== undefined && (obj.provider = message.provider);
    if (message.price) {
      obj.price = message.price.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.price = [];
    }
    message.remoteUrl !== undefined && (obj.remoteUrl = message.remoteUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterRequest>, I>>(
    object: I
  ): MsgRegisterRequest {
    const message = createBaseMsgRegisterRequest();
    message.from = object.from ?? "";
    message.provider = object.provider ?? "";
    message.price = object.price?.map((e) => Coin.fromPartial(e)) || [];
    message.remoteUrl = object.remoteUrl ?? "";
    return message;
  },
};

function createBaseMsgUpdateRequest(): MsgUpdateRequest {
  return { from: "", provider: "", price: [], remoteUrl: "" };
}

export const MsgUpdateRequest = {
  encode(
    message: MsgUpdateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.provider !== "") {
      writer.uint32(18).string(message.provider);
    }
    for (const v of message.price) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.remoteUrl !== "") {
      writer.uint32(34).string(message.remoteUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.provider = reader.string();
          break;
        case 3:
          message.price.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.remoteUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      provider: isSet(object.provider) ? String(object.provider) : "",
      price: Array.isArray(object?.price)
        ? object.price.map((e: any) => Coin.fromJSON(e))
        : [],
      remoteUrl: isSet(object.remoteUrl) ? String(object.remoteUrl) : "",
    };
  },

  toJSON(message: MsgUpdateRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.provider !== undefined && (obj.provider = message.provider);
    if (message.price) {
      obj.price = message.price.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.price = [];
    }
    message.remoteUrl !== undefined && (obj.remoteUrl = message.remoteUrl);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRequest>, I>>(
    object: I
  ): MsgUpdateRequest {
    const message = createBaseMsgUpdateRequest();
    message.from = object.from ?? "";
    message.provider = object.provider ?? "";
    message.price = object.price?.map((e) => Coin.fromPartial(e)) || [];
    message.remoteUrl = object.remoteUrl ?? "";
    return message;
  },
};

function createBaseMsgSetStatusRequest(): MsgSetStatusRequest {
  return { from: "", status: 0 };
}

export const MsgSetStatusRequest = {
  encode(
    message: MsgSetStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetStatusRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: MsgSetStatusRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetStatusRequest>, I>>(
    object: I
  ): MsgSetStatusRequest {
    const message = createBaseMsgSetStatusRequest();
    message.from = object.from ?? "";
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseMsgRegisterResponse(): MsgRegisterResponse {
  return {};
}

export const MsgRegisterResponse = {
  encode(
    _: MsgRegisterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterResponse();
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

  fromJSON(_: any): MsgRegisterResponse {
    return {};
  },

  toJSON(_: MsgRegisterResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRegisterResponse>, I>>(
    _: I
  ): MsgRegisterResponse {
    const message = createBaseMsgRegisterResponse();
    return message;
  },
};

function createBaseMsgUpdateResponse(): MsgUpdateResponse {
  return {};
}

export const MsgUpdateResponse = {
  encode(
    _: MsgUpdateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateResponse();
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

  fromJSON(_: any): MsgUpdateResponse {
    return {};
  },

  toJSON(_: MsgUpdateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateResponse>, I>>(
    _: I
  ): MsgUpdateResponse {
    const message = createBaseMsgUpdateResponse();
    return message;
  },
};

function createBaseMsgSetStatusResponse(): MsgSetStatusResponse {
  return {};
}

export const MsgSetStatusResponse = {
  encode(
    _: MsgSetStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStatusResponse();
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

  fromJSON(_: any): MsgSetStatusResponse {
    return {};
  },

  toJSON(_: MsgSetStatusResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetStatusResponse>, I>>(
    _: I
  ): MsgSetStatusResponse {
    const message = createBaseMsgSetStatusResponse();
    return message;
  },
};

export interface MsgService {
  MsgRegister(request: MsgRegisterRequest): Promise<MsgRegisterResponse>;
  MsgUpdate(request: MsgUpdateRequest): Promise<MsgUpdateResponse>;
  MsgSetStatus(request: MsgSetStatusRequest): Promise<MsgSetStatusResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MsgRegister = this.MsgRegister.bind(this);
    this.MsgUpdate = this.MsgUpdate.bind(this);
    this.MsgSetStatus = this.MsgSetStatus.bind(this);
  }
  MsgRegister(request: MsgRegisterRequest): Promise<MsgRegisterResponse> {
    const data = MsgRegisterRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.node.v1.MsgService",
      "MsgRegister",
      data
    );
    return promise.then((data) =>
      MsgRegisterResponse.decode(new _m0.Reader(data))
    );
  }

  MsgUpdate(request: MsgUpdateRequest): Promise<MsgUpdateResponse> {
    const data = MsgUpdateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.node.v1.MsgService",
      "MsgUpdate",
      data
    );
    return promise.then((data) =>
      MsgUpdateResponse.decode(new _m0.Reader(data))
    );
  }

  MsgSetStatus(request: MsgSetStatusRequest): Promise<MsgSetStatusResponse> {
    const data = MsgSetStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.node.v1.MsgService",
      "MsgSetStatus",
      data
    );
    return promise.then((data) =>
      MsgSetStatusResponse.decode(new _m0.Reader(data))
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
