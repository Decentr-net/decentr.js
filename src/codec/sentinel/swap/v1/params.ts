/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "sentinel.swap.v1";

export interface Params {
  swapEnabled: boolean;
  swapDenom: string;
  approveBy: string;
}

function createBaseParams(): Params {
  return { swapEnabled: false, swapDenom: "", approveBy: "" };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.swapEnabled === true) {
      writer.uint32(8).bool(message.swapEnabled);
    }
    if (message.swapDenom !== "") {
      writer.uint32(18).string(message.swapDenom);
    }
    if (message.approveBy !== "") {
      writer.uint32(26).string(message.approveBy);
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
          message.swapEnabled = reader.bool();
          break;
        case 2:
          message.swapDenom = reader.string();
          break;
        case 3:
          message.approveBy = reader.string();
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
      swapEnabled: isSet(object.swapEnabled)
        ? Boolean(object.swapEnabled)
        : false,
      swapDenom: isSet(object.swapDenom) ? String(object.swapDenom) : "",
      approveBy: isSet(object.approveBy) ? String(object.approveBy) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.swapEnabled !== undefined &&
      (obj.swapEnabled = message.swapEnabled);
    message.swapDenom !== undefined && (obj.swapDenom = message.swapDenom);
    message.approveBy !== undefined && (obj.approveBy = message.approveBy);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.swapEnabled = object.swapEnabled ?? false;
    message.swapDenom = object.swapDenom ?? "";
    message.approveBy = object.approveBy ?? "";
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
