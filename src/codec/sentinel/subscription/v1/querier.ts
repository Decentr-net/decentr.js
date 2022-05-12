/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import {
  Status,
  statusFromJSON,
  statusToJSON,
} from "../../../sentinel/types/v1/status";
import { Subscription } from "../../../sentinel/subscription/v1/subscription";
import { Quota } from "../../../sentinel/subscription/v1/quota";
import { Params } from "../../../sentinel/subscription/v1/params";

export const protobufPackage = "sentinel.subscription.v1";

export interface QuerySubscriptionsRequest {
  pagination?: PageRequest;
}

export interface QuerySubscriptionsForAddressRequest {
  address: string;
  status: Status;
  pagination?: PageRequest;
}

export interface QuerySubscriptionRequest {
  id: Long;
}

export interface QueryQuotaRequest {
  id: Long;
  address: string;
}

export interface QueryQuotasRequest {
  id: Long;
  pagination?: PageRequest;
}

export interface QueryParamsRequest {}

export interface QuerySubscriptionsResponse {
  subscriptions: Subscription[];
  pagination?: PageResponse;
}

export interface QuerySubscriptionsForAddressResponse {
  subscriptions: Subscription[];
  pagination?: PageResponse;
}

export interface QuerySubscriptionResponse {
  subscription?: Subscription;
}

export interface QueryQuotaResponse {
  quota?: Quota;
}

export interface QueryQuotasResponse {
  quotas: Quota[];
  pagination?: PageResponse;
}

export interface QueryParamsResponse {
  params?: Params;
}

function createBaseQuerySubscriptionsRequest(): QuerySubscriptionsRequest {
  return { pagination: undefined };
}

