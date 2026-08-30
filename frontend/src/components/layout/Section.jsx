/**
 * A page band.
 *
 * `surface` writes data-surface, which is the entire sectional-invert
 * mechanism: the token layer remaps colour off that attribute, so no
 * child component needs an inverted variant.
 */
export default function Section({
  id,
  surface = 'paper',
  spacing = 'default',
  rule = true,
  labelledBy,
  className = '',
  children,
}) {
  return (
    <section
      id={id}
      data-surface={surface}
      aria-labelledby={labelledBy}
      className={`section section--${spacing} ${rule ? 'section--ruled' : ''} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
