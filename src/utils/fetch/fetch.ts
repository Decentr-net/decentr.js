import axios from 'axios';
import { removeEmptyValuesFromPrimitiveObject } from '../object';
import { coerceArray } from '../array'

type QueryParametersObject = Partial<Record<string, Array<string | number> | string | number>>;

const createQuery = (queryParametersObject: QueryParametersObject): string => {
  const urlSearchParameters = new URLSearchParams();

  Object.entries(removeEmptyValuesFromPrimitiveObject(queryParametersObject))
    .forEach(([key, value]) => {
      const valueArray = coerceArray(value);
      urlSearchParameters.append(key, valueArray.join(','));
    });

  return urlSearchParameters.toString();
};

export function fetchJson<T>(url: string): Promise<T>;

export function fetchJson<T, D = Partial<Record<string, unknown>>>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParameters?: QueryParametersObject,
  },
): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParameters?: QueryParametersObject,
  },
): Promise<T> {
  const fullUrl = options && options.queryParameters
    ? url + '?' + createQuery(options.queryParameters)
    : url;

  return axios({
    method: options?.method || 'GET',
    url: fullUrl,
    headers: options?.headers,
    data: options?.method === 'POST' && options?.body
      ? JSON.stringify(options.body)
      : undefined
  })
    .then((response) => response.data);
}
