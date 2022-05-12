/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { Deposit } from "../../../sentinel/deposit/v1/deposit";

export const protobufPackage = "sentinel.deposit.v1";

export interface QueryDepositsRequest {
  pagination?: PageRequest;
}

export interface QueryDepositRequest {
  address: string;
}

export interface QueryDepositsResponse {
  deposits: Deposit[];
  pagination?: PageResponse;
}

export interface QueryDepositResponse {
  deposit?: Deposit;
}

function createBaseQueryDepositsRequest(): QueryDepositsRequest {
  return { pagination: undefined };
}

export const QueryDepositsRequest = {
  encode(
    message: QueryDepositsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDepositsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDepositsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDepositsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositsRequest>, I>>(
    object: I
  ): QueryDepositsRequest {
    const message = createBaseQueryDepositsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDepositRequest(): QueryDepositRequest {
  return { address: "" };
}

export const QueryDepositRequest = {
  encode(
    message: QueryDepositRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositRequest();
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

  fromJSON(object: any): QueryDepositRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryDepositRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositRequest>, I>>(
    object: I
  ): QueryDepositRequest {
    const message = createBaseQueryDepositRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryDepositsResponse(): QueryDepositsResponse {
  return { deposits: [], pagination: undefined };
}

export const QueryDepositsResponse = {
  encode(
    message: QueryDepositsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.deposits) {
      Deposit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDepositsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(Deposit.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDepositsResponse {
    return {
      deposits: Array.isArray(object?.deposits)
        ? object.deposits.map((e: any) => Deposit.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDepositsResponse): unknown {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map((e) =>
        e ? Deposit.toJSON(e) : undefined
      );
    } else {
      obj.deposits = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositsResponse>, I>>(
    object: I
  ): QueryDepositsResponse {
    const message = createBaseQueryDepositsResponse();
    message.deposits =
      object.deposits?.map((e) => Deposit.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDepositResponse(): QueryDepositResponse {
  return { deposit: undefined };
}

export const QueryDepositResponse = {
  encode(
    message: QueryDepositResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.deposit !== undefined) {
      Deposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposit = Deposit.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDepositResponse {
    return {
      deposit: isSet(object.deposit)
        ? Deposit.fromJSON(object.deposit)
        : undefined,
    };
  },

  toJSON(message: QueryDepositResponse): unknown {
    const obj: any = {};
    message.deposit !== undefined &&
      (obj.deposit = message.deposit
        ? Deposit.toJSON(message.deposit)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDepositResponse>, I>>(
    object: I
  ): QueryDepositResponse {
    const message = createBaseQueryDepositResponse();
    message.deposit =
      object.deposit !== undefined && object.deposit !== null
        ? Deposit.fromPartial(object.deposit)
        : undefined;
    return message;
  },
};

export interface QueryService {
  QueryDeposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  QueryDeposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.QueryDeposits = this.QueryDeposits.bind(this);
    this.QueryDeposit = this.QueryDeposit.bind(this);
  }
  QueryDeposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.deposit.v1.QueryService",
      "QueryDeposits",
      data
    );
    return promise.then((data) =>
      QueryDepositsResponse.decode(new _m0.Reader(data))
    );
  }

  QueryDeposit(request: QueryDepositRequest): Promise<QueryDepositResponse> {
    const data = QueryDepositRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.deposit.v1.QueryService",
      "QueryDeposit",
      data
    );
    return promise.then((data) =>
      QueryDepositResponse.decode(new _m0.Reader(data))
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
