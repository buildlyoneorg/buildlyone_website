import MonoLabel from './MonoLabel.jsx';

export default function NumberedList({ items, variant = 'signal' }) {
  return (
    <ol className={`nlist nlist--${variant}`}>
      {items.map((item, i) => (
        <li key={i} className="nlist__item">
          <MonoLabel className="nlist__number">{String(i + 1).padStart(2, '0')}</MonoLabel>
          <span className="nlist__text">{item}</span>
        </li>
      ))}
    </ol>
  );
}
