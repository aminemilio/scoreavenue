import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { CookieConsent } from '@/components/layout/CookieConsent'

export const metadata: Metadata = {
  title: { default: 'ScoreAvenue — Live Sports Scores', template: '%s | ScoreAvenue' },
  description: 'Follow live football, basketball, tennis and major sports scores, match events, standings, and alerts in one fast matchday hub.',
  keywords: ['live scores', 'football scores', 'basketball scores', 'sports results', 'match alerts', 'standings'],
  metadataBase: new URL('https://scoreavenue.com'),
  alternates: { canonical: '/' },
  authors: [{ name: 'ScoreAvenue' }],
  category: 'sports',
  openGraph: { title: 'ScoreAvenue — Live Sports Scores', description: 'Follow live scores, match events, standings, and alerts for the sports you care about.', url: 'https://scoreavenue.com', siteName: 'ScoreAvenue', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary', title: 'ScoreAvenue — Live Sports Scores', description: 'Follow live scores, match events, standings, and alerts.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  appleWebApp: { capable: true, title: 'ScoreAvenue', statusBarStyle: 'black-translucent' },
  formatDetection: { telephone: false },
  manifest: '/manifest.json',
}

export const viewport: Viewport = { themeColor: '#090D16', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="min-h-screen">{children}</main>
        <CookieConsent/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'ScoreAvenue',
          url: 'https://scoreavenue.com',
          description: 'Live sports scores, match events, standings, and alerts.',
          potentialAction: { '@type': 'SearchAction', target: 'https://scoreavenue.com/search?q={search_term_string}', 'query-input': 'required name=search_term_string' },
        }) }} />
        <footer className="border-t border-[#1A1A1A] py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Sports</h3>
                {['Football','Basketball','Tennis','Hockey','Baseball','Rugby'].map(s => (
                  <a key={s} href={`/${s.toLowerCase()}`} className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{s}</a>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Leagues</h3>
                {[['Premier League','/football'],['Champions League','/football'],['La Liga','/football'],['Serie A','/football'],['Bundesliga','/football'],['Ligue 1','/football']].map(([l, href]) => (
                  <a key={l} href={href} className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{l}</a>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Features</h3>
                {[['Live Scores','/'],['AI Predictions','/match/1001'],['Fantasy Teams','/auth'],['Fan Box','/'],['Breaking News','/news'],['Alerts','/auth']].map(([f, href]) => (
                  <a key={f} href={href} className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{f}</a>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Company</h3>
                {[['About','/about'],['Blog','/news'],['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact']].map(([c, href]) => (
                  <a key={c} href={href} className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{c}</a>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]">
              <p className="text-white font-bold text-sm">ScoreAvenue</p>
              <p className="text-[#555] text-xs">© 2026 ScoreAvenue. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <a href="/cookies" className="text-[#555] hover:text-white transition-colors text-xs">Cookies</a>
                <a href="/disclaimer" className="text-[#555] hover:text-white transition-colors text-xs">Disclaimer</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
