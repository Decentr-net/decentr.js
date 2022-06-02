/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "sentinel.types.v1";

export interface Bandwidth {
  upload: string;
  download: string;
}

function createBaseBandwidth(): Bandwidth {
  return { upload: "", download: "" };
}

export const Bandwidth = {
  encode(
    message: Bandwidth,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.upload !== "") {
      writer.uint32(10).string(message.upload);
    }
    if (message.download !== "") {
      writer.uint32(18).string(message.download);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Bandwidth {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBandwidth();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upload = reader.string();
          break;
        case 2:
          message.download = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bandwidth {
    return {
      upload: isSet(object.upload) ? String(object.upload) : "",
      download: isSet(object.download) ? String(object.download) : "",
    };
  },

  toJSON(message: Bandwidth): unknown {
    const obj: any = {};
    message.upload !== undefined && (obj.upload = message.upload);
    message.download !== undefined && (obj.download = message.download);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bandwidth>, I>>(
    object: I
  ): Bandwidth {
    const message = createBaseBandwidth();
    message.upload = object.upload ?? "";
    message.download = object.download ?? "";
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
