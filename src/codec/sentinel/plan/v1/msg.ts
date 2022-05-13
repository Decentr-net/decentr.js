/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import {
  Status,
  statusFromJSON,
  statusToJSON,
} from "../../../sentinel/types/v1/status";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "sentinel.plan.v1";

/** MsgAddRequest defines the SDK message for adding a plan */
export interface MsgAddRequest {
  from: string;
  price: Coin[];
  validity?: Duration;
  bytes: string;
}

/**
 * MsgSetStatusRequest defines the SDK message for modifying the status of a
 * plan
 */
export interface MsgSetStatusRequest {
  from: string;
  id: Long;
  status: Status;
}

/** MsgAddNodeRequest defines the SDK message for adding a node to a plan */
export interface MsgAddNodeRequest {
  from: string;
  id: Long;
  address: string;
}

/** MsgRemoveNodeRequest defines the SDK message for removing a node from a plan */
export interface MsgRemoveNodeRequest {
  from: string;
  id: Long;
  address: string;
}

/** MsgAddResponse defines the response of message MsgRegisterRequest */
export interface MsgAddResponse {}

/** MsgSetStatusResponse defines the response of message MsgSetStatusRequest */
export interface MsgSetStatusResponse {}

/** MsgAddNodeResponse defines the response of message MsgAddNodeRequest */
export interface MsgAddNodeResponse {}

/** MsgRemoveNodeResponse defines the response of message MsgRemoveNodeRequest */
export interface MsgRemoveNodeResponse {}

function createBaseMsgAddRequest(): MsgAddRequest {
  return { from: "", price: [], validity: undefined, bytes: "" };
}

export const MsgAddRequest = {
  encode(
    message: MsgAddRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    for (const v of message.price) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.validity !== undefined) {
      Duration.encode(message.validity, writer.uint32(26).fork()).ldelim();
    }
    if (message.bytes !== "") {
      writer.uint32(34).string(message.bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.price.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.validity = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.bytes = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      price: Array.isArray(object?.price)
        ? object.price.map((e: any) => Coin.fromJSON(e))
        : [],
      validity: isSet(object.validity)
        ? Duration.fromJSON(object.validity)
        : undefined,
      bytes: isSet(object.bytes) ? String(object.bytes) : "",
    };
  },

  toJSON(message: MsgAddRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    if (message.price) {
      obj.price = message.price.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.price = [];
    }
    message.validity !== undefined &&
      (obj.validity = message.validity
        ? Duration.toJSON(message.validity)
        : undefined);
    message.bytes !== undefined && (obj.bytes = message.bytes);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddRequest>, I>>(
    object: I
  ): MsgAddRequest {
    const message = createBaseMsgAddRequest();
    message.from = object.from ?? "";
    message.price = object.price?.map((e) => Coin.fromPartial(e)) || [];
    message.validity =
      object.validity !== undefined && object.validity !== null
        ? Duration.fromPartial(object.validity)
        : undefined;
    message.bytes = object.bytes ?? "";
    return message;
  },
};

function createBaseMsgSetStatusRequest(): MsgSetStatusRequest {
  return { from: "", id: Long.UZERO, status: 0 };
}

export const MsgSetStatusRequest = {
  encode(
    message: MsgSetStatusRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
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
          message.id = reader.uint64() as Long;
          break;
        case 3:
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
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: MsgSetStatusRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetStatusRequest>, I>>(
    object: I
  ): MsgSetStatusRequest {
    const message = createBaseMsgSetStatusRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseMsgAddNodeRequest(): MsgAddNodeRequest {
  return { from: "", id: Long.UZERO, address: "" };
}

export const MsgAddNodeRequest = {
  encode(
    message: MsgAddNodeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddNodeRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgAddNodeRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddNodeRequest>, I>>(
    object: I
  ): MsgAddNodeRequest {
    const message = createBaseMsgAddNodeRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgRemoveNodeRequest(): MsgRemoveNodeRequest {
  return { from: "", id: Long.UZERO, address: "" };
}

export const MsgRemoveNodeRequest = {
  encode(
    message: MsgRemoveNodeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRemoveNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRemoveNodeRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgRemoveNodeRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveNodeRequest>, I>>(
    object: I
  ): MsgRemoveNodeRequest {
    const message = createBaseMsgRemoveNodeRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgAddResponse(): MsgAddResponse {
  return {};
}

export const MsgAddResponse = {
  encode(
    _: MsgAddResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddResponse();
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

  fromJSON(_: any): MsgAddResponse {
    return {};
  },

  toJSON(_: MsgAddResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddResponse>, I>>(
    _: I
  ): MsgAddResponse {
    const message = createBaseMsgAddResponse();
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

function createBaseMsgAddNodeResponse(): MsgAddNodeResponse {
  return {};
}

export const MsgAddNodeResponse = {
  encode(
    _: MsgAddNodeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddNodeResponse();
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

  fromJSON(_: any): MsgAddNodeResponse {
    return {};
  },

  toJSON(_: MsgAddNodeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddNodeResponse>, I>>(
    _: I
  ): MsgAddNodeResponse {
    const message = createBaseMsgAddNodeResponse();
    return message;
  },
};

function createBaseMsgRemoveNodeResponse(): MsgRemoveNodeResponse {
  return {};
}

export const MsgRemoveNodeResponse = {
  encode(
    _: MsgRemoveNodeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgRemoveNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveNodeResponse();
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

  fromJSON(_: any): MsgRemoveNodeResponse {
    return {};
  },

  toJSON(_: MsgRemoveNodeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRemoveNodeResponse>, I>>(
    _: I
  ): MsgRemoveNodeResponse {
    const message = createBaseMsgRemoveNodeResponse();
    return message;
  },
};

export interface MsgService {
  MsgAdd(request: MsgAddRequest): Promise<MsgAddResponse>;
  MsgSetStatus(request: MsgSetStatusRequest): Promise<MsgSetStatusResponse>;
  MsgAddNode(request: MsgAddNodeRequest): Promise<MsgAddNodeResponse>;
  MsgRemoveNode(request: MsgRemoveNodeRequest): Promise<MsgRemoveNodeResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MsgAdd = this.MsgAdd.bind(this);
    this.MsgSetStatus = this.MsgSetStatus.bind(this);
    this.MsgAddNode = this.MsgAddNode.bind(this);
    this.MsgRemoveNode = this.MsgRemoveNode.bind(this);
  }
  MsgAdd(request: MsgAddRequest): Promise<MsgAddResponse> {
    const data = MsgAddRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.MsgService",
      "MsgAdd",
      data
    );
    return promise.then((data) => MsgAddResponse.decode(new _m0.Reader(data)));
  }

  MsgSetStatus(request: MsgSetStatusRequest): Promise<MsgSetStatusResponse> {
    const data = MsgSetStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.MsgService",
      "MsgSetStatus",
      data
    );
    return promise.then((data) =>
      MsgSetStatusResponse.decode(new _m0.Reader(data))
    );
  }

  MsgAddNode(request: MsgAddNodeRequest): Promise<MsgAddNodeResponse> {
    const data = MsgAddNodeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.MsgService",
      "MsgAddNode",
      data
    );
    return promise.then((data) =>
      MsgAddNodeResponse.decode(new _m0.Reader(data))
    );
  }

  MsgRemoveNode(request: MsgRemoveNodeRequest): Promise<MsgRemoveNodeResponse> {
    const data = MsgRemoveNodeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.MsgService",
      "MsgRemoveNode",
      data
    );
    return promise.then((data) =>
      MsgRemoveNodeResponse.decode(new _m0.Reader(data))
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
