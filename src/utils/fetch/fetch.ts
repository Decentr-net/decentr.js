import axios from 'axios';
import { removeEmptyValuesFromPrimitiveObject } from '../object';

export function fetchJson<T>(url: string): Promise<T>;

export function fetchJson<T, D = Record<string, unknown>>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParameters?: Partial<Record<string, string | number>>
  },
): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParameters?: Partial<Record<string, string | number>>
  },
): Promise<T> {
  const fullUrl = options && options.queryParameters
    ? url + '?' + new URLSearchParams(removeEmptyValuesFromPrimitiveObject(options.queryParameters) as Record<string, string>)
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
