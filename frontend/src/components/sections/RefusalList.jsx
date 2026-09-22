import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import ButtonLink from '../primitives/ButtonLink.jsx';

export function RefusalPreview({ refusals }) {
  return (
    <Section id="refusals" labelledBy="refusals-preview-title">
      <Container size="narrow">
        <SectionHeader
          id="refusals-preview-title"
          kicker="Boundaries"
          title="Four things we will not build."
          lede="The boundary matters because each item below is work we could invoice for and should still decline."
        />
        <ul className="refusals">
          {refusals.map((item) => (
            <li className="refusal" key={item.statement}>
              <p className="refusal__statement">{item.statement}</p>
              <p className="refusal__reason">{item.reason}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href="/method#refusals" className="refusal-preview__cta">Read every boundary</ButtonLink>
      </Container>
    </Section>
  );
}

/**
 * What we will not build.
 *
 * A refusal that costs nothing is marketing. Each of these is work a
 * less careful firm would take money for, which is what makes the list
 * worth reading.
 */
export default function RefusalList({ refusals, problems }) {
  const all = [
    ...problems.flatMap((p) => p.avoid.map((r) => ({ ...r, from: p.symptom }))),
    ...refusals.map((r) => ({ ...r, from: null })),
  ];

  return (
    <Section id="refusals" labelledBy="refusals-title">
      <Container size="narrow">
        <SectionHeader
          id="refusals-title"
          kicker="Boundaries"
          title="What we will not build."
          lede="Collected from the four problems above, plus two that apply to everything. Each one costs us work we would otherwise be paid for. That is the point of writing them down."
        />
        <ul className="refusals">
          {all.map((r, i) => (
            <li key={i} className="refusal">
              <p className="refusal__statement">{r.statement}</p>
              <p className="refusal__reason">{r.reason}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
