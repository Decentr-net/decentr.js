export function fetchJson<T>(url: string): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
  },
): Promise<T>;

export function fetchJson<T, D>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: D,
    headers?: Record<string, string>,
  },
): Promise<T> {
  return fetch(url, {
    method: options?.method || 'GET',
    headers: options?.headers,
    body: options?.method === 'POST' && options?.body
      ? JSON.stringify(options)
      : undefined
  })
    .then((response) => response.json());
}
