import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';

function PersonCard({ person }) {
  return (
    <li className="person">
      <h3 className="person__name">{person.name}</h3>
      <MonoLabel as="p" className="person__role">{person.role}</MonoLabel>
      <p className="person__focus">{person.focus}</p>
    </li>
  );
}

export default function Team({ team }) {
  return (
    <Section id="engagement" labelledBy="engagement-title">
      <Container>
        <SectionHeader id="engagement-title" kicker={team.kicker} title={team.title} lede={team.lede} />
        <ul className="people">
          {team.people.map((p) => <PersonCard key={p.id} person={p} />)}
          {team.principles.map((principle) => (
            <li className="person" key={principle.id}>
              <h3 className="person__name">{principle.title}</h3>
              <p className="person__focus">{principle.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
