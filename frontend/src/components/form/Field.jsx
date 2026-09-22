import MonoLabel from '../primitives/MonoLabel.jsx';

export default function Field({ field, value, onChange, disabled }) {
  const id = `field-${field.name}`;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const Tag = field.type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {field.label}
        {!field.required && <MonoLabel className="field__optional">Optional</MonoLabel>}
      </label>
      {field.hint && (
        <MonoLabel as="p" id={hintId} className="field__hint">{field.hint}</MonoLabel>
      )}
      <Tag
        id={id}
        name={field.name}
        className={`field__input ${field.type === 'textarea' ? 'field__input--area' : ''}`.trim()}
        {...(field.type === 'textarea' ? { rows: 6 } : { type: field.type })}
        value={value}
        onChange={onChange}
        required={field.required}
        disabled={disabled}
        maxLength={field.maxLength}
        autoComplete={field.autoComplete}
        aria-describedby={hintId}
      />
    </div>
  );
}
