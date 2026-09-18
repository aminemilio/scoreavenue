import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Matchday Account',
  description: 'Sign up for ScoreAvenue match alerts and personalized sports preferences.',
  robots: { index: false, follow: true },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
