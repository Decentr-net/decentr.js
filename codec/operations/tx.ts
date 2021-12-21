/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecProto, Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "operations";

export interface Reward {
  receiver: string;
  reward?: DecProto;
}

export interface MsgDistributeRewards {
  owner: string;
  rewards: Reward[];
}

export interface MsgDistributeRewardsResponse {}

export interface MsgResetAccount {
  owner: string;
  address: string;
}

export interface MsgResetAccountResponse {}

export interface MsgMint {
  owner: string;
  coin?: Coin;
}

export interface MsgMintResponse {}

export interface MsgBurn {
  owner: string;
  coin?: Coin;
}

export interface MsgBurnResponse {}

const baseReward: object = { receiver: "" };

export const Reward = {
  encode(
    message: Reward,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.receiver !== "") {
      writer.uint32(10).string(message.receiver);
    }
    if (message.reward !== undefined) {
      DecProto.encode(message.reward, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reward {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReward } as Reward;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string();
          break;
        case 2:
          message.reward = DecProto.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reward {
    const message = { ...baseReward } as Reward;
    message.receiver =
      object.receiver !== undefined && object.receiver !== null
        ? String(object.receiver)
        : "";
    message.reward =
      object.reward !== undefined && object.reward !== null
        ? DecProto.fromJSON(object.reward)
        : undefined;
    return message;
  },

  toJSON(message: Reward): unknown {
    const obj: any = {};
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.reward !== undefined &&
      (obj.reward = message.reward
        ? DecProto.toJSON(message.reward)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reward>, I>>(object: I): Reward {
    const message = { ...baseReward } as Reward;
    message.receiver = object.receiver ?? "";
    message.reward =
      object.reward !== undefined && object.reward !== null
        ? DecProto.fromPartial(object.reward)
        : undefined;
    return message;
  },
};

const baseMsgDistributeRewards: object = { owner: "" };

export const MsgDistributeRewards = {
  encode(
    message: MsgDistributeRewards,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    for (const v of message.rewards) {
      Reward.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDistributeRewards {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDistributeRewards } as MsgDistributeRewards;
    message.rewards = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.rewards.push(Reward.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDistributeRewards {
    const message = { ...baseMsgDistributeRewards } as MsgDistributeRewards;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.rewards = (object.rewards ?? []).map((e: any) =>
      Reward.fromJSON(e)
    );
    return message;
  },

  toJSON(message: MsgDistributeRewards): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) =>
        e ? Reward.toJSON(e) : undefined
      );
    } else {
      obj.rewards = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDistributeRewards>, I>>(
    object: I
  ): MsgDistributeRewards {
    const message = { ...baseMsgDistributeRewards } as MsgDistributeRewards;
    message.owner = object.owner ?? "";
    message.rewards = object.rewards?.map((e) => Reward.fromPartial(e)) || [];
    return message;
  },
};

const baseMsgDistributeRewardsResponse: object = {};

export const MsgDistributeRewardsResponse = {
  encode(
    _: MsgDistributeRewardsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDistributeRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDistributeRewardsResponse,
    } as MsgDistributeRewardsResponse;
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

  fromJSON(_: any): MsgDistributeRewardsResponse {
    const message = {
      ...baseMsgDistributeRewardsResponse,
    } as MsgDistributeRewardsResponse;
    return message;
  },

  toJSON(_: MsgDistributeRewardsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDistributeRewardsResponse>, I>>(
    _: I
  ): MsgDistributeRewardsResponse {
    const message = {
      ...baseMsgDistributeRewardsResponse,
    } as MsgDistributeRewardsResponse;
    return message;
  },
};

const baseMsgResetAccount: object = { owner: "", address: "" };

export const MsgResetAccount = {
  encode(
    message: MsgResetAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgResetAccount } as MsgResetAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
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

  fromJSON(object: any): MsgResetAccount {
    const message = { ...baseMsgResetAccount } as MsgResetAccount;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: MsgResetAccount): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgResetAccount>, I>>(
    object: I
  ): MsgResetAccount {
    const message = { ...baseMsgResetAccount } as MsgResetAccount;
    message.owner = object.owner ?? "";
    message.address = object.address ?? "";
    return message;
  },
};

const baseMsgResetAccountResponse: object = {};

export const MsgResetAccountResponse = {
  encode(
    _: MsgResetAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgResetAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgResetAccountResponse,
    } as MsgResetAccountResponse;
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

  fromJSON(_: any): MsgResetAccountResponse {
    const message = {
      ...baseMsgResetAccountResponse,
    } as MsgResetAccountResponse;
    return message;
  },

  toJSON(_: MsgResetAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgResetAccountResponse>, I>>(
    _: I
  ): MsgResetAccountResponse {
    const message = {
      ...baseMsgResetAccountResponse,
    } as MsgResetAccountResponse;
    return message;
  },
};

const baseMsgMint: object = { owner: "" };

export const MsgMint = {
  encode(
    message: MsgMint,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMint } as MsgMint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMint {
    const message = { ...baseMsgMint } as MsgMint;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.coin =
      object.coin !== undefined && object.coin !== null
        ? Coin.fromJSON(object.coin)
        : undefined;
    return message;
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.coin !== undefined &&
      (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMint>, I>>(object: I): MsgMint {
    const message = { ...baseMsgMint } as MsgMint;
    message.owner = object.owner ?? "";
    message.coin =
      object.coin !== undefined && object.coin !== null
        ? Coin.fromPartial(object.coin)
        : undefined;
    return message;
  },
};

const baseMsgMintResponse: object = {};

export const MsgMintResponse = {
  encode(
    _: MsgMintResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
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

  fromJSON(_: any): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
    return message;
  },

  toJSON(_: MsgMintResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintResponse>, I>>(
    _: I
  ): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse;
    return message;
  },
};

const baseMsgBurn: object = { owner: "" };

export const MsgBurn = {
  encode(
    message: MsgBurn,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgBurn } as MsgBurn;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBurn {
    const message = { ...baseMsgBurn } as MsgBurn;
    message.owner =
      object.owner !== undefined && object.owner !== null
        ? String(object.owner)
        : "";
    message.coin =
      object.coin !== undefined && object.coin !== null
        ? Coin.fromJSON(object.coin)
        : undefined;
    return message;
  },

  toJSON(message: MsgBurn): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.coin !== undefined &&
      (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurn>, I>>(object: I): MsgBurn {
    const message = { ...baseMsgBurn } as MsgBurn;
    message.owner = object.owner ?? "";
    message.coin =
      object.coin !== undefined && object.coin !== null
        ? Coin.fromPartial(object.coin)
        : undefined;
    return message;
  },
};

const baseMsgBurnResponse: object = {};

export const MsgBurnResponse = {
  encode(
    _: MsgBurnResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
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

  fromJSON(_: any): MsgBurnResponse {
    const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
    return message;
  },

  toJSON(_: MsgBurnResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnResponse>, I>>(
    _: I
  ): MsgBurnResponse {
    const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  DistributeRewards(
    request: MsgDistributeRewards
  ): Promise<MsgDistributeRewardsResponse>;
  ResetAccount(request: MsgResetAccount): Promise<MsgResetAccountResponse>;
  Mint(request: MsgMint): Promise<MsgMintResponse>;
  Burn(request: MsgBurn): Promise<MsgBurnResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DistributeRewards = this.DistributeRewards.bind(this);
    this.ResetAccount = this.ResetAccount.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Burn = this.Burn.bind(this);
  }
  DistributeRewards(
    request: MsgDistributeRewards
  ): Promise<MsgDistributeRewardsResponse> {
    const data = MsgDistributeRewards.encode(request).finish();
    const promise = this.rpc.request(
      "operations.Msg",
      "DistributeRewards",
      data
    );
    return promise.then((data) =>
      MsgDistributeRewardsResponse.decode(new _m0.Reader(data))
    );
  }

  ResetAccount(request: MsgResetAccount): Promise<MsgResetAccountResponse> {
    const data = MsgResetAccount.encode(request).finish();
    const promise = this.rpc.request("operations.Msg", "ResetAccount", data);
    return promise.then((data) =>
      MsgResetAccountResponse.decode(new _m0.Reader(data))
    );
  }

  Mint(request: MsgMint): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request("operations.Msg", "Mint", data);
    return promise.then((data) => MsgMintResponse.decode(new _m0.Reader(data)));
  }

  Burn(request: MsgBurn): Promise<MsgBurnResponse> {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request("operations.Msg", "Burn", data);
    return promise.then((data) => MsgBurnResponse.decode(new _m0.Reader(data)));
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
