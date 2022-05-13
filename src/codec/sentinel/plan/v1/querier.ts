/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  Status,
  statusFromJSON,
  statusToJSON,
} from "../../../sentinel/types/v1/status";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { Plan } from "../../../sentinel/plan/v1/plan";
import { Node } from "../../../sentinel/node/v1/node";

export const protobufPackage = "sentinel.plan.v1";

export interface QueryPlansRequest {
  status: Status;
  pagination?: PageRequest;
}

export interface QueryPlansForProviderRequest {
  address: string;
  status: Status;
  pagination?: PageRequest;
}

export interface QueryPlanRequest {
  id: Long;
}

export interface QueryNodesForPlanRequest {
  id: Long;
  pagination?: PageRequest;
}

export interface QueryPlansResponse {
  plans: Plan[];
  pagination?: PageResponse;
}

export interface QueryPlansForProviderResponse {
  plans: Plan[];
  pagination?: PageResponse;
}

export interface QueryPlanResponse {
  plan?: Plan;
}

export interface QueryNodesForPlanResponse {
  nodes: Node[];
  pagination?: PageResponse;
}

function createBaseQueryPlansRequest(): QueryPlansRequest {
  return { status: 0, pagination: undefined };
}

export const QueryPlansRequest = {
  encode(
    message: QueryPlansRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPlansRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlansRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPlansRequest {
    return {
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPlansRequest): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlansRequest>, I>>(
    object: I
  ): QueryPlansRequest {
    const message = createBaseQueryPlansRequest();
    message.status = object.status ?? 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPlansForProviderRequest(): QueryPlansForProviderRequest {
  return { address: "", status: 0, pagination: undefined };
}

export const QueryPlansForProviderRequest = {
  encode(
    message: QueryPlansForProviderRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryPlansForProviderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlansForProviderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPlansForProviderRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPlansForProviderRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlansForProviderRequest>, I>>(
    object: I
  ): QueryPlansForProviderRequest {
    const message = createBaseQueryPlansForProviderRequest();
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPlanRequest(): QueryPlanRequest {
  return { id: Long.UZERO };
}

export const QueryPlanRequest = {
  encode(
    message: QueryPlanRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPlanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPlanRequest {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
    };
  },

  toJSON(message: QueryPlanRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlanRequest>, I>>(
    object: I
  ): QueryPlanRequest {
    const message = createBaseQueryPlanRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryNodesForPlanRequest(): QueryNodesForPlanRequest {
  return { id: Long.UZERO, pagination: undefined };
}

export const QueryNodesForPlanRequest = {
  encode(
    message: QueryNodesForPlanRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryNodesForPlanRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNodesForPlanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNodesForPlanRequest {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryNodesForPlanRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNodesForPlanRequest>, I>>(
    object: I
  ): QueryNodesForPlanRequest {
    const message = createBaseQueryNodesForPlanRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPlansResponse(): QueryPlansResponse {
  return { plans: [], pagination: undefined };
}

export const QueryPlansResponse = {
  encode(
    message: QueryPlansResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.plans) {
      Plan.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPlansResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlansResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plans.push(Plan.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryPlansResponse {
    return {
      plans: Array.isArray(object?.plans)
        ? object.plans.map((e: any) => Plan.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPlansResponse): unknown {
    const obj: any = {};
    if (message.plans) {
      obj.plans = message.plans.map((e) => (e ? Plan.toJSON(e) : undefined));
    } else {
      obj.plans = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlansResponse>, I>>(
    object: I
  ): QueryPlansResponse {
    const message = createBaseQueryPlansResponse();
    message.plans = object.plans?.map((e) => Plan.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPlansForProviderResponse(): QueryPlansForProviderResponse {
  return { plans: [], pagination: undefined };
}

export const QueryPlansForProviderResponse = {
  encode(
    message: QueryPlansForProviderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.plans) {
      Plan.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryPlansForProviderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlansForProviderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plans.push(Plan.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryPlansForProviderResponse {
    return {
      plans: Array.isArray(object?.plans)
        ? object.plans.map((e: any) => Plan.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPlansForProviderResponse): unknown {
    const obj: any = {};
    if (message.plans) {
      obj.plans = message.plans.map((e) => (e ? Plan.toJSON(e) : undefined));
    } else {
      obj.plans = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlansForProviderResponse>, I>>(
    object: I
  ): QueryPlansForProviderResponse {
    const message = createBaseQueryPlansForProviderResponse();
    message.plans = object.plans?.map((e) => Plan.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPlanResponse(): QueryPlanResponse {
  return { plan: undefined };
}

export const QueryPlanResponse = {
  encode(
    message: QueryPlanResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPlanResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plan = Plan.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPlanResponse {
    return {
      plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
    };
  },

  toJSON(message: QueryPlanResponse): unknown {
    const obj: any = {};
    message.plan !== undefined &&
      (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPlanResponse>, I>>(
    object: I
  ): QueryPlanResponse {
    const message = createBaseQueryPlanResponse();
    message.plan =
      object.plan !== undefined && object.plan !== null
        ? Plan.fromPartial(object.plan)
        : undefined;
    return message;
  },
};

function createBaseQueryNodesForPlanResponse(): QueryNodesForPlanResponse {
  return { nodes: [], pagination: undefined };
}

export const QueryNodesForPlanResponse = {
  encode(
    message: QueryNodesForPlanResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryNodesForPlanResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNodesForPlanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nodes.push(Node.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryNodesForPlanResponse {
    return {
      nodes: Array.isArray(object?.nodes)
        ? object.nodes.map((e: any) => Node.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryNodesForPlanResponse): unknown {
    const obj: any = {};
    if (message.nodes) {
      obj.nodes = message.nodes.map((e) => (e ? Node.toJSON(e) : undefined));
    } else {
      obj.nodes = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNodesForPlanResponse>, I>>(
    object: I
  ): QueryNodesForPlanResponse {
    const message = createBaseQueryNodesForPlanResponse();
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

export interface QueryService {
  QueryPlans(request: QueryPlansRequest): Promise<QueryPlansResponse>;
  QueryPlansForProvider(
    request: QueryPlansForProviderRequest
  ): Promise<QueryPlansForProviderResponse>;
  QueryPlan(request: QueryPlanRequest): Promise<QueryPlanResponse>;
  QueryNodesForPlan(
    request: QueryNodesForPlanRequest
  ): Promise<QueryNodesForPlanResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.QueryPlans = this.QueryPlans.bind(this);
    this.QueryPlansForProvider = this.QueryPlansForProvider.bind(this);
    this.QueryPlan = this.QueryPlan.bind(this);
    this.QueryNodesForPlan = this.QueryNodesForPlan.bind(this);
  }
  QueryPlans(request: QueryPlansRequest): Promise<QueryPlansResponse> {
    const data = QueryPlansRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.QueryService",
      "QueryPlans",
      data
    );
    return promise.then((data) =>
      QueryPlansResponse.decode(new _m0.Reader(data))
    );
  }

  QueryPlansForProvider(
    request: QueryPlansForProviderRequest
  ): Promise<QueryPlansForProviderResponse> {
    const data = QueryPlansForProviderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.QueryService",
      "QueryPlansForProvider",
      data
    );
    return promise.then((data) =>
      QueryPlansForProviderResponse.decode(new _m0.Reader(data))
    );
  }

  QueryPlan(request: QueryPlanRequest): Promise<QueryPlanResponse> {
    const data = QueryPlanRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.QueryService",
      "QueryPlan",
      data
    );
    return promise.then((data) =>
      QueryPlanResponse.decode(new _m0.Reader(data))
    );
  }

  QueryNodesForPlan(
    request: QueryNodesForPlanRequest
  ): Promise<QueryNodesForPlanResponse> {
    const data = QueryNodesForPlanRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.plan.v1.QueryService",
      "QueryNodesForPlan",
      data
    );
    return promise.then((data) =>
      QueryNodesForPlanResponse.decode(new _m0.Reader(data))
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
