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

export function deepMapObjectStrings<T>(target: T, mapFn: (value: string) => any): T {
  if (typeof target === 'string') {
    return mapFn(target) as unknown as T;
  }

  if (Array.isArray(target)) {
    return target.map((element) => deepMapObjectStrings(element, mapFn)) as unknown as T;
  }

  if (typeof target === 'object' && target !== null) {

    const result: Partial<T> = {};

    (Object.keys(target) as (keyof T)[]).forEach((key) => {
      result[key] = deepMapObjectStrings(target[key], mapFn);
    });

    return result as T;
  }

  return target;
}

export function removeEmptyValuesFromPrimitiveObject(
  target: Partial<Record<string, string | number>>
): Record<string, string | number> {
  if (typeof target !== 'object') {
    return target;
  }

  const result: Record<string, string | number> = {};

  Object.keys(target)
    .filter((key) => !valueIsEmpty(target[key]))
    .forEach((key) => {
      result[key] = target[key] as string | number;
    });

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function valueIsEmpty(value: any): boolean {
  return typeof value === 'undefined'
    || value === null
    || (value as string) === ''
    || typeof value === 'object' && !Object.keys(value).length
}
