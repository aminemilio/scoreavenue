'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth` },
    })
    setStatus(error ? 'error' : 'sent')
  }

  return <div className="max-w-md mx-auto px-4 py-14">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#777] hover:text-white"><ArrowLeft size={14} /> Back to scores</Link>
    <div className="mt-8 border border-[#1A1A1A] rounded-2xl bg-[#0F0F0F] p-6">
      <div className="flex items-center gap-2 text-red-400"><ShieldCheck size={18} /><span className="text-xs font-semibold uppercase tracking-wide">Your matchday</span></div>
      <h1 className="mt-4 text-2xl font-bold text-white">Make matchday yours</h1>
      <p className="mt-2 text-sm leading-6 text-[#777]">Get a passwordless link to save favorite teams, follow leagues, and receive the match alerts that matter to you.</p>
      <form className="mt-6 space-y-3" onSubmit={submit}>
        <label className="block text-xs text-[#888]">Email address<input required type="email" name="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#2A2A2A] bg-[#151515] px-3 py-2.5 text-sm text-white outline-none focus:border-red-500" placeholder="you@example.com" /></label>
        <button disabled={status === 'sending'} type="submit" className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60 transition-colors"><Mail size={15} className="inline mr-2" />{status === 'sending' ? 'Sending link...' : 'Email me a sign-in link'}</button>
      </form>
      {status === 'sent' && <p role="status" className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs leading-5 text-green-300">Check your inbox for your secure sign-in link.</p>}
      {status === 'error' && <p role="alert" className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs leading-5 text-red-300">Sign-in is temporarily unavailable. Please try again later.</p>}
      <p className="mt-4 text-[11px] leading-5 text-[#555]">By continuing, you agree to the <Link className="text-[#888] hover:text-white" href="/terms">Terms</Link> and acknowledge the <Link className="text-[#888] hover:text-white" href="/privacy">Privacy Policy</Link>.</p>
    </div>
  </div>
}