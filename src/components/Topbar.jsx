// Owner: Bhawni - topbar, live clock

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  let word = "evening";
  if (hour < 12) {
    word = "morning";
  } else if (hour < 17) {
    word = "afternoon";
  }

  return (
    <div className="clock">
      <span className="clock__greeting">Good {word}, team</span>
      <b className="clock__time">{now.toLocaleTimeString()}</b>
    </div>
  );
}

export default function Topbar({ onToggleSidebar, pageName }) {
  const { theme, toggleTheme, role, toggleRole } = useContext(AppContext);
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <span className="breadcrumb">Dashboard / {pageName}</span>
      </div>

      <div className="topbar__right">
        <Clock />
        <button className="pill-btn" onClick={toggleRole}>
          Role: {role}
        </button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
