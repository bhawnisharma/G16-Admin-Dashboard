// Owner: Bhawni - sidebar

import { NavLink } from "react-router-dom";

const links = [
  { to: "/overview", label: "Overview", icon: "◐" },
  { to: "/users", label: "Users", icon: "▤" },
  { to: "/settings", label: "Settings", icon: "⚙" },
  { to: "/", label: "Home page", icon: "⌂" },
];

export default function Sidebar({ collapsed, mobileOpen, onNavigate }) {
  return (
    <aside
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${
        mobileOpen ? "sidebar--mobile-open" : ""
      }`}
    >
      <div className="sidebar__logo">
        <span className="orbit-dot"></span>
        {!collapsed && <span>Orbit</span>}
      </div>

      <nav className="sidebar__nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            onClick={onNavigate}
            className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
          >
            <span className="sidebar__icon">{l.icon}</span>
            {!collapsed && l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
