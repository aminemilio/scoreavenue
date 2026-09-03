import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ScoreAvenue — Live Scores',
  description: 'Live sports scores, stats, and AI analysis',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#080808',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#080808] text-[#F0F0F0] antialiased">
        {children}
      </body>
0        </html>
  );
}