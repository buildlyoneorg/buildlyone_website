import { useEffect, useMemo, useState } from 'react';
import {
  exclusions,
  packages,
  paymentMilestones,
  proposalMeta,
  roadmap,
  scopeGroups,
} from '../../content/proposal.js';
import './proposal.css';

const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

function formatNaira(amount) {
  return naira.format(amount).replace('NGN', '₦');
}

function ProposalHeader({ onPrint }) {
  return (
    <header className="proposal-header" data-surface="paper">
      <div className="container proposal-header__inner">
        <a className="proposal-header__brand" href="/">buildlyone</a>
        <span className="proposal-header__context mono">Client proposal</span>
        <button className="proposal-print" type="button" onClick={onPrint}>Print or save PDF</button>
      </div>
    </header>
  );
}

function PackageChoice({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`package-choice ${selected ? 'package-choice--selected' : ''}`}
      aria-pressed={selected}
      onClick={() => onSelect(option.id)}
    >
      <span className="package-choice__top">
        <span className="mono">{option.label}</span>
        <span className="package-choice__mark" aria-hidden="true">{selected ? 'Selected' : 'Select'}</span>
      </span>
      <span className="package-choice__price">{formatNaira(option.price)}</span>
      <span className="package-choice__description">{option.description}</span>
      <span className="package-choice__best">{option.bestFor}</span>
    </button>
  );
}

function CostBreakdown({ selectedPackage }) {
  const largest = Math.max(...selectedPackage.breakdown.map((item) => item.amount));

  return (
    <div className="cost-breakdown">
      {selectedPackage.breakdown.map((item) => (
        <details className="cost-line" key={item.label}>
          <summary>
            <span className="cost-line__label">{item.label}</span>
            <span className="cost-line__amount">{formatNaira(item.amount)}</span>
          </summary>
          <div className="cost-line__bar" aria-hidden="true">
            <span style={{ width: `${(item.amount / largest) * 100}%` }} />
          </div>
          <p>{item.note}</p>
        </details>
      ))}
      <div className="cost-total">
        <span>Total MVP1 investment</span>
        <span>{formatNaira(selectedPackage.price)}</span>
      </div>
    </div>
  );
}

