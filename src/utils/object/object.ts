export function sortObjectKeys<T, K extends keyof T>(target: T): T {
  if (!target) {
    return target;
  }

  if (typeof target !== 'object') {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((element) => sortObjectKeys(element)) as unknown as T;
  }

  const sortedKeys = Object.keys(target).sort() as K[];
  const result: Partial<T> = {};

  sortedKeys.forEach((key) => {
    result[key] = sortObjectKeys(target[key]);
  });

  return result as T;
}

export function hasOwnProperty<T, K extends keyof T>(target: Partial<T>, property: K): boolean {
  return Object.prototype.hasOwnProperty.call(target, property);
}

export function deepMapObjectStrings<T, U>(target: T, mapFunction: (value: string) => U): T {
  if (typeof target === 'string') {
    return mapFunction(target) as unknown as T;
  }

  if (Array.isArray(target)) {
    return target.map((element) => deepMapObjectStrings(element, mapFunction)) as unknown as T;
  }

  if (typeof target === 'object' && target !== null) {

    const result: Partial<T> = {};

    (Object.keys(target) as (keyof T)[]).forEach((key) => {
      result[key] = deepMapObjectStrings(target[key], mapFunction);
    });

    return result as T;
  }

  return target;
}

type PrimitiveObjectValue = Array<string | number> | string | number | boolean;
type PrimitiveObject = Record<string, PrimitiveObjectValue>;

export function removeEmptyValuesFromPrimitiveObject(
  target: Partial<PrimitiveObject>,
): Partial<PrimitiveObject> {
  if (typeof target !== 'object') {
    return target;
  }

  const result: Partial<PrimitiveObject> = {};

  Object.keys(target)
    .filter((key) => !valueIsEmpty(target[key]))
    .forEach((key) => {
      result[key] = target[key];
    });

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function valueIsEmpty(value: any): boolean {
  return typeof value === 'undefined'
    || value === null
    || (value as string) === ''
    || typeof value === 'object' && Object.keys(value).length === 0;
}
