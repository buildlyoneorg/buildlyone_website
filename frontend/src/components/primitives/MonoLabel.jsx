/**
 * The mono layer's single entry point. Every number, kicker, index,
 * stack tag and caption on the site renders through this.
 *
 * `tone` defaults to secondary and should stay there: mono renders at
 * 11-12px and --fg-muted is only ~3.0:1 on paper.
 */
export default function MonoLabel({ children, as: Tag = 'span', tone = 'secondary', className = '' }) {
  return <Tag className={`mono mono--${tone} ${className}`.trim()}>{children}</Tag>;
}
