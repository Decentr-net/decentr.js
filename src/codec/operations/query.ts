/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "operations";

export interface MinGasPriceRequest {}

export interface MinGasPriceResponse {
  minGasPrice?: DecCoin;
}

function createBaseMinGasPriceRequest(): MinGasPriceRequest {
  return {};
}

export const MinGasPriceRequest = {
  encode(
    _: MinGasPriceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MinGasPriceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinGasPriceRequest();
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

  fromJSON(_: any): MinGasPriceRequest {
    return {};
  },

  toJSON(_: MinGasPriceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MinGasPriceRequest>, I>>(
    _: I
  ): MinGasPriceRequest {
    const message = createBaseMinGasPriceRequest();
    return message;
  },
};

function createBaseMinGasPriceResponse(): MinGasPriceResponse {
  return { minGasPrice: undefined };
}

export const MinGasPriceResponse = {
  encode(
    message: MinGasPriceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.minGasPrice !== undefined) {
      DecCoin.encode(message.minGasPrice, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MinGasPriceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinGasPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minGasPrice = DecCoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MinGasPriceResponse {
    return {
      minGasPrice: isSet(object.minGasPrice)
        ? DecCoin.fromJSON(object.minGasPrice)
        : undefined,
    };
  },

  toJSON(message: MinGasPriceResponse): unknown {
    const obj: any = {};
    message.minGasPrice !== undefined &&
      (obj.minGasPrice = message.minGasPrice
        ? DecCoin.toJSON(message.minGasPrice)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MinGasPriceResponse>, I>>(
    object: I
  ): MinGasPriceResponse {
    const message = createBaseMinGasPriceResponse();
    message.minGasPrice =
      object.minGasPrice !== undefined && object.minGasPrice !== null
        ? DecCoin.fromPartial(object.minGasPrice)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** MinGasPrice returns set gas price */
  MinGasPrice(request: MinGasPriceRequest): Promise<MinGasPriceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MinGasPrice = this.MinGasPrice.bind(this);
  }
  MinGasPrice(request: MinGasPriceRequest): Promise<MinGasPriceResponse> {
    const data = MinGasPriceRequest.encode(request).finish();
    const promise = this.rpc.request("operations.Query", "MinGasPrice", data);
    return promise.then((data) =>
      MinGasPriceResponse.decode(new _m0.Reader(data))
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
