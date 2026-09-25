'use client'
import { useState, useEffect } from 'react'
import { Sport } from '@/types'
import { detectCountry, getCountryProfile, getSportOrder, CountryProfile, COUNTRY_PROFILES } from '@/lib/country-sports'

const SPORT_ORDER_VERSION = 'v2'

interface UseCountrySports {
  countryCode: string
  profile: CountryProfile
  sportOrder: Sport[]
  loading: boolean
  setCountryCode: (code: string) => void
  moveSport: (sport: Sport, direction: -1 | 1) => void
}

export function useCountrySports(): UseCountrySports {
  const [countryCode, setCountryCodeState] = useState<string>('DEFAULT')
  const [loading, setLoading] = useState(true)
  const [sportOrder, setSportOrder] = useState<Sport[]>(() => getSportOrder('DEFAULT'))

  useEffect(() => {
    const saved = localStorage.getItem('sa_country')
    if (saved && COUNTRY_PROFILES[saved]) {
      setCountryCodeState(saved)
      const savedVersion = localStorage.getItem(`sa_sports_version_${saved}`)
      const savedOrder = savedVersion === SPORT_ORDER_VERSION ? localStorage.getItem(`sa_sports_${saved}`) : null
      setSportOrder(savedOrder ? JSON.parse(savedOrder) : getSportOrder(saved))
      localStorage.setItem(`sa_sports_version_${saved}`, SPORT_ORDER_VERSION)
      setLoading(false)
      return
    }
    detectCountry().then(code => {
      setCountryCodeState(code)
      const savedVersion = localStorage.getItem(`sa_sports_version_${code}`)
      const savedOrder = savedVersion === SPORT_ORDER_VERSION ? localStorage.getItem(`sa_sports_${code}`) : null
      setSportOrder(savedOrder ? JSON.parse(savedOrder) : getSportOrder(code))
      localStorage.setItem(`sa_sports_version_${code}`, SPORT_ORDER_VERSION)
      setLoading(false)
    })
  }, [])

  const setCountryCode = (code: string) => {
    setCountryCodeState(code)
    localStorage.setItem('sa_country', code)
  }

  const moveSport = (sport: Sport, direction: -1 | 1) => {
    setSportOrder(current => {
      const index = current.indexOf(sport)
      const nextIndex = index + direction
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      localStorage.setItem(`sa_sports_${countryCode}`, JSON.stringify(next))
      return next
    })
  }

  return {
    countryCode,
    profile: getCountryProfile(countryCode),
    sportOrder,
    loading,
    setCountryCode,
    moveSport,
  }
}
