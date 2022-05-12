#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PARENT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$PARENT_PATH"

PROTO_DIR="../proto"
TEMP_DIR="../temp"
DECENTR_DIR="$TEMP_DIR/decentr"
SENTINEL_DIR="$TEMP_DIR/hub"
DECENTR_PROTO_PATH="proto"
SENTINEL_PROTO_PATH="proto/sentinel"
ZIP_FILE="$TEMP_DIR/tmp.zip"
SDK_REF=${SDK_REF:-"master"}
SUFFIX=${SDK_REF}

[[ $SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && SUFFIX=${SUFFIX#v}

rm -rf \
  "$PROTO_DIR" \
  "$TEMP_DIR"

mkdir -p "$TEMP_DIR"

wget -qO "$ZIP_FILE" "https://github.com/Decentr-net/decentr/archive/$SDK_REF.zip"
unzip "$ZIP_FILE" "*.proto" -d "$TEMP_DIR"

wget -qO "$ZIP_FILE" "https://github.com/sentinel-official/hub/archive/$SDK_REF.zip"
unzip "$ZIP_FILE" "*.proto" -d "$TEMP_DIR"

mv "$DECENTR_DIR-$SUFFIX/$DECENTR_PROTO_PATH" "$PROTO_DIR";
mv "$SENTINEL_DIR-$SUFFIX/$SENTINEL_PROTO_PATH" "$PROTO_DIR";
rm -rf "$TEMP_DIR"
