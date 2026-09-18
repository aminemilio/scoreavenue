import { NextResponse } from 'next/server'
import { fetchLiveMatches } from '@/lib/live-scores'
import type { Sport } from '@/types'

export async function GET(request: Request) {
  const sport = new URL(request.url).searchParams.get('sport') as Sport | null
  const data = await fetchLiveMatches(sport ?? 'football')

  if (!data.length) {
    return NextResponse.json([], { status: 200 })
  }

  return NextResponse.json(data)
}
