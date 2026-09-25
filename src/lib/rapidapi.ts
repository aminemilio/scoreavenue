const DEFAULT_HOST = 'sportapi7.p.rapidapi.com'

function getRapidApiConfig() {
  const host = process.env.RAPIDAPI_HOST ?? DEFAULT_HOST
  const key = process.env.RAPIDAPI_KEY

  if (!key) {
    throw new Error('RAPIDAPI_KEY is not configured')
  }

  return { host, key }
}

export async function rapidApiFetch(path: string, init: RequestInit = {}) {
  const { host, key } = getRapidApiConfig()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const headers = new Headers(init.headers)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const abortRequest = () => controller.abort()
  init.signal?.addEventListener('abort', abortRequest, { once: true })
  headers.set('Accept', 'application/json')
  headers.set('x-rapidapi-host', host)
  headers.set('x-rapidapi-key', key)

  try {
    return await fetch(`https://${host}${normalizedPath}`, {
      ...init,
      headers,
      cache: 'no-store',
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
    init.signal?.removeEventListener('abort', abortRequest)
  }
}