import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'Disclaimer' }

export default function DisclaimerPage() {
  return <InfoPage eyebrow="Important information" title="Sports data disclaimer" intro="ScoreAvenue is an information and entertainment product, not an official competition authority or a betting, financial, medical, or legal advice service.">
    <InfoSection title="Accuracy and timing"><p>Match data may come from third-party providers and can be delayed, missing, or corrected. Always verify important information with the relevant league, club, federation, or official broadcaster.</p></InfoSection>
    <InfoSection title="Predictions and editorial features"><p>Any predictions, probabilities, previews, rankings, or community opinions are informational only. They are not guarantees of results and should never be treated as financial advice or encouragement to gamble.</p></InfoSection>
    <InfoSection title="Brand and rights concerns"><p>Team names, competition names, marks, and other third-party materials belong to their respective owners. Report a rights or attribution concern through the <a className="text-red-400 hover:text-red-300" href="/contact">contact page</a>.</p></InfoSection>
  </InfoPage>
}