function ScopeExplorer() {
  const [activeScope, setActiveScope] = useState(scopeGroups[0].id);
  const selectedScope = scopeGroups.find((group) => group.id === activeScope);

  return (
    <div className="scope-explorer">
      <div className="scope-tabs" role="tablist" aria-label="MVP1 scope categories">
        {scopeGroups.map((group) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeScope === group.id}
            className={activeScope === group.id ? 'is-active' : ''}
            onClick={() => setActiveScope(group.id)}
            key={group.id}
          >
            <span className="mono">{group.number}</span>
            <span>{group.label}</span>
          </button>
        ))}
      </div>

      <div className="scope-panel" role="tabpanel">
        <p className="scope-panel__promise">{selectedScope.promise}</p>
        <div className="scope-list">
          {selectedScope.capabilities.map(([title, description], index) => (
            <div className="scope-item" key={title}>
              <span className="mono">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Roadmap({ selectedPackage }) {
  const [activePhase, setActivePhase] = useState('mvp1');
  const phase = roadmap.find((item) => item.id === activePhase);
  const phasePrice = activePhase === 'mvp1'
    ? selectedPackage.price
    : selectedPackage.laterPrices[activePhase];

  return (
    <div className="roadmap">
      <div className="roadmap__tabs" role="tablist" aria-label="Product roadmap">
        {roadmap.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={activePhase === item.id}
            className={activePhase === item.id ? 'is-active' : ''}
            onClick={() => setActivePhase(item.id)}
            key={item.id}
          >
            <span className="mono">{item.number}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="roadmap__panel" role="tabpanel">
        <div>
          <p className="mono">{phase.label} · {activePhase === 'mvp1' ? 'Fixed proposal' : 'Indicative starting price'}</p>
          <h3>{phase.title}</h3>
          <p>{phase.description}</p>
        </div>
        <div className="roadmap__price">
          <span className="mono">{selectedPackage.label}</span>
          <span>{activePhase === 'mvp1' ? formatNaira(phasePrice) : `From ${formatNaira(phasePrice)}`}</span>
        </div>
        <ul>
          {phase.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ProposalPage() {
  const [packageId, setPackageId] = useState('web');
  const selectedPackage = packages[packageId];
  const mailSubject = encodeURIComponent(`Approval: ${selectedPackage.label} — ${proposalMeta.reference}`);
  const mailBody = encodeURIComponent(
    `Hello buildlyone,\n\nWe would like to proceed with the ${selectedPackage.label} option at ${formatNaira(selectedPackage.price)}. Please send the next steps.\n\nProposal reference: ${proposalMeta.reference}`,
  );

  const paymentRows = useMemo(
    () => paymentMilestones.map((milestone) => ({
      ...milestone,
      amount: selectedPackage.price * (milestone.percentage / 100),
    })),
    [selectedPackage],
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${proposalMeta.title} — buildlyone proposal`;
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="proposal-page" data-surface="paper">
      <ProposalHeader onPrint={() => window.print()} />

      <main>
        <section className="proposal-hero" id="top">
          <div className="container">
            <div className="proposal-hero__meta">
              <span className="mono">{proposalMeta.preparedFor}</span>
              <span className="mono">Reference {proposalMeta.reference}</span>
              <span className="mono">{proposalMeta.date}</span>
            </div>
            <h1>One view of every site, delivery, and decision.</h1>
            <p>{proposalMeta.summary}</p>
            <div className="proposal-hero__decision">
              <span className="mono">Decision in this proposal</span>
              <p>Start with a complete first release. Choose the web option at ₦8 million or the mobile option at ₦10 million.</p>
            </div>
          </div>
        </section>

        <section className="proposal-section proposal-section--ink" data-surface="ink" id="options">
          <div className="container">
            <div className="proposal-heading">
              <p className="mono">01 · Choose the starting point</p>
              <h2>Same business outcome. Different field experience.</h2>
              <p>The selected option updates every price and payment amount on this page.</p>
            </div>

            <div className="package-grid">
              {Object.values(packages).map((option) => (
                <PackageChoice
                  key={option.id}
                  option={option}
                  selected={packageId === option.id}
                  onSelect={setPackageId}
                />
              ))}
            </div>

            <div className="package-summary" aria-live="polite">
              <span className="mono">Current selection</span>
              <p>{selectedPackage.label}</p>
              <p>{selectedPackage.fieldExperience}</p>
              <p className="package-summary__price">{formatNaira(selectedPackage.price)}</p>
            </div>
          </div>
        </section>

        <section className="proposal-section" id="cost">
          <div className="container proposal-split">
            <div className="proposal-heading proposal-heading--sticky">
              <p className="mono">02 · Where the money goes</p>
              <h2>A visible cost for every part of the work.</h2>
              <p>Select each line to read what it pays for. The total remains fixed for the chosen MVP1 package.</p>
            </div>
            <CostBreakdown selectedPackage={selectedPackage} />
          </div>
        </section>

        <section className="proposal-section proposal-section--sunken" id="scope">
          <div className="container">
            <div className="proposal-heading">
              <p className="mono">03 · What MVP1 includes</p>
              <h2>Two categories. One management view.</h2>
              <p>Explore the engineering and business sides separately. Both are included in the selected MVP1 package.</p>
            </div>
            <ScopeExplorer />
          </div>
        </section>

        <section className="proposal-section proposal-section--ink" data-surface="ink" id="workflow">
          <div className="container">
            <div className="proposal-heading">
              <p className="mono">04 · How the work moves</p>
              <h2>From assignment to proof.</h2>
            </div>
            <ol className="workflow">
              <li><span className="mono">01</span><p>Office assigns a site visit or delivery.</p></li>
              <li><span className="mono">02</span><p>Field user arrives, captures coordinates, and signs in.</p></li>
              <li><span className="mono">03</span><p>Findings, goods condition, photos, and recommendations are recorded.</p></li>
              <li><span className="mono">04</span><p>The right person receives the action and deadline.</p></li>
              <li><span className="mono">05</span><p>Management follows progress until evidence is reviewed and the work is closed.</p></li>
            </ol>
          </div>
        </section>

        <section className="proposal-section" id="roadmap">
          <div className="container">
            <div className="proposal-heading">
              <p className="mono">05 · Product roadmap</p>
              <h2>Build in stages. Pay for complexity when it becomes useful.</h2>
              <p>MVP2 and MVP3 are directional estimates. Their final prices follow a separate scope review and approval.</p>
            </div>
            <Roadmap selectedPackage={selectedPackage} />
          </div>
        </section>

        <section className="proposal-section proposal-section--sunken" id="commercials">
          <div className="container commercial-grid">
            <div>
              <div className="proposal-heading">
                <p className="mono">06 · Payment milestones</p>
                <h2>Payment follows visible progress.</h2>
              </div>
              <div className="milestones">
                {paymentRows.map((milestone, index) => (
                  <div className="milestone" key={milestone.label}>
                    <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{milestone.label}</h3>
                      <p>{milestone.note}</p>
                    </div>
                    <div className="milestone__amount">
                      <span>{milestone.percentage}%</span>
                      <span>{formatNaira(milestone.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="proposal-heading">
                <p className="mono">07 · Not included in MVP1</p>
                <h2>The boundary is part of the proposal.</h2>
              </div>
              <ul className="exclusions">
                {exclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="commercial-note">Any addition changes cost or timing only after both parties agree to it in writing.</p>
            </div>
          </div>
        </section>

        <section className="proposal-close" data-surface="ink">
          <div className="container proposal-close__inner">
            <div>
              <p className="mono">Selected proposal</p>
              <h2>{selectedPackage.label} at {formatNaira(selectedPackage.price)}</h2>
              <p>The next step is a scope confirmation meeting. After that, the agreed screens, acceptance tests, schedule, and contract are issued.</p>
            </div>
            <div className="proposal-close__actions">
              <a className="proposal-action proposal-action--primary" href={`mailto:hello@buildlyone.com?subject=${mailSubject}&body=${mailBody}`}>Approve selected package</a>
              <button className="proposal-action proposal-action--secondary" type="button" onClick={() => window.print()}>Print or save PDF</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="proposal-footer" data-surface="ink">
        <div className="container proposal-footer__inner">
          <p>buildlyone</p>
          <p className="mono">Technology that does the job it was bought to do.</p>
          <a href="mailto:hello@buildlyone.com">hello@buildlyone.com</a>
          <a href="tel:+2347037942951">+234 703 794 2951</a>
        </div>
      </footer>
    </div>
  );
}

export default ProposalPage;
