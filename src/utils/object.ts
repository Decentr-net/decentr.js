export function sortObject<T, K extends keyof T>(target: T): T {
  if (!target) {
    return target;
  }

  if (typeof target !== 'object') {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((element) => sortObject(element)) as unknown as T;
  }

  const sortedKeys = Object.keys(target).sort() as K[];
  const result: Partial<T> = {};

  sortedKeys.forEach((key) => {
    result[key] = sortObject(target[key]);
  });

  return result as T;
}

export function hasOwnProperty<T, K extends keyof T>(target: Partial<T>, property: K): boolean {
  return Object.prototype.hasOwnProperty.call(target, property);
}
