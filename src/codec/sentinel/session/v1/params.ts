/* eslint-disable */
import { Duration } from "../../../google/protobuf/duration";
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "sentinel.session.v1";

export interface Params {
  inactiveDuration?: Duration;
  proofVerificationEnabled: boolean;
}

function createBaseParams(): Params {
  return { inactiveDuration: undefined, proofVerificationEnabled: false };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inactiveDuration !== undefined) {
      Duration.encode(
        message.inactiveDuration,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.proofVerificationEnabled === true) {
      writer.uint32(16).bool(message.proofVerificationEnabled);
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
          message.inactiveDuration = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.proofVerificationEnabled = reader.bool();
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
      inactiveDuration: isSet(object.inactiveDuration)
        ? Duration.fromJSON(object.inactiveDuration)
        : undefined,
      proofVerificationEnabled: isSet(object.proofVerificationEnabled)
        ? Boolean(object.proofVerificationEnabled)
        : false,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.inactiveDuration !== undefined &&
      (obj.inactiveDuration = message.inactiveDuration
        ? Duration.toJSON(message.inactiveDuration)
        : undefined);
    message.proofVerificationEnabled !== undefined &&
      (obj.proofVerificationEnabled = message.proofVerificationEnabled);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.inactiveDuration =
      object.inactiveDuration !== undefined && object.inactiveDuration !== null
        ? Duration.fromPartial(object.inactiveDuration)
        : undefined;
    message.proofVerificationEnabled = object.proofVerificationEnabled ?? false;
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
