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
    <Section id="team" labelledBy="team-title">
      <Container>
        <SectionHeader id="team-title" kicker={team.kicker} title={team.title} lede={team.lede} />
        <ul className="people">
          {team.people.map((p) => <PersonCard key={p.id} person={p} />)}
        </ul>
      </Container>
    </Section>
  );
}