export const QuerySubscriptionsRequest = {
  encode(
    message: QuerySubscriptionsRequest,
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
  ): QuerySubscriptionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionsRequest();
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

  fromJSON(object: any): QuerySubscriptionsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySubscriptionsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySubscriptionsRequest>, I>>(
    object: I
  ): QuerySubscriptionsRequest {
    const message = createBaseQuerySubscriptionsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQuerySubscriptionsForAddressRequest(): QuerySubscriptionsForAddressRequest {
  return { address: "", status: 0, pagination: undefined };
}

export const QuerySubscriptionsForAddressRequest = {
  encode(
    message: QuerySubscriptionsForAddressRequest,
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
  ): QuerySubscriptionsForAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionsForAddressRequest();
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

  fromJSON(object: any): QuerySubscriptionsForAddressRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      status: isSet(object.status) ? statusFromJSON(object.status) : 0,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySubscriptionsForAddressRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QuerySubscriptionsForAddressRequest>, I>
  >(object: I): QuerySubscriptionsForAddressRequest {
    const message = createBaseQuerySubscriptionsForAddressRequest();
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQuerySubscriptionRequest(): QuerySubscriptionRequest {
  return { id: Long.UZERO };
}

export const QuerySubscriptionRequest = {
  encode(
    message: QuerySubscriptionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QuerySubscriptionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionRequest();
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

  fromJSON(object: any): QuerySubscriptionRequest {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
    };
  },

  toJSON(message: QuerySubscriptionRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySubscriptionRequest>, I>>(
    object: I
  ): QuerySubscriptionRequest {
    const message = createBaseQuerySubscriptionRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryQuotaRequest(): QueryQuotaRequest {
  return { id: Long.UZERO, address: "" };
}

export const QueryQuotaRequest = {
  encode(
    message: QueryQuotaRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryQuotaRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryQuotaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQuotaRequest {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryQuotaRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryQuotaRequest>, I>>(
    object: I
  ): QueryQuotaRequest {
    const message = createBaseQueryQuotaRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryQuotasRequest(): QueryQuotasRequest {
  return { id: Long.UZERO, pagination: undefined };
}

export const QueryQuotasRequest = {
  encode(
    message: QueryQuotasRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryQuotasRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryQuotasRequest();
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

  fromJSON(object: any): QueryQuotasRequest {
    return {
      id: isSet(object.id) ? Long.fromString(object.id) : Long.UZERO,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryQuotasRequest): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryQuotasRequest>, I>>(
    object: I
  ): QueryQuotasRequest {
    const message = createBaseQueryQuotasRequest();
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

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQuerySubscriptionsResponse(): QuerySubscriptionsResponse {
  return { subscriptions: [], pagination: undefined };
}

export const QuerySubscriptionsResponse = {
  encode(
    message: QuerySubscriptionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.subscriptions) {
      Subscription.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QuerySubscriptionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptions.push(
            Subscription.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QuerySubscriptionsResponse {
    return {
      subscriptions: Array.isArray(object?.subscriptions)
        ? object.subscriptions.map((e: any) => Subscription.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySubscriptionsResponse): unknown {
    const obj: any = {};
    if (message.subscriptions) {
      obj.subscriptions = message.subscriptions.map((e) =>
        e ? Subscription.toJSON(e) : undefined
      );
    } else {
      obj.subscriptions = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySubscriptionsResponse>, I>>(
    object: I
  ): QuerySubscriptionsResponse {
    const message = createBaseQuerySubscriptionsResponse();
    message.subscriptions =
      object.subscriptions?.map((e) => Subscription.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQuerySubscriptionsForAddressResponse(): QuerySubscriptionsForAddressResponse {
  return { subscriptions: [], pagination: undefined };
}

export const QuerySubscriptionsForAddressResponse = {
  encode(
    message: QuerySubscriptionsForAddressResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.subscriptions) {
      Subscription.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QuerySubscriptionsForAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionsForAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptions.push(
            Subscription.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QuerySubscriptionsForAddressResponse {
    return {
      subscriptions: Array.isArray(object?.subscriptions)
        ? object.subscriptions.map((e: any) => Subscription.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QuerySubscriptionsForAddressResponse): unknown {
    const obj: any = {};
    if (message.subscriptions) {
      obj.subscriptions = message.subscriptions.map((e) =>
        e ? Subscription.toJSON(e) : undefined
      );
    } else {
      obj.subscriptions = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QuerySubscriptionsForAddressResponse>, I>
  >(object: I): QuerySubscriptionsForAddressResponse {
    const message = createBaseQuerySubscriptionsForAddressResponse();
    message.subscriptions =
      object.subscriptions?.map((e) => Subscription.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQuerySubscriptionResponse(): QuerySubscriptionResponse {
  return { subscription: undefined };
}

export const QuerySubscriptionResponse = {
  encode(
    message: QuerySubscriptionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.subscription !== undefined) {
      Subscription.encode(
        message.subscription,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QuerySubscriptionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySubscriptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscription = Subscription.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySubscriptionResponse {
    return {
      subscription: isSet(object.subscription)
        ? Subscription.fromJSON(object.subscription)
        : undefined,
    };
  },

  toJSON(message: QuerySubscriptionResponse): unknown {
    const obj: any = {};
    message.subscription !== undefined &&
      (obj.subscription = message.subscription
        ? Subscription.toJSON(message.subscription)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySubscriptionResponse>, I>>(
    object: I
  ): QuerySubscriptionResponse {
    const message = createBaseQuerySubscriptionResponse();
    message.subscription =
      object.subscription !== undefined && object.subscription !== null
        ? Subscription.fromPartial(object.subscription)
        : undefined;
    return message;
  },
};

function createBaseQueryQuotaResponse(): QueryQuotaResponse {
  return { quota: undefined };
}

export const QueryQuotaResponse = {
  encode(
    message: QueryQuotaResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.quota !== undefined) {
      Quota.encode(message.quota, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryQuotaResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryQuotaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.quota = Quota.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryQuotaResponse {
    return {
      quota: isSet(object.quota) ? Quota.fromJSON(object.quota) : undefined,
    };
  },

  toJSON(message: QueryQuotaResponse): unknown {
    const obj: any = {};
    message.quota !== undefined &&
      (obj.quota = message.quota ? Quota.toJSON(message.quota) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryQuotaResponse>, I>>(
    object: I
  ): QueryQuotaResponse {
    const message = createBaseQueryQuotaResponse();
    message.quota =
      object.quota !== undefined && object.quota !== null
        ? Quota.fromPartial(object.quota)
        : undefined;
    return message;
  },
};

function createBaseQueryQuotasResponse(): QueryQuotasResponse {
  return { quotas: [], pagination: undefined };
}

export const QueryQuotasResponse = {
  encode(
    message: QueryQuotasResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.quotas) {
      Quota.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryQuotasResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryQuotasResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.quotas.push(Quota.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryQuotasResponse {
    return {
      quotas: Array.isArray(object?.quotas)
        ? object.quotas.map((e: any) => Quota.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryQuotasResponse): unknown {
    const obj: any = {};
    if (message.quotas) {
      obj.quotas = message.quotas.map((e) => (e ? Quota.toJSON(e) : undefined));
    } else {
      obj.quotas = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryQuotasResponse>, I>>(
    object: I
  ): QueryQuotasResponse {
    const message = createBaseQueryQuotasResponse();
    message.quotas = object.quotas?.map((e) => Quota.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

export interface QueryService {
  QuerySubscriptions(
    request: QuerySubscriptionsRequest
  ): Promise<QuerySubscriptionsResponse>;
  QuerySubscriptionsForAddress(
    request: QuerySubscriptionsForAddressRequest
  ): Promise<QuerySubscriptionsForAddressResponse>;
  QuerySubscription(
    request: QuerySubscriptionRequest
  ): Promise<QuerySubscriptionResponse>;
  QueryQuota(request: QueryQuotaRequest): Promise<QueryQuotaResponse>;
  QueryQuotas(request: QueryQuotasRequest): Promise<QueryQuotasResponse>;
  QueryParams(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.QuerySubscriptions = this.QuerySubscriptions.bind(this);
    this.QuerySubscriptionsForAddress =
      this.QuerySubscriptionsForAddress.bind(this);
    this.QuerySubscription = this.QuerySubscription.bind(this);
    this.QueryQuota = this.QueryQuota.bind(this);
    this.QueryQuotas = this.QueryQuotas.bind(this);
    this.QueryParams = this.QueryParams.bind(this);
  }
  QuerySubscriptions(
    request: QuerySubscriptionsRequest
  ): Promise<QuerySubscriptionsResponse> {
    const data = QuerySubscriptionsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QuerySubscriptions",
      data
    );
    return promise.then((data) =>
      QuerySubscriptionsResponse.decode(new _m0.Reader(data))
    );
  }

  QuerySubscriptionsForAddress(
    request: QuerySubscriptionsForAddressRequest
  ): Promise<QuerySubscriptionsForAddressResponse> {
    const data = QuerySubscriptionsForAddressRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QuerySubscriptionsForAddress",
      data
    );
    return promise.then((data) =>
      QuerySubscriptionsForAddressResponse.decode(new _m0.Reader(data))
    );
  }

  QuerySubscription(
    request: QuerySubscriptionRequest
  ): Promise<QuerySubscriptionResponse> {
    const data = QuerySubscriptionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QuerySubscription",
      data
    );
    return promise.then((data) =>
      QuerySubscriptionResponse.decode(new _m0.Reader(data))
    );
  }

  QueryQuota(request: QueryQuotaRequest): Promise<QueryQuotaResponse> {
    const data = QueryQuotaRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QueryQuota",
      data
    );
    return promise.then((data) =>
      QueryQuotaResponse.decode(new _m0.Reader(data))
    );
  }

  QueryQuotas(request: QueryQuotasRequest): Promise<QueryQuotasResponse> {
    const data = QueryQuotasRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QueryQuotas",
      data
    );
    return promise.then((data) =>
      QueryQuotasResponse.decode(new _m0.Reader(data))
    );
  }

  QueryParams(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "sentinel.subscription.v1.QueryService",
      "QueryParams",
      data
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
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
