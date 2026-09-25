import { NextResponse } from 'next/server'
import { rapidApiFetch } from '@/lib/rapidapi'

type RouteContext = { params: { path: string[] } }

export async function GET(request: Request, { params }: RouteContext) {
  const path = params.path.join('/')

  if (!path.startsWith('api/v1/')) {
    return NextResponse.json({ error: 'Only documented api/v1 endpoints are available.' }, { status: 400 })
  }

  try {
    const sourceUrl = new URL(request.url)
    const response = await rapidApiFetch(`/${path}${sourceUrl.search}`)
    const body = await response.text()

    return new NextResponse(body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'RapidAPI request failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}