/**
 * Two variants and no third. There is never more than one `primary` on
 * screen at once: the secondary affordance on this site is a text link,
 * not a second button.
 */
export default function ButtonLink({ href, variant = 'primary', className = '', children }) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`.trim()}>
      {children}
    </a>
  );
}
