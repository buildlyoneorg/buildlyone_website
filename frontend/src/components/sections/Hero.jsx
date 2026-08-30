import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';
import ButtonLink from '../primitives/ButtonLink.jsx';

export default function Hero({ hero, primaryAction, secondaryAction }) {
  return (
    <Section id="top" surface="ink" spacing="hero" rule={false}>
      <Container>
        <MonoLabel as="p" className="hero__kicker">{hero.kicker}</MonoLabel>
        <h1 className="hero__headline">{hero.headline}</h1>
        <div className="hero__body">
          {hero.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="hero__actions">
          <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          <a href={secondaryAction.href} className="textlink">{secondaryAction.label}</a>
        </div>
      </Container>
    </Section>
  );
}
