import { Timestamp } from 'cosmjs-types/google/protobuf/timestamp';

export function protoTimestampToDate(timestamp: Timestamp): Date {
  return new Date(timestamp.seconds.toNumber() * 1000);
}
