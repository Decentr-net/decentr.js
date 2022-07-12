/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "sentinel.subscription.v1";

/** MsgSubscribeToNodeRequest defines the SDK message for subscribing to a node */
export interface MsgSubscribeToNodeRequest {
  from: string;
  address: string;
  deposit?: Coin;
}

/** MsgSubscribeToPlanRequest defines the SDK message for subscribing to a plan */
export interface MsgSubscribeToPlanRequest {
  from: string;
  id: Long;
  denom: string;
}

/** MsgCancelRequest defines the SDK message for cancelling a subscription */
export interface MsgCancelRequest {
  from: string;
  id: Long;
}

/** MsgAddQuotaRequest defines the SDK message for adding the quota to an address */
export interface MsgAddQuotaRequest {
  from: string;
  id: Long;
  address: string;
  bytes: string;
}

/**
 * MsgUpdateQuotaRequest defines the SDK message for updating the quota of an
 * address
 */
export interface MsgUpdateQuotaRequest {
  from: string;
  id: Long;
  address: string;
  bytes: string;
}

/**
 * MsgSubscribeToNodeResponse defines the response of message
 * MsgSubscribeToNodeRequest
 */
export interface MsgSubscribeToNodeResponse {}

/**
 * MsgSubscribeToPlanResponse defines the response of message
 * MsgSubscribeToPlanRequest
 */
export interface MsgSubscribeToPlanResponse {}

/** MsgCancelResponse defines the response of message MsgCancelRequest */
export interface MsgCancelResponse {}

/** MsgAddQuotaResponse defines the response of message MsgAddQuotaRequest */
export interface MsgAddQuotaResponse {}

/** MsgUpdateQuotaResponse defines the response of message MsgUpdateQuotaRequest */
export interface MsgUpdateQuotaResponse {}

function createBaseMsgSubscribeToNodeRequest(): MsgSubscribeToNodeRequest {
  return { from: "", address: "", deposit: undefined };
}

