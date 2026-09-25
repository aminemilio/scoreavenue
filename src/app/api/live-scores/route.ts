import { NextResponse } from 'next/server'
import { fetchLiveMatches } from '@/lib/live-scores'
import type { Sport } from '@/types'
import { getCountryProfile } from '@/lib/country-sports'

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const sport = searchParams.get('sport') as Sport | null
  const countryCode = searchParams.get('country')?.toUpperCase()
  const profile = countryCode ? getCountryProfile(countryCode) : undefined
  const data = await fetchLiveMatches(sport ?? 'football', { countryCode, preferredLeagues: profile?.topLeagues })

  if (!data.length) {
    return NextResponse.json([], { status: 200 })
  }

  return NextResponse.json(data)
}
