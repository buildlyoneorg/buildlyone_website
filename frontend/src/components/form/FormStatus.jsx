/**
 * The offline branch shows a real mailto and never claims the message
 * was stored, because nothing is stored client-side.
 */
export default function FormStatus({ status, message, fallbackEmail }) {
  if (status === 'idle' || status === 'submitting') return null;
  const tone = status === 'success' ? 'success' : 'error';

  return (
    <p className={`formstatus formstatus--${tone}`} role="status" aria-live="polite">
      {message}
      {status === 'offline' && (
        <>
          {' '}
          <a href={`mailto:${fallbackEmail}`} className="textlink">{fallbackEmail}</a>
        </>
      )}
    </p>
  );
}
