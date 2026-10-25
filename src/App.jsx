// Owner: Bhawni - app shell, routing, loading screen

import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppContext.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Overview from "./pages/Overview.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Home from "./pages/Home.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { users } from "./data/mockUsers.js";
import "./App.css";
import "./orbit.css";
import "./home.css";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function handleToggleSidebar() {
    if (window.innerWidth <= 768) {
      setMobileNavOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  }

  const { theme, toggleTheme, role, toggleRole } = useContext(AppContext);

  const [pageName, setPageName] = useState("Overview");

  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (isHome || booted) return;
    const serverCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.length > 0) {
          resolve(users);
        } else {
          reject("No users found");
        }
      }, 1800);
    });
    serverCall.then(() => setBooted(true)).catch((err) => console.log(err));
  }, [isHome, booted]);

  if (isHome) {
    return <Home />;
  }

  return (
    <div className="app-shell">
      {!booted && <LoadingScreen />}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileNavOpen}
        onNavigate={() => setMobileNavOpen(false)}
      />
      {mobileNavOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      <div className="app-shell__main">
        <Topbar
          onToggleSidebar={handleToggleSidebar}
          pageName={pageName}

        />

        <main className="page-content">
          <Routes>
            <Route path="/overview" element={<Overview setPageName={setPageName} />} />
            <Route path="/users" element={<Users setPageName={setPageName} role={role} />} />
            <Route path="/settings" element={<Settings setPageName={setPageName} />} />
            <Route path="*" element={<Navigate to="/overview" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
