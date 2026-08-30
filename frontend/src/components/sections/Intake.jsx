import Section from '../layout/Section.jsx';
import Container from '../layout/Container.jsx';
import SectionHeader from '../primitives/SectionHeader.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';
import NumberedList from '../primitives/NumberedList.jsx';
import IntakeForm from '../form/IntakeForm.jsx';

export default function Intake({ intake }) {
  return (
    <Section id="start" labelledBy="start-title">
      <Container>
        <SectionHeader
          id="start-title"
          kicker={intake.kicker}
          title={intake.title}
          lede={intake.lede}
          size="large"
        />
        <div className="intake">
          <div className="intake__aside">
            <MonoLabel as="h3" className="beat">What happens next</MonoLabel>
            <NumberedList items={intake.whatHappensNext} variant="plain" />
            <p className="intake__promise">{intake.responsePromise}</p>
            <MonoLabel as="p" className="intake__privacy">{intake.privacyNote}</MonoLabel>
          </div>
          <div className="intake__form">
            <IntakeForm intake={intake} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
