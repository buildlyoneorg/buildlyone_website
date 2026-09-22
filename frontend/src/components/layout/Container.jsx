/** Horizontal measure. `narrow` for prose-dominant sections. */
export default function Container({ size = 'default', as: Tag = 'div', className = '', children }) {
  return <Tag className={`container container--${size} ${className}`.trim()}>{children}</Tag>;
}
