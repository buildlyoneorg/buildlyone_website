import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';
import NumberedList from '../primitives/NumberedList.jsx';
import ButtonLink from '../primitives/ButtonLink.jsx';

/**
 * One problem, four beats: pain, story, what we build, how you would
 * know it worked.
 *
 * The story is gated: a story may only render alongside its disclosure
 * caption. With no client work, every story here is a labelled
 * composite, and the label is not optional.
 */
function Story({ story }) {
  if (story.kind !== 'illustrative' || !story.disclosure?.trim()) return null;
  return (
    <figure className="story">
      <MonoLabel as="figcaption" className="story__disclosure">{story.disclosure}</MonoLabel>
      <p className="story__setting">{story.setting}</p>
      {story.body.map((p, i) => <p key={i} className="story__para">{p}</p>)}
    </figure>
  );
}

export default function ProblemDetail({ problem, primaryAction, standalone = false }) {
  const p = problem;
  const titleId = `problem-${p.id}-title`;

  return (
    <Section id={`problem-${p.id}`} labelledBy={titleId}>
      <Container>
        {standalone && <a className="backlink mono" href="/#problems">← All four problems</a>}
        <SectionHeader id={titleId} index={p.number} kicker="Problem" title={p.symptom} size="large" />

        <div className="pdetail">
          <div className="pdetail__main">
            {/* 1 — pain */}
            <MonoLabel as="h3" className="beat">What it looks like</MonoLabel>
            <NumberedList items={p.signal} />
            <p className="pdetail__reason">{p.priorityReason}</p>

            {/* 2 — story */}
            <Story story={p.story} />

            {/* 3 — what we build */}
            <MonoLabel as="h3" className="beat">What we build</MonoLabel>
            <ul className="builds">
              {p.whatWeBuild.map((b, i) => (
                <li key={i} className="build">
                  <h4 className="build__title">{b.title}</h4>
                  <p className="build__detail">{b.detail}</p>
                  <MonoLabel as="p" className="build__stack">{b.stack.join(' · ')}</MonoLabel>
                </li>
              ))}
            </ul>

            {/* 4 — how you would know */}
            <MonoLabel as="h3" className="beat">How you would know it worked</MonoLabel>
            <dl className="metrics">
              {p.metrics.map((m, i) => (
                <div key={i} className="metric">
                  <dt className="metric__name">{m.name}</dt>
                  <dd className="metric__body">
                    <p>{m.definition}</p>
                    <MonoLabel as="p" className="metric__how">Measured — {m.howMeasured}</MonoLabel>
                    <MonoLabel as="p" className="metric__how">Baseline — {m.baselineSource}</MonoLabel>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="refusals refusals--inline">
              {p.avoid.map((r, i) => (
                <li key={i} className="refusal">
                  <p className="refusal__statement">{r.statement}</p>
                  <p className="refusal__reason">{r.reason}</p>
                </li>
              ))}
            </ul>

            <ButtonLink href={primaryAction.href} className="pdetail__cta">
              {primaryAction.label}
            </ButtonLink>
          </div>

          <aside className="pdetail__aside">
            <MonoLabel as="h3" className="beat">What we would ask</MonoLabel>
            <ul className="qlist">
              {p.investigationQuestions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>

            <MonoLabel as="h3" className="beat">What we would need from you</MonoLabel>
            <ul className="qlist">
              {p.evidenceToGather.map((e, i) => <li key={i}>{e}</li>)}
            </ul>

            <MonoLabel as="p" className="pdetail__xref">
              Method — {p.relatedMethodSteps.join(', ')}
            </MonoLabel>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
