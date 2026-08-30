import { site, hero, nav, problems, method, team, intake, footer } from './content/index.js';
import useHashLanding from './hooks/useHashLanding.js';

import SiteHeader from './components/sections/SiteHeader.jsx';
import Hero from './components/sections/Hero.jsx';
import ProblemIndex from './components/sections/ProblemIndex.jsx';
import ProblemDetail from './components/sections/ProblemDetail.jsx';
import { MethodManifesto, MethodSteps } from './components/sections/Method.jsx';
import RefusalList from './components/sections/RefusalList.jsx';
import Team from './components/sections/Team.jsx';
import Intake from './components/sections/Intake.jsx';
import SiteFooter from './components/sections/SiteFooter.jsx';

export default function App() {
  useHashLanding();

  return (
    <>
      <a href="#problems" className="skiplink">Skip to content</a>

      <SiteHeader brand={site.name} nav={nav} />

      <main>
        <Hero
          hero={hero}
          primaryAction={site.primaryAction}
          secondaryAction={site.secondaryAction}
        />

        <ProblemIndex problems={problems} />

        {problems.map((problem) => (
          <ProblemDetail
            key={problem.id}
            problem={problem}
            primaryAction={site.primaryAction}
          />
        ))}

        <MethodManifesto manifesto={method.manifesto} />
        <MethodSteps steps={method.steps} stats={method.stats} />

        <RefusalList refusals={method.refusals} problems={problems} />

        <Team team={team} />

        <Intake intake={intake} />
      </main>

      <SiteFooter footer={footer} brand={site.name} email={site.email} nav={nav} />
    </>
  );
}
