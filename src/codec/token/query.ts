/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecProto } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "token";

export interface BalanceRequest {
  address: string;
}

export interface BalanceResponse {
  balance?: DecProto;
}

const baseBalanceRequest: object = { address: "" };

export const BalanceRequest = {
  encode(
    message: BalanceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBalanceRequest } as BalanceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BalanceRequest {
    const message = { ...baseBalanceRequest } as BalanceRequest;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: BalanceRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BalanceRequest>, I>>(
    object: I
  ): BalanceRequest {
    const message = { ...baseBalanceRequest } as BalanceRequest;
    message.address = object.address ?? "";
    return message;
  },
};

const baseBalanceResponse: object = {};

export const BalanceResponse = {
  encode(
    message: BalanceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.balance !== undefined) {
      DecProto.encode(message.balance, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalanceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBalanceResponse } as BalanceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = DecProto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BalanceResponse {
    const message = { ...baseBalanceResponse } as BalanceResponse;
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? DecProto.fromJSON(object.balance)
        : undefined;
    return message;
  },

  toJSON(message: BalanceResponse): unknown {
    const obj: any = {};
    message.balance !== undefined &&
      (obj.balance = message.balance
        ? DecProto.toJSON(message.balance)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BalanceResponse>, I>>(
    object: I
  ): BalanceResponse {
    const message = { ...baseBalanceResponse } as BalanceResponse;
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? DecProto.fromPartial(object.balance)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  Balance(request: BalanceRequest): Promise<BalanceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Balance = this.Balance.bind(this);
  }
  Balance(request: BalanceRequest): Promise<BalanceResponse> {
    const data = BalanceRequest.encode(request).finish();
    const promise = this.rpc.request("token.Query", "Balance", data);
    return promise.then((data) => BalanceResponse.decode(new _m0.Reader(data)));
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
