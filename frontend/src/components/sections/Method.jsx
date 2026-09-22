import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';
import StatLine from '../primitives/StatLine.jsx';
import ButtonLink from '../primitives/ButtonLink.jsx';

export function MethodPreview({ steps }) {
  return (
    <Section id="method" labelledBy="method-preview-title">
      <Container>
        <SectionHeader
          id="method-preview-title"
          kicker="How we work"
          title="Diagnose before prescribing."
          lede="The first job is to find the earliest break in the work, state what we know, and rule out the attractive wrong answers."
        />
        <ol className="method-preview">
          {steps.map((step) => (
            <li key={step.id} className="method-preview__item">
              <MonoLabel>{step.number}</MonoLabel>
              <h3>{step.title}</h3>
              <p>{step.statement}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/method" className="method-preview__cta">Read the full method</ButtonLink>
      </Container>
    </Section>
  );
}

/**
 * The manifesto sits on ink; the document below it sits on paper.
 *
 * This is the site's primary credibility instrument, so it is the
 * longest thing on the page by design. It is given away in full.
 */
export function MethodManifesto({ manifesto }) {
  return (
    <Section id="method" surface="ink" labelledBy="method-title" rule={false}>
      <Container size="narrow">
        <MonoLabel as="p" className="section-header__label">{manifesto.kicker}</MonoLabel>
        <h2 id="method-title" className="manifesto">
          {manifesto.statement[0]}
        </h2>
        <div className="manifesto__body">
          {manifesto.statement.slice(1).map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Container>
    </Section>
  );
}

export function MethodSteps({ steps, stats }) {
  return (
    <Section id="method-steps" labelledBy="method-steps-title">
      <Container>
        <SectionHeader
          id="method-steps-title"
          kicker="How we work"
          title="The whole method, in public."
          lede="A business should be able to run the first four steps without us. If you do and the answer is that you do not need software, that is a good outcome."
        />

        <div className="stats">
          {stats.map((s) => <StatLine key={s.label} stat={s} />)}
        </div>

        <ol className="steps">
          {steps.map((s) => (
            <li key={s.id} className="step">
              <MonoLabel className="step__number">{s.number}</MonoLabel>
              <div className="step__body">
                <h3 className="step__title">{s.title}</h3>
                <p className="step__statement">{s.statement}</p>
                {s.body?.map((p, i) => <p key={i} className="step__para">{p}</p>)}

                {s.questions && (
                  <>
                    <MonoLabel as="p" className="step__sublabel">What we ask</MonoLabel>
                    <ul className="qlist">
                      {s.questions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  </>
                )}
                {s.rulesOut && (
                  <>
                    <MonoLabel as="p" className="step__sublabel">What this rules out</MonoLabel>
                    <ul className="qlist">
                      {s.rulesOut.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  </>
                )}
                {(s.deliverable || s.duration) && (
                  <MonoLabel as="p" className="step__meta">
                    {[s.deliverable, s.duration].filter(Boolean).join(' · ')}
                  </MonoLabel>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
