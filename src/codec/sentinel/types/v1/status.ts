/* eslint-disable */
export const protobufPackage = "sentinel.types.v1";

export enum Status {
  STATUS_UNSPECIFIED = 0,
  STATUS_ACTIVE = 1,
  STATUS_INACTIVE_PENDING = 2,
  STATUS_INACTIVE = 3,
  UNRECOGNIZED = -1,
}

export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return Status.STATUS_UNSPECIFIED;
    case 1:
    case "STATUS_ACTIVE":
      return Status.STATUS_ACTIVE;
    case 2:
    case "STATUS_INACTIVE_PENDING":
      return Status.STATUS_INACTIVE_PENDING;
    case 3:
    case "STATUS_INACTIVE":
      return Status.STATUS_INACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}

export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case Status.STATUS_ACTIVE:
      return "STATUS_ACTIVE";
    case Status.STATUS_INACTIVE_PENDING:
      return "STATUS_INACTIVE_PENDING";
    case Status.STATUS_INACTIVE:
      return "STATUS_INACTIVE";
    case Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
