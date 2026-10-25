// Owner: Priyanshi - settings page

import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

export default function Settings({ setPageName }) {
  const { theme, toggleTheme, role, toggleRole } = useContext(AppContext);
  useEffect(() => {
    setPageName("Settings");
  }, [setPageName]);

  return (
    <div>
      <h2>Settings</h2>

      <div className="settings-card">
        <div className="settings-card__row">
          <div>
            <strong>Theme</strong>
            <p>Currently: {theme}</p>
          </div>
          <button className="btn" onClick={toggleTheme}>
            Switch to {theme === "dark" ? "light" : "dark"}
          </button>
        </div>

        <div className="settings-card__row">
          <div>
            <strong>Role (for demo purposes)</strong>
            <p>Currently: {role}. Admins see extra actions like "+ Add user".</p>
          </div>
          <button className="btn" onClick={toggleRole}>
            Switch to {role === "admin" ? "viewer" : "admin"}
          </button>
        </div>
      </div>
    </div>
  );
}
