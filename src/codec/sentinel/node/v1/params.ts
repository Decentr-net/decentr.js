/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Duration } from "../../../google/protobuf/duration";
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "sentinel.node.v1";

export interface Params {
  deposit?: Coin;
  inactiveDuration?: Duration;
}

function createBaseParams(): Params {
  return { deposit: undefined, inactiveDuration: undefined };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.deposit !== undefined) {
      Coin.encode(message.deposit, writer.uint32(10).fork()).ldelim();
    }
    if (message.inactiveDuration !== undefined) {
      Duration.encode(
        message.inactiveDuration,
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
          message.deposit = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.inactiveDuration = Duration.decode(reader, reader.uint32());
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
      deposit: isSet(object.deposit)
        ? Coin.fromJSON(object.deposit)
        : undefined,
      inactiveDuration: isSet(object.inactiveDuration)
        ? Duration.fromJSON(object.inactiveDuration)
        : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.deposit !== undefined &&
      (obj.deposit = message.deposit
        ? Coin.toJSON(message.deposit)
        : undefined);
    message.inactiveDuration !== undefined &&
      (obj.inactiveDuration = message.inactiveDuration
        ? Duration.toJSON(message.inactiveDuration)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.deposit =
      object.deposit !== undefined && object.deposit !== null
        ? Coin.fromPartial(object.deposit)
        : undefined;
    message.inactiveDuration =
      object.inactiveDuration !== undefined && object.inactiveDuration !== null
        ? Duration.fromPartial(object.inactiveDuration)
        : undefined;
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
