import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'Terms of Use' }

export default function TermsPage() {
  return <InfoPage eyebrow="Legal" title="Terms of Use" intro="By using ScoreAvenue, you agree to use the service lawfully and to review the limitations below.">
    <InfoSection title="The service"><p>ScoreAvenue provides sports information and product features for personal, non-commercial use unless we agree otherwise. Scores and schedules can be delayed, incomplete, or corrected after publication.</p></InfoSection>
    <InfoSection title="Acceptable use"><p>Do not scrape, overload, reverse engineer, impersonate users, bypass access controls, or use ScoreAvenue to make decisions where an inaccurate score could cause harm. Community content must be respectful and lawful.</p></InfoSection>
    <InfoSection title="Accounts and features"><p>You are responsible for activity on your account and for keeping account details accurate. We may suspend access to protect users, providers, or the service.</p></InfoSection>
    <InfoSection title="Content and availability"><p>ScoreAvenue and its providers retain rights in their content and data. Features may change, be limited by territory, or become unavailable. To the extent allowed by law, the service is provided without a guarantee of uninterrupted availability or perfect accuracy.</p></InfoSection>
    <InfoSection title="Contact"><p>Questions about these terms can be sent to <a className="text-red-400 hover:text-red-300" href="mailto:legal@scoreavenue.com">legal@scoreavenue.com</a>.</p></InfoSection>
    <p className="text-xs text-[#666]">Effective date: September 17, 2026</p>
  </InfoPage>
}