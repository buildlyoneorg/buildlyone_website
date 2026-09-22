import MonoLabel from './MonoLabel.jsx';

export default function StatLine({ stat }) {
  return (
    <div className="stat">
      <p className="stat__value">{stat.value}</p>
      <MonoLabel as="p" className="stat__label">{stat.label}</MonoLabel>
      <p className="stat__verify">{stat.verifiableBy}</p>
    </div>
  );
}
