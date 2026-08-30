import { useMemo, useState } from 'react';

/**
 * Intake form state.
 *
 * Values are initialised from the field definitions rather than a
 * hardcoded object, so the form and the content module cannot drift.
 *
 * The offline branch never claims the submission was stored, because it
 * was not. That was a real defect in the previous build.
 */
export default function useIntakeForm({ fields, endpoint = '/api/send', messages }) {
  const empty = useMemo(
    () => Object.fromEntries(fields.map((f) => [f.name, ''])),
    [fields],
  );

  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  // Honeypot. A real person never fills this; a bot fills everything.
  const [trap, setTrap] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (trap) return; // silently drop
    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage(messages.successMessage);
        setValues(empty);
        return;
      }

      // Only a 400 is the sender's to fix. Anything else is ours, and
      // telling someone to "check the required fields" when the server
      // is down sends them round a loop they cannot win — so those get
      // the fallback address instead.
      if (res.status === 400 && data.error) {
        setStatus('error');
        setMessage(data.error);
      } else {
        setStatus('offline');
        setMessage(messages.offlineMessage);
      }
    } catch {
      // fetch itself threw: no network, or nothing listening.
      setStatus('offline');
      setMessage(messages.offlineMessage);
    }
  };

  return {
    values,
    status,
    message,
    isSubmitting: status === 'submitting',
    trap,
    setTrap,
    onChange,
    onSubmit,
  };
}
