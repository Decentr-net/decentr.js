import { removeEmptyValuesFromPrimitiveObject } from '../object'

export function fetchJson<T>(url: string): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParams?: Partial<Record<string, string | number>>
  },
): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
    queryParams?: Partial<Record<string, string | number>>
  },
): Promise<T> {
  const fullUrl = options && options.queryParams
    ? url + '?' + new URLSearchParams(removeEmptyValuesFromPrimitiveObject(options.queryParams) as Record<string, string>)
    : url;

  return fetch(fullUrl, {
    method: options?.method || 'GET',
    headers: options?.headers,
    body: options?.method === 'POST' && options?.body
      ? JSON.stringify(options.body)
      : undefined
  })
    .then((response) => response.json());
}
