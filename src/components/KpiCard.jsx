// Owner: Harshpreet - KPI card

export default function KpiCard({ label, value, trend }) {
  const isUp = trend >= 0;

  return (
    <div className="kpi-card">
      <p className="kpi-card__label">{label}</p>
      <div className="kpi-card__row">
        <h2 className="kpi-card__value">{value}</h2>
        <span className={`kpi-card__trend ${isUp ? "kpi-card__trend--up" : "kpi-card__trend--down"}`}>
          {isUp ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
      </div>
    </div>
  );
}
