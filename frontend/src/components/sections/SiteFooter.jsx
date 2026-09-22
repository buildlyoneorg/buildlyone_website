import Container from '../layout/Container.jsx';
import MonoLabel from '../primitives/MonoLabel.jsx';

export default function SiteFooter({ footer, brand, email, phone, phoneLabel, nav }) {
  return (
    <footer className="sitefooter" data-surface="ink">
      <Container>
        <div className="sitefooter__top">
          <div>
            <p className="sitefooter__brand">{brand}</p>
            <p className="sitefooter__tagline">{footer.tagline}</p>
          </div>
          <nav className="sitefooter__nav" aria-label="Footer">
            {nav.items.map((i) => (
              <a key={i.href} href={i.href} className="sitefooter__link">{i.label}</a>
            ))}
            <a href={`mailto:${email}`} className="sitefooter__link">{email}</a>
            <a href={`tel:${phone}`} className="sitefooter__link">{phoneLabel}</a>
          </nav>
        </div>

        {/* The only place a capability list appears as a list. */}
        <div className="sitefooter__caps">
          <MonoLabel as="p" className="sitefooter__capsheading">{footer.capabilitiesHeading}</MonoLabel>
          <MonoLabel as="p" className="sitefooter__capslist">{footer.capabilities.join(' · ')}</MonoLabel>
        </div>

        <MonoLabel as="p" className="sitefooter__legal">{footer.legal}</MonoLabel>
      </Container>
    </footer>
  );
}
