import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return <InfoPage eyebrow="Legal" title="Privacy Policy" intro="This summary explains the information ScoreAvenue may process when you use the website. Replace the business details and obtain legal review before launch.">
    <InfoSection title="Information we may collect"><p>We may receive account details you submit, preferences such as a selected country or favorite teams, device and diagnostic information, and usage events needed to operate and improve the service. We do not ask for sensitive personal information to browse scores.</p></InfoSection>
    <InfoSection title="How we use information"><p>We use information to provide scores and alerts, remember preferences, protect the service, answer support requests, measure performance, and develop new features. We do not sell personal information.</p></InfoSection>
    <InfoSection title="Service providers"><p>Hosting, analytics, authentication, communications, and score-data providers may process information on our behalf. Providers should receive only the information needed for their documented service.</p></InfoSection>
    <InfoSection title="Your choices"><p>You can request access, correction, deletion, or export of personal information, and you can opt out of non-essential communications. Contact <a className="text-red-400 hover:text-red-300" href="mailto:privacy@scoreavenue.com">privacy@scoreavenue.com</a>.</p></InfoSection>
    <InfoSection title="Retention and changes"><p>We retain information only as long as needed for the purposes described or as required by law. We may update this policy as the product changes and will publish the effective date on this page.</p></InfoSection>
    <p className="text-xs text-[#666]">Effective date: September 17, 2026</p>
  </InfoPage>
}