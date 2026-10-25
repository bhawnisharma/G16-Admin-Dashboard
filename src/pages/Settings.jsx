// Owner: Priyanshi - settings page
// Ye file kya karti hai: theme aur role badalne ka settings page hai
// Isme Context API ka useContext use hota hai
// Ye AppContext.jsx se theme aur role leti hai

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
