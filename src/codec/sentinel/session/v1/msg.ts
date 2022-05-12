/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Proof } from "../../../sentinel/session/v1/proof";

export const protobufPackage = "sentinel.session.v1";

/** MsgStartRequest defines the SDK message for starting a session */
export interface MsgStartRequest {
  from: string;
  id: Long;
  node: string;
}

/** MsgUpdateRequest defines the SDK message for updating a session */
export interface MsgUpdateRequest {
  from: string;
  proof?: Proof;
  signature: Uint8Array;
}

/** MsgEndRequest defines the SDK message for ending a session */
export interface MsgEndRequest {
  from: string;
  id: Long;
  rating: Long;
}

/** MsgStartResponse defines the response of message MsgStartRequest */
export interface MsgStartResponse {}

/** MsgUpdateResponse defines the response of message MsgUpdateRequest */
export interface MsgUpdateResponse {}

/** MsgEndResponse defines the response of message MsgEndRequest */
export interface MsgEndResponse {}

function createBaseMsgStartRequest(): MsgStartRequest {
  return { from: "", id: Long.UZERO, node: "" };
}

export const MsgStartRequest = {
  encode(
    message: MsgStartRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.node !== "") {
      writer.uint32(26).string(message.node);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartRequest();
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
          message.node = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStartRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      node: isSet(object.node) ? String(object.node) : "",
    };
  },

  toJSON(message: MsgStartRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.node !== undefined && (obj.node = message.node);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartRequest>, I>>(
    object: I
  ): MsgStartRequest {
    const message = createBaseMsgStartRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.node = object.node ?? "";
    return message;
  },
};

function createBaseMsgUpdateRequest(): MsgUpdateRequest {
  return { from: "", proof: undefined, signature: new Uint8Array() };
}

export const MsgUpdateRequest = {
  encode(
    message: MsgUpdateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(26).bytes(message.signature);
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
          message.proof = Proof.decode(reader, reader.uint32());
          break;
        case 3:
          message.signature = reader.bytes();
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
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
      signature: isSet(object.signature)
        ? bytesFromBase64(object.signature)
        : new Uint8Array(),
    };
  },

  toJSON(message: MsgUpdateRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.proof !== undefined &&
      (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateRequest>, I>>(
    object: I
  ): MsgUpdateRequest {
    const message = createBaseMsgUpdateRequest();
    message.from = object.from ?? "";
    message.proof =
      object.proof !== undefined && object.proof !== null
        ? Proof.fromPartial(object.proof)
        : undefined;
    message.signature = object.signature ?? new Uint8Array();
    return message;
  },
};

function createBaseMsgEndRequest(): MsgEndRequest {
  return { from: "", id: Long.UZERO, rating: Long.UZERO };
}

export const MsgEndRequest = {
  encode(
    message: MsgEndRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    if (!message.id.isZero()) {
      writer.uint32(16).uint64(message.id);
    }
    if (!message.rating.isZero()) {
      writer.uint32(24).uint64(message.rating);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEndRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEndRequest();
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
          message.rating = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEndRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      rating: isSet(object.rating)
        ? Long.fromString(object.rating)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgEndRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.rating !== undefined &&
      (obj.rating = (message.rating || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEndRequest>, I>>(
    object: I
  ): MsgEndRequest {
    const message = createBaseMsgEndRequest();
    message.from = object.from ?? "";
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.rating =
      object.rating !== undefined && object.rating !== null
        ? Long.fromValue(object.rating)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgStartResponse(): MsgStartResponse {
  return {};
}

export const MsgStartResponse = {
  encode(
    _: MsgStartResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStartResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartResponse();
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

  fromJSON(_: any): MsgStartResponse {
    return {};
  },

  toJSON(_: MsgStartResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStartResponse>, I>>(
    _: I
  ): MsgStartResponse {
    const message = createBaseMsgStartResponse();
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

function createBaseMsgEndResponse(): MsgEndResponse {
  return {};
}

export const MsgEndResponse = {
  encode(
    _: MsgEndResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEndResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEndResponse();
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

  fromJSON(_: any): MsgEndResponse {
    return {};
  },

  toJSON(_: MsgEndResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEndResponse>, I>>(
    _: I
  ): MsgEndResponse {
    const message = createBaseMsgEndResponse();
    return message;
  },
};

export interface MsgService {
  MsgStart(request: MsgStartRequest): Promise<MsgStartResponse>;
  MsgUpdate(request: MsgUpdateRequest): Promise<MsgUpdateResponse>;
  MsgEnd(request: MsgEndRequest): Promise<MsgEndResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MsgStart = this.MsgStart.bind(this);
    this.MsgUpdate = this.MsgUpdate.bind(this);
    this.MsgEnd = this.MsgEnd.bind(this);
  }
  MsgStart(request: MsgStartRequest): Promise<MsgStartResponse> {
    const data = MsgStartRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.session.v1.MsgService",
      "MsgStart",
      data
    );
    return promise.then((data) =>
      MsgStartResponse.decode(new _m0.Reader(data))
    );
  }

  MsgUpdate(request: MsgUpdateRequest): Promise<MsgUpdateResponse> {
    const data = MsgUpdateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.session.v1.MsgService",
      "MsgUpdate",
      data
    );
    return promise.then((data) =>
      MsgUpdateResponse.decode(new _m0.Reader(data))
    );
  }

  MsgEnd(request: MsgEndRequest): Promise<MsgEndResponse> {
    const data = MsgEndRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.session.v1.MsgService",
      "MsgEnd",
      data
    );
    return promise.then((data) => MsgEndResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
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
