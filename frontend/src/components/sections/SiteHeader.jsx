import ButtonLink from '../primitives/ButtonLink.jsx';

export default function SiteHeader({ brand, nav }) {
  return (
    <header className="siteheader" data-surface="paper">
      <div className="container siteheader__inner">
        <a href="/" className="siteheader__brand">{brand}</a>
        <nav className="siteheader__nav" aria-label="Primary">
          {nav.items.map((item) => (
            <a key={item.href} href={item.href} className="siteheader__link">
              {item.label}
            </a>
          ))}
          <ButtonLink href={nav.action.href} className="siteheader__cta">
            {nav.action.label}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
