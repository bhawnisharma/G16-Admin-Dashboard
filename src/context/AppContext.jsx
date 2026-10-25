// Owner: Bhawni - Context API for theme and role

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppState(props) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleRole = () => setRole((r) => (r === "admin" ? "viewer" : "admin"));

  return (
    <AppContext.Provider value={{ theme, toggleTheme, role, toggleRole }}>
      {props.children}
    </AppContext.Provider>
  );
}
