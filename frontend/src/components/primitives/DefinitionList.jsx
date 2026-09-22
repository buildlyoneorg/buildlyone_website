export default function DefinitionList({ items, variant = 'stacked' }) {
  return (
    <dl className={`dlist dlist--${variant}`}>
      {items.map((item, i) => (
        <div key={i} className="dlist__pair">
          <dt className="dlist__term">{item.term}</dt>
          <dd className="dlist__detail">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
