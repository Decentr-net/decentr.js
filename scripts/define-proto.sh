#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

PROTO_DIR="../proto"
DECENTR_SDK_DIR="$PROTO_DIR/decentr"
THIRD_PARTY_DIR="$PROTO_DIR/3rdparty"
COSMOS_SDK_DIR="$THIRD_PARTY_DIR/cosmos"
OUT_DIR="../src/codec"

rm -rf "$OUT_DIR"

mkdir -p "$OUT_DIR"

./protoc/bin/protoc \
  --plugin="../node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$DECENTR_SDK_DIR" \
  --proto_path="$THIRD_PARTY_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$DECENTR_SDK_DIR/community/community.proto" \
  "$DECENTR_SDK_DIR/community/query.proto" \
  "$DECENTR_SDK_DIR/community/tx.proto" \
  "$DECENTR_SDK_DIR/operations/operations.proto" \
  "$DECENTR_SDK_DIR/operations/query.proto" \
  "$DECENTR_SDK_DIR/operations/tx.proto" \
  "$DECENTR_SDK_DIR/token/query.proto" \
  "$COSMOS_SDK_DIR/mint/v1beta1/mint.proto" \
  "$COSMOS_SDK_DIR/mint/v1beta1/query.proto" \

# Remove unnecessary codec files
rm -rf \
  "$OUT_DIR/cosmos_proto/" \
  "$OUT_DIR/gogoproto/" \
  "$OUT_DIR/google/"

#Remove proto dir
rm -rf "$PROTO_DIR"
