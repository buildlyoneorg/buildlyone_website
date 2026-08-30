import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import NumberedRow from '../primitives/NumberedRow.jsx';

export default function ProblemIndex({ problems }) {
  return (
    <Section id="problems" labelledBy="problems-title">
      <Container>
        <SectionHeader
          id="problems-title"
          kicker="What is actually wrong"
          title="Four ways this shows up."
          lede="One of these is usually yours. They are listed in the order they tend to depend on each other, not in order of how loudly they complain."
        />
        <ol className="pindex">
          {problems.map((p) => (
            <NumberedRow
              key={p.id}
              number={p.number}
              title={p.symptom}
              href={`#problem-${p.id}`}
              meta={p.villain}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
