#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

PROTO_DIR="../proto"
DECENTR_SDK_DIR="$PROTO_DIR/decentr"
SENTINEL_SDK_DIR="$PROTO_DIR/sentinel"
THIRD_PARTY_DIR="$PROTO_DIR/3rdparty"
OUT_DIR="../src/codec"

rm -rf "$OUT_DIR"

mkdir -p "$OUT_DIR"

./protoc/bin/protoc \
  --plugin="../node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$DECENTR_SDK_DIR" \
  --proto_path="$THIRD_PARTY_DIR" \
  --proto_path="$PROTO_DIR" \
  --proto_path="$SENTINEL_SDK_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$DECENTR_SDK_DIR/community/community.proto" \
  "$DECENTR_SDK_DIR/community/query.proto" \
  "$DECENTR_SDK_DIR/community/tx.proto" \
  "$DECENTR_SDK_DIR/operations/operations.proto" \
  "$DECENTR_SDK_DIR/operations/query.proto" \
  "$DECENTR_SDK_DIR/operations/tx.proto" \
  "$DECENTR_SDK_DIR/token/query.proto" \
  "$SENTINEL_SDK_DIR/deposit/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/deposit/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/node/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/node/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/plan/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/plan/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/provider/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/provider/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/session/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/session/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/subscription/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/subscription/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/swap/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/swap/v1/querier.proto" \
  "$SENTINEL_SDK_DIR/vpn/v1/msg.proto" \
  "$SENTINEL_SDK_DIR/vpn/v1/querier.proto" \

# Remove unnecessary codec files
rm -rf \
  "$OUT_DIR/cosmos_proto/" \
  "$OUT_DIR/gogoproto/"

#Remove proto dir
rm -rf "$PROTO_DIR"
