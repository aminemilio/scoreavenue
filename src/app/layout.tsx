import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'ScoreAvenue — Live Sports Scores',
  description: 'Live scores for football, basketball, tennis and all major sports. Updated every minute.',
  keywords: 'live scores, football scores, basketball scores, sports results, premier league, champions league',
  openGraph: { title: 'ScoreAvenue — Live Sports Scores', description: 'Live scores for all major sports.', url: 'https://scoreavenue.com', siteName: 'ScoreAvenue', type: 'website' },
  manifest: '/manifest.json',
}

export const viewport: Viewport = { themeColor: '#FF3B30', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="min-h-screen">{children}</main>
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
                {['Premier League','Champions League','La Liga','Serie A','Bundesliga','Ligue 1'].map(l => (
                  <a key={l} href="#" className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{l}</a>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Features</h3>
                {['Live Scores','AI Predictions','Fantasy Teams','Fan Box','Breaking News','Alerts'].map(f => (
                  <a key={f} href="#" className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{f}</a>
                ))}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-3">Company</h3>
                {['About','Blog','Privacy','Terms','Contact'].map(c => (
                  <a key={c} href="#" className="block text-[#555] hover:text-white text-sm mb-2 transition-colors">{c}</a>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]">
              <p className="text-white font-bold text-sm">ScoreAvenue</p>
              <p className="text-[#555] text-xs">© 2026 ScoreAvenue. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <a href="https://x.com/scoreavenue" className="text-[#555] hover:text-white transition-colors text-sm">𝕏</a>
                <a href="https://instagram.com/scoreavenue" className="text-[#555] hover:text-white transition-colors text-sm">Instagram</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
