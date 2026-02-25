/**
 * ArtisanLayout.jsx
 * Root shell for all artisan pages.
 * Manages sidebar open/close state and passes toggle to Header.
 */
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Header  from "./Header.jsx";
import "./ArtisanLayout.css";

export default function ArtisanLayout({ activePage, onNavigate, pageTitle, pageSubtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="al">
      {/* Mobile overlay — tap to close sidebar */}
      {sidebarOpen && (
        <div
          className="al__overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        activePage={activePage}
        onNavigate={(id) => { onNavigate(id); setSidebarOpen(false); }}
        mobileOpen={sidebarOpen}
      />

      <div className="al__right">
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <main className="al__content">
          {children}
        </main>
      </div>
    </div>
  );
}
