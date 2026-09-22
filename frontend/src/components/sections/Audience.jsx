import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';

export default function Audience({ audience }) {
  return (
    <Section id="audience" surface="ink" labelledBy="audience-title">
      <Container>
        <SectionHeader
          id="audience-title"
          kicker={audience.kicker}
          title={audience.title}
          lede={audience.lede}
        />
        <ol className="audience-grid">
          {audience.areas.map((area) => (
            <li className="audience-item" key={area.number}>
              <MonoLabel>{area.number}</MonoLabel>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
