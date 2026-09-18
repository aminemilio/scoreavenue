import { InfoPage, InfoSection } from '@/components/layout/InfoPage'

export const metadata = { title: 'About' }

export default function AboutPage() {
  return <InfoPage eyebrow="About ScoreAvenue" title="A faster way to follow the game" intro="ScoreAvenue brings live scores, match context, league tables, and timely alerts into one focused sports experience.">
    <InfoSection title="Our focus"><p>We are building a scoreboard that is quick to scan during a busy matchday, useful when researching a fixture, and respectful of the attention of fans. Scores, status, events, form, and standings belong together.</p></InfoSection>
    <InfoSection title="What we publish"><p>ScoreAvenue may display scores, schedules, team names, competition information, statistics, editorial updates, and community features. Data availability can vary by sport, competition, territory, and provider.</p></InfoSection>
    <InfoSection title="Contact"><p>For product questions, corrections, partnerships, or rights concerns, contact the ScoreAvenue team through the <a className="text-red-400 hover:text-red-300" href="/contact">contact page</a>.</p></InfoSection>
  </InfoPage>
}