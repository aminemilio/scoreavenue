import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return <InfoPage eyebrow="Contact" title="Help us make the scoreline better" intro="Send corrections, feedback, partnership requests, or privacy questions to the appropriate team.">
    <InfoSection title="General support"><p>Email <a className="text-red-400 hover:text-red-300" href="mailto:support@scoreavenue.com">support@scoreavenue.com</a> for account, product, or accessibility help. Include the match, competition, and approximate time when reporting a score issue.</p></InfoSection>
    <InfoSection title="Business and data partnerships"><p>For commercial, media, or data licensing conversations, email <a className="text-red-400 hover:text-red-300" href="mailto:partners@scoreavenue.com">partners@scoreavenue.com</a>.</p></InfoSection>
    <InfoSection title="Response times"><p>We aim to acknowledge support requests within three business days. Live-score corrections may be reviewed sooner, but we do not guarantee real-time correction of every provider or competition.</p></InfoSection>
  </InfoPage>
}