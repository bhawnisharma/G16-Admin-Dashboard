// Owner: Harshpreet - home page

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";
import { users, signupsLast7Days } from "../data/mockUsers.js";

function Card(props) {
  return (
    <div className="home-card">
      <span className="home-card__icon">{props.icon}</span>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}

function Counter(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const step = Math.ceil(props.end / 50) || 1;
    const timer = setInterval(() => {
      setValue((old) => {
        if (old + step >= props.end) {
          clearInterval(timer);
          return props.end;
        }
        return old + step;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [props.end]);

  return (
    <div className="home-counter">
      <h3>{value}</h3>
      <p>{props.label}</p>
    </div>
  );
}

const features = [
  { icon: "▥", title: "KPI cards", text: "Total users, gender split and average age, all calculated from the data." },
  { icon: "◔", title: "Four hand-drawn charts", text: "Line, bar, donut and stacked area, drawn as plain SVG with no library." },
  { icon: "▤", title: "A real data grid", text: "Search, column filters, sorting, pagination, row selection and CSV export." },
  { icon: "✎", title: "Add, edit, delete, undo", text: "A validated form, and a five second Undo after every delete." },
  { icon: "♜", title: "Admin and viewer roles", text: "Switch role and watch the admin-only buttons appear and disappear." },
  { icon: "◐", title: "Dark and light", text: "One click changes the whole theme, and it is remembered next time." },
];

const team = [
  { name: "Bhawni", part: "Setup, layout, loader" },
  { name: "Harshpreet", part: "Overview, charts, home page" },
  { name: "Manya", part: "Data grid, CSV export" },
  { name: "Priyanshi", part: "Forms, settings" },
];

const words = ["users", "signups", "roles", "growth"];

export default function Home() {
  const { theme, toggleTheme } = useContext(AppContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const word = words[wordIndex];
    if (count > word.length) {
      setCount(0);
      setWordIndex((wordIndex + 1) % words.length);
      return;
    }
    const delay = count === word.length ? 1400 : 110;
    const timer = setTimeout(() => setCount(count + 1), delay);
    return () => clearTimeout(timer);
  }, [count, wordIndex]);

  const featuresRef = useRef(null);
  function goToFeatures() {
    featuresRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const admins = users.filter((u) => u.role === "admin").length;
  let totalSignups = 0;
  signupsLast7Days.forEach((n) => {
    totalSignups = totalSignups + n;
  });

  return (
    <div className="home">
      <nav className="home__nav">
        <b className="home__brand"><span className="orbit-dot"></span>Orbit Analytics</b>
        <div>
          <button className="btn btn--ghost" onClick={toggleTheme}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <Link className="btn btn--primary" to="/overview">Dashboard</Link>
        </div>
      </nav>

      <header className="home__hero">
        <div className="home__hero-text">
          <h1>
            Watch your <span className="home__typed">{words[wordIndex].slice(0, count)}</span>
            <span className="home__cursor">|</span>
          </h1>
          <p>
            Orbit is our admin analytics dashboard. Open it to see KPIs, four charts and a full
            data grid for {users.length} users, all built with React.
          </p>
          <div className="home__actions">
            <Link className="btn btn--primary" to="/overview">Open dashboard</Link>
            <button className="btn btn--ghost" onClick={goToFeatures}>See what it does</button>
          </div>
        </div>
        <div className="home__sun" aria-hidden="true"></div>
      </header>

      <section className="home__strip">
        <Counter end={users.length} label="Users tracked" />
        <Counter end={admins} label="Admins" />
        <Counter end={totalSignups} label="Signups this week" />
        <Counter end={4} label="Charts" />
      </section>

      <section className="home__features" ref={featuresRef}>
        <h2>What is inside</h2>
        <div className="home__grid">
          {features.map((f, i) => (
            <Card key={i} icon={f.icon} title={f.title} text={f.text} />
          ))}
        </div>
      </section>

      <footer className="home__team">
        <h2>Built by Group 16</h2>
        <div className="home__people">
          {team.map((t) => (
            <p key={t.name}><b>{t.name}</b><br />{t.part}</p>
          ))}
        </div>
      </footer>
    </div>
  );
}
