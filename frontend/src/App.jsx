import { site, hero, nav, problems, method, team, intake, footer } from './content/index.js';
import { audience } from './content/audience.js';
import useHashLanding from './hooks/useHashLanding.js';

import SiteHeader from './components/sections/SiteHeader.jsx';
import Hero from './components/sections/Hero.jsx';
import ProblemIndex from './components/sections/ProblemIndex.jsx';
import ProblemDetail from './components/sections/ProblemDetail.jsx';
import Audience from './components/sections/Audience.jsx';
import { MethodManifesto, MethodPreview, MethodSteps } from './components/sections/Method.jsx';
import RefusalList, { RefusalPreview } from './components/sections/RefusalList.jsx';
import Team from './components/sections/Team.jsx';
import Intake from './components/sections/Intake.jsx';
import SiteFooter from './components/sections/SiteFooter.jsx';
import ProposalPage from './components/proposal/ProposalPage.jsx';

export default function App() {
  useHashLanding();

  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path.startsWith('/proposal')) {
    return <ProposalPage />;
  }

  if (path === '/method') {
    return (
      <>
        <a href="#method" className="skiplink">Skip to content</a>
        <SiteHeader brand={site.name} nav={nav} />
        <main>
          <MethodManifesto manifesto={method.manifesto} />
          <MethodSteps steps={method.steps} stats={method.stats} />
          <RefusalList refusals={method.refusals} problems={problems} />
        </main>
        <SiteFooter footer={footer} brand={site.name} email={site.email} phone={site.phone} phoneLabel={site.phoneLabel} nav={nav} />
      </>
    );
  }

  if (path.startsWith('/problems/')) {
    const problemId = path.split('/').pop();
    const problem = problems.find((item) => item.id === problemId);

    if (problem) {
      return (
        <>
          <a href={`#problem-${problem.id}`} className="skiplink">Skip to content</a>
          <SiteHeader brand={site.name} nav={nav} />
          <main>
            <ProblemDetail problem={problem} primaryAction={site.primaryAction} standalone />
          </main>
          <SiteFooter footer={footer} brand={site.name} email={site.email} phone={site.phone} phoneLabel={site.phoneLabel} nav={nav} />
        </>
      );
    }
  }

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

        <Audience audience={audience} />

        <MethodPreview steps={method.steps.slice(0, 4)} />

        <RefusalPreview refusals={method.homepageRefusals} />

        <Team team={team} />

        <Intake intake={intake} />
      </main>

      <SiteFooter footer={footer} brand={site.name} email={site.email} phone={site.phone} phoneLabel={site.phoneLabel} nav={nav} />
    </>
  );
}
