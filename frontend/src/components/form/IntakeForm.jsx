import useIntakeForm from '../../hooks/useIntakeForm.js';
import Field from './Field.jsx';
import FormStatus from './FormStatus.jsx';

export default function IntakeForm({ intake }) {
  const form = useIntakeForm({
    fields: intake.fields,
    messages: intake,
  });

  return (
    <form className="intakeform" onSubmit={form.onSubmit} noValidate={false}>
      {intake.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={form.values[field.name]}
          onChange={form.onChange}
          disabled={form.isSubmitting}
        />
      ))}

      {/* Honeypot. Off-screen rather than display:none so bots fill it. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="field-company-website">Do not fill this in</label>
        <input
          id="field-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.trap}
          onChange={(e) => form.setTrap(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn--primary" disabled={form.isSubmitting}>
        {form.isSubmitting ? intake.submitPendingLabel : intake.submitLabel}
      </button>

      <FormStatus
        status={form.status}
        message={form.message}
        fallbackEmail={intake.fallbackEmail}
      />
    </form>
  );
}
