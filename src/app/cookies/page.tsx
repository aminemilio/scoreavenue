import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'Cookie Policy' }

export default function CookiesPage() {
  return <InfoPage eyebrow="Legal" title="Cookie Policy" intro="Cookies and similar storage help ScoreAvenue remember choices and understand how the product is used.">
    <InfoSection title="Essential storage"><p>We may use essential storage for security, authentication, country or display preferences, and core functionality. These items cannot always be disabled without breaking the service.</p></InfoSection>
    <InfoSection title="Analytics and preferences"><p>With appropriate notice and consent where required, we may use analytics or preference storage to understand performance and improve navigation. You can clear browser storage or adjust browser controls at any time.</p></InfoSection>
    <InfoSection title="Third parties"><p>Embedded services and providers may set their own cookies or similar technologies. Their policies govern those technologies.</p></InfoSection>
    <p className="text-xs text-[#666]">Effective date: September 17, 2026</p>
  </InfoPage>
}