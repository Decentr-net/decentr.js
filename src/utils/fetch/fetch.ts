import axios from 'axios';
import { removeEmptyValuesFromPrimitiveObject } from '../object';
import { coerceArray } from '../array'

type QueryParametersObject = Record<string, Array<string | number> | string | number | boolean>;

const createQuery = (queryParametersObject: QueryParametersObject): string => {
  const urlSearchParameters = new URLSearchParams();

  Object.entries(removeEmptyValuesFromPrimitiveObject(queryParametersObject))
    .forEach(([key, value]) => {
      const valueArray = coerceArray(value);
      urlSearchParameters.append(key, valueArray.join(','));
    });

  return urlSearchParameters.toString();
};

export interface FetchOptions<D = Partial<Record<string, unknown>>> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: D;
  headers?: Record<string, string>;
  queryParameters?: QueryParametersObject;
  timeout?: number;
}

export function fetchJson<T>(url: string): Promise<T>;

export function fetchJson<T, D = Partial<Record<string, unknown>>>(
  url: string,
  options: FetchOptions<D>,
): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options?: FetchOptions<D>,
): Promise<T> {
  const fullUrl = options && options.queryParameters
    ? url + '?' + createQuery(options.queryParameters)
    : url;

  return axios({
    method: options?.method || 'GET',
    url: fullUrl,
    headers: options?.headers,
    data: options?.method === 'POST' && options?.body
      ? (typeof options.body === 'string'
        ? options.body
        : JSON.stringify(options.body))
      : undefined,
    timeout: options?.timeout,
  })
    .then((response) => response.data);
}