export const MsgSubscribeToNodeRequest = {
  encode(
    message: MsgSubscribeToNodeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.deposit !== undefined) {
      Coin.encode(message.deposit, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubscribeToNodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubscribeToNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.deposit = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubscribeToNodeRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      address: isSet(object.address) ? String(object.address) : "",
      deposit: isSet(object.deposit)
        ? Coin.fromJSON(object.deposit)
        : undefined,
    };
  },

  toJSON(message: MsgSubscribeToNodeRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.address !== undefined && (obj.address = message.address);
    message.deposit !== undefined &&
      (obj.deposit = message.deposit
        ? Coin.toJSON(message.deposit)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubscribeToNodeRequest>, I>>(
    object: I
  ): MsgSubscribeToNodeRequest {
    const message = createBaseMsgSubscribeToNodeRequest();
    message.from = object.from ?? "";
    message.address = object.address ?? "";
    message.deposit =
      object.deposit !== undefined && object.deposit !== null
        ? Coin.fromPartial(object.deposit)
        : undefined;
    return message;
  },
};

function createBaseMsgSubscribeToPlanRequest(): MsgSubscribeToPlanRequest {
  return { from: "", id: Long.UZERO, denom: "" };
}

export const MsgSubscribeToPlanRequest = {
  encode(
    message: MsgSubscribeToPlanRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubscribeToPlanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubscribeToPlanRequest();
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
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubscribeToPlanRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: MsgSubscribeToPlanRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubscribeToPlanRequest>, I>>(
    object: I
  ): MsgSubscribeToPlanRequest {
    const message = createBaseMsgSubscribeToPlanRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseMsgCancelRequest(): MsgCancelRequest {
  return { from: "", id: Long.UZERO };
}

export const MsgCancelRequest = {
  encode(
    message: MsgCancelRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        case 2:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
    };
  },

  toJSON(message: MsgCancelRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelRequest>, I>>(
    object: I
  ): MsgCancelRequest {
    const message = createBaseMsgCancelRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgAddQuotaRequest(): MsgAddQuotaRequest {
  return { from: "", id: Long.UZERO, address: "", bytes: "" };
}

export const MsgAddQuotaRequest = {
  encode(
    message: MsgAddQuotaRequest,
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
    if (message.bytes !== "") {
      writer.uint32(34).string(message.bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddQuotaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddQuotaRequest();
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

  fromJSON(object: any): MsgAddQuotaRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      address: isSet(object.address) ? String(object.address) : "",
      bytes: isSet(object.bytes) ? String(object.bytes) : "",
    };
  },

  toJSON(message: MsgAddQuotaRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    message.bytes !== undefined && (obj.bytes = message.bytes);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddQuotaRequest>, I>>(
    object: I
  ): MsgAddQuotaRequest {
    const message = createBaseMsgAddQuotaRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.address = object.address ?? "";
    message.bytes = object.bytes ?? "";
    return message;
  },
};

function createBaseMsgUpdateQuotaRequest(): MsgUpdateQuotaRequest {
  return { from: "", id: Long.UZERO, address: "", bytes: "" };
}

export const MsgUpdateQuotaRequest = {
  encode(
    message: MsgUpdateQuotaRequest,
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
    if (message.bytes !== "") {
      writer.uint32(34).string(message.bytes);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateQuotaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateQuotaRequest();
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

  fromJSON(object: any): MsgUpdateQuotaRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      address: isSet(object.address) ? String(object.address) : "",
      bytes: isSet(object.bytes) ? String(object.bytes) : "",
    };
  },

  toJSON(message: MsgUpdateQuotaRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    message.bytes !== undefined && (obj.bytes = message.bytes);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateQuotaRequest>, I>>(
    object: I
  ): MsgUpdateQuotaRequest {
    const message = createBaseMsgUpdateQuotaRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.address = object.address ?? "";
    message.bytes = object.bytes ?? "";
    return message;
  },
};

function createBaseMsgSubscribeToNodeResponse(): MsgSubscribeToNodeResponse {
  return {};
}

export const MsgSubscribeToNodeResponse = {
  encode(
    _: MsgSubscribeToNodeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubscribeToNodeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubscribeToNodeResponse();
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

  fromJSON(_: any): MsgSubscribeToNodeResponse {
    return {};
  },

  toJSON(_: MsgSubscribeToNodeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubscribeToNodeResponse>, I>>(
    _: I
  ): MsgSubscribeToNodeResponse {
    const message = createBaseMsgSubscribeToNodeResponse();
    return message;
  },
};

function createBaseMsgSubscribeToPlanResponse(): MsgSubscribeToPlanResponse {
  return {};
}

export const MsgSubscribeToPlanResponse = {
  encode(
    _: MsgSubscribeToPlanResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubscribeToPlanResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubscribeToPlanResponse();
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

  fromJSON(_: any): MsgSubscribeToPlanResponse {
    return {};
  },

  toJSON(_: MsgSubscribeToPlanResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubscribeToPlanResponse>, I>>(
    _: I
  ): MsgSubscribeToPlanResponse {
    const message = createBaseMsgSubscribeToPlanResponse();
    return message;
  },
};

function createBaseMsgCancelResponse(): MsgCancelResponse {
  return {};
}

export const MsgCancelResponse = {
  encode(
    _: MsgCancelResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelResponse();
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

  fromJSON(_: any): MsgCancelResponse {
    return {};
  },

  toJSON(_: MsgCancelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelResponse>, I>>(
    _: I
  ): MsgCancelResponse {
    const message = createBaseMsgCancelResponse();
    return message;
  },
};

function createBaseMsgAddQuotaResponse(): MsgAddQuotaResponse {
  return {};
}

export const MsgAddQuotaResponse = {
  encode(
    _: MsgAddQuotaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddQuotaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddQuotaResponse();
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

  fromJSON(_: any): MsgAddQuotaResponse {
    return {};
  },

  toJSON(_: MsgAddQuotaResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAddQuotaResponse>, I>>(
    _: I
  ): MsgAddQuotaResponse {
    const message = createBaseMsgAddQuotaResponse();
    return message;
  },
};

function createBaseMsgUpdateQuotaResponse(): MsgUpdateQuotaResponse {
  return {};
}

export const MsgUpdateQuotaResponse = {
  encode(
    _: MsgUpdateQuotaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateQuotaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateQuotaResponse();
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

  fromJSON(_: any): MsgUpdateQuotaResponse {
    return {};
  },

  toJSON(_: MsgUpdateQuotaResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateQuotaResponse>, I>>(
    _: I
  ): MsgUpdateQuotaResponse {
    const message = createBaseMsgUpdateQuotaResponse();
    return message;
  },
};

export interface MsgService {
  MsgSubscribeToNode(
    request: MsgSubscribeToNodeRequest
  ): Promise<MsgSubscribeToNodeResponse>;
  MsgSubscribeToPlan(
    request: MsgSubscribeToPlanRequest
  ): Promise<MsgSubscribeToPlanResponse>;
  MsgCancel(request: MsgCancelRequest): Promise<MsgCancelResponse>;
  MsgAddQuota(request: MsgAddQuotaRequest): Promise<MsgAddQuotaResponse>;
  MsgUpdateQuota(
    request: MsgUpdateQuotaRequest
  ): Promise<MsgUpdateQuotaResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MsgSubscribeToNode = this.MsgSubscribeToNode.bind(this);
    this.MsgSubscribeToPlan = this.MsgSubscribeToPlan.bind(this);
    this.MsgCancel = this.MsgCancel.bind(this);
    this.MsgAddQuota = this.MsgAddQuota.bind(this);
    this.MsgUpdateQuota = this.MsgUpdateQuota.bind(this);
  }
  MsgSubscribeToNode(
    request: MsgSubscribeToNodeRequest
  ): Promise<MsgSubscribeToNodeResponse> {
    const data = MsgSubscribeToNodeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.MsgService",
      "MsgSubscribeToNode",
      data
    );
    return promise.then((data) =>
      MsgSubscribeToNodeResponse.decode(new _m0.Reader(data))
    );
  }

  MsgSubscribeToPlan(
    request: MsgSubscribeToPlanRequest
  ): Promise<MsgSubscribeToPlanResponse> {
    const data = MsgSubscribeToPlanRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.MsgService",
      "MsgSubscribeToPlan",
      data
    );
    return promise.then((data) =>
      MsgSubscribeToPlanResponse.decode(new _m0.Reader(data))
    );
  }

  MsgCancel(request: MsgCancelRequest): Promise<MsgCancelResponse> {
    const data = MsgCancelRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.MsgService",
      "MsgCancel",
      data
    );
    return promise.then((data) =>
      MsgCancelResponse.decode(new _m0.Reader(data))
    );
  }

  MsgAddQuota(request: MsgAddQuotaRequest): Promise<MsgAddQuotaResponse> {
    const data = MsgAddQuotaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.MsgService",
      "MsgAddQuota",
      data
    );
    return promise.then((data) =>
      MsgAddQuotaResponse.decode(new _m0.Reader(data))
    );
  }

  MsgUpdateQuota(
    request: MsgUpdateQuotaRequest
  ): Promise<MsgUpdateQuotaResponse> {
    const data = MsgUpdateQuotaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.MsgService",
      "MsgUpdateQuota",
      data
    );
    return promise.then((data) =>
      MsgUpdateQuotaResponse.decode(new _m0.Reader(data))
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
