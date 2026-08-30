import MonoLabel from './MonoLabel.jsx';

export default function SectionHeader({ id, index, kicker, title, lede, size = 'default' }) {
  return (
    <header className={`section-header section-header--${size}`}>
      {(index || kicker) && (
        <MonoLabel as="p" className="section-header__label">
          {index ? `${index} — ` : ''}
          {kicker}
        </MonoLabel>
      )}
      <h2 id={id} className="section-header__title">
        {title}
      </h2>
      {lede && <p className="section-header__lede">{lede}</p>}
    </header>
  );
}
