import Link from 'next/link'

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-xs text-[#777] hover:text-white transition-colors">ScoreAvenue</Link>
      <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-red-400">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold text-white">{title}</h1>
      <p className="mt-4 text-base leading-7 text-[#999]">{intro}</p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-[#aaa]">{children}</div>
    </div>
  )
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="text-lg font-semibold text-white mb-2">{title}</h2><div>{children}</div></section>
}