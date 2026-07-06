'use client'
import { useState, useEffect } from 'react'
import { Sport } from '@/types'
import { detectCountry, getCountryProfile, getSportOrder, CountryProfile, COUNTRY_PROFILES } from '@/lib/country-sports'

interface UseCountrySports {
  countryCode: string
  profile: CountryProfile
  sportOrder: Sport[]
  loading: boolean
  setCountryCode: (code: string) => void
}

export function useCountrySports(): UseCountrySports {
  const [countryCode, setCountryCodeState] = useState<string>('DEFAULT')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('sa_country')
    if (saved && COUNTRY_PROFILES[saved]) {
      setCountryCodeState(saved)
      setLoading(false)
      return
    }
    detectCountry().then(code => {
      setCountryCodeState(code)
      setLoading(false)
    })
  }, [])

  const setCountryCode = (code: string) => {
    setCountryCodeState(code)
    localStorage.setItem('sa_country', code)
  }

  return {
    countryCode,
    profile: getCountryProfile(countryCode),
    sportOrder: getSportOrder(countryCode),
    loading,
    setCountryCode,
  }
}
