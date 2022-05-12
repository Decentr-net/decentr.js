/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Bandwidth } from "../../../sentinel/types/v1/bandwidth";
import {
  Status,
  statusFromJSON,
  statusToJSON,
} from "../../../sentinel/types/v1/status";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "sentinel.session.v1";

export interface Session {
  id: Long;
  subscription: Long;
  node: string;
  address: string;
  duration?: Duration;
  bandwidth?: Bandwidth;
  status: Status;
  statusAt?: Date;
}

function createBaseSession(): Session {
  return {
    id: Long.UZERO,
    subscription: Long.UZERO,
    node: "",
    address: "",
    duration: undefined,
    bandwidth: undefined,
    status: 0,
    statusAt: undefined,
  };
}

export const Session = {
  encode(
    message: Session,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (!message.subscription.isZero()) {
      writer.uint32(16).uint64(message.subscription);
    }
    if (message.node !== "") {
      writer.uint32(26).string(message.node);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(42).fork()).ldelim();
    }
    if (message.bandwidth !== undefined) {
      Bandwidth.encode(message.bandwidth, writer.uint32(50).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.statusAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.statusAt),
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.subscription = reader.uint64() as Long;
          break;
        case 3:
          message.node = reader.string();
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.bandwidth = Bandwidth.decode(reader, reader.uint32());
          break;
        case 7:
          message.status = reader.int32() as any;
          break;
        case 8:
          message.statusAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      subscription: isSet(object.subscription)
        ? Long.fromString(object.subscription)
        : Long.UZERO,
      node: isSet(object.node) ? String(object.node) : "",
      address: isSet(object.address) ? String(object.address) : "",
      duration: isSet(object.duration)
        ? Duration.fromJSON(object.duration)
        : undefined,
      bandwidth: isSet(object.bandwidth)
        ? Bandwidth.fromJSON(object.bandwidth)
        : undefined,
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      statusAt: isSet(object.statusAt)
        ? fromJsonTimestamp(object.statusAt)
        : undefined,
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.subscription !== undefined &&
      (obj.subscription = (message.subscription || Long.UZERO).toString());
    message.node !== undefined && (obj.node = message.node);
    message.address !== undefined && (obj.address = message.address);
    message.duration !== undefined &&
      (obj.duration = message.duration
        ? Duration.toJSON(message.duration)
        : undefined);
    message.bandwidth !== undefined &&
      (obj.bandwidth = message.bandwidth
        ? Bandwidth.toJSON(message.bandwidth)
        : undefined);
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    message.statusAt !== undefined &&
      (obj.statusAt = message.statusAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.subscription =
      object.subscription !== undefined && object.subscription !== null
        ? Long.fromValue(object.subscription)
        : Long.UZERO;
    message.node = object.node ?? "";
    message.address = object.address ?? "";
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.bandwidth =
      object.bandwidth !== undefined && object.bandwidth !== null
        ? Bandwidth.fromPartial(object.bandwidth)
        : undefined;
    message.status = object.status ?? 0;
    message.statusAt = object.statusAt ?? undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
