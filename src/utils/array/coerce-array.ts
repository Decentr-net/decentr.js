export const coerceArray = <T>(mayBeArray: T | T[]): T[] => {
  return Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];
};
