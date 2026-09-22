import MonoLabel from './MonoLabel.jsx';

/** The atom of the problem index and the method document. */
export default function NumberedRow({ number, title, meta, href, children }) {
  const Title = href ? 'a' : 'div';
  return (
    <li className="nrow">
      <MonoLabel className="nrow__number">{number}</MonoLabel>
      <div className="nrow__body">
        <Title {...(href ? { href } : {})} className="nrow__title">
          {title}
        </Title>
        {meta && <MonoLabel as="p" className="nrow__meta">{meta}</MonoLabel>}
        {children}
      </div>
    </li>
  );
}
