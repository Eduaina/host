import { useState } from "react";
import Icon from "../../components/Icon.jsx";
import { navLinks, currentUser } from "../../data/mockData.js";
import "./Sidebar.css";

export default function Sidebar({ activePage, onNavigate, mobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobileOpen" : ""}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <svg viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#6C63FF"/>
            <path d="M10 22 L16 8 L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.5 H19.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        {!collapsed && <span className="sidebar__logo-text">Fashion Link</span>}
        <button
          className="sidebar__collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          <Icon name={collapsed ? "menu" : "close"} />
        </button>
      </div>

      <div className="sidebar__divider" />

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`sidebar__nav-item ${activePage === link.id ? "active" : ""}`}
            onClick={() => onNavigate?.(link.id)}
            aria-current={activePage === link.id ? "page" : undefined}
          >
            <Icon name={link.icon} className="sidebar__nav-icon" />
            {!collapsed && <span className="sidebar__nav-label">{link.label}</span>}
          </button>
        ))}
      </nav>

      {/* User profile at bottom */}
      <div className="sidebar__user">
        <div className="sidebar__avatar">
          {currentUser.avatar
            ? <img src={currentUser.avatar} alt={currentUser.name} />
            : <span>{currentUser.name.charAt(0)}</span>
          }
        </div>
        {!collapsed && (
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">{currentUser.name}</p>
            <p className="sidebar__user-role">{currentUser.role}</p>
          </div>
        )}
        <button className="sidebar__logout-btn" aria-label="Log out">
          <Icon name="logout" />
        </button>
      </div>
    </aside>
  );
}
