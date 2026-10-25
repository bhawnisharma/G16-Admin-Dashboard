// Owner: Harshpreet - overview page, date range

import { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard.jsx";
import { LineChart, BarChart, DonutChart, StackedAreaChart } from "../components/Charts.jsx";
import { users, signupsLast7Days, cancellationsLast7Days, dayLabels } from "../data/mockUsers.js";

export default function Overview({ setPageName }) {
  useEffect(() => {
    setPageName("Overview");
  }, [setPageName]);

  const [days, setDays] = useState(7);
  const signups = signupsLast7Days.slice(-days);
  const cancels = cancellationsLast7Days.slice(-days);
  const labels = dayLabels.slice(-days);

  const totalUsers = users.length;
  const maleCount = users.filter((u) => u.gender === "male").length;
  const femaleCount = users.filter((u) => u.gender === "female").length;
  const avgAge = Math.round(users.reduce((sum, u) => sum + u.age, 0) / totalUsers);

  return (
    <div>
      <div className="range">
        {[3, 5, 7].map((d) => (
          <button key={d} className={`chip ${days === d ? "chip--active" : ""}`} onClick={() => setDays(d)}>
            Last {d} days
          </button>
        ))}
      </div>

      <section className="kpi-grid">
        <KpiCard label="Total users" value={totalUsers} trend={4.2} />
        <KpiCard label="Male users" value={maleCount} trend={1.1} />
        <KpiCard label="Female users" value={femaleCount} trend={-2.3} />
        <KpiCard label="Average age" value={avgAge} trend={0.5} />
      </section>

      <section className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-card__title">Signups (line)</h3>
          <LineChart data={signups} labels={labels} color="#4de1ff" />
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Signups (bar)</h3>
          <BarChart data={signups} labels={labels} color="#ffb84d" />
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Users by gender (donut)</h3>
          <DonutChart
            segments={[
              { label: "Male", value: maleCount, color: "#4de1ff" },
              { label: "Female", value: femaleCount, color: "#ff4d8d" },
            ]}
          />
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Signups vs cancellations (stacked area)</h3>
          <StackedAreaChart
            seriesA={signups}
            seriesB={cancels}
            labels={labels}
          />
        </div>
      </section>

      
      <section className="chart-card recent">
        <h3 className="chart-card__title">Newest users</h3>
        <ul className="recent__list">
          {users.slice(-5).reverse().map((u) => (
            <li key={u.id}>
              <span className="recent__avatar">{u.firstName[0]}</span>
              <span>
                <b>{u.firstName} {u.lastName}</b>
                <small>{u.email}</small>
              </span>
              <span className={`recent__role recent__role--${u.role}`}>{u.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
