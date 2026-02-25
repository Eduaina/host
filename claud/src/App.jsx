import { useState } from "react";
import ArtisanLayout from "./layouts/ArtisanLayout/ArtisanLayout.jsx";
import Dashboard     from "./pages/artisan/Dashboard/Dashboard.jsx";
import Orders        from "./pages/artisan/Orders/Orders.jsx";
import NewOrder      from "./pages/artisan/NewOrder/NewOrder.jsx";
import OrderDetails  from "./pages/artisan/OrderDetails/OrderDetails.jsx";

const PAGE_META = {
  dashboard:     { title: "Dashboard",     subtitle: "Welcome back, Grace"       },
  orders:        { title: "Orders",        subtitle: "7 Orders"                  },
  "order-details": { title: "Order Details", subtitle: "Reviewing project details" },
  "new-order":   { title: "New Order",     subtitle: "Create a new client order" },
  clients:       { title: "Clients",       subtitle: "Your client directory"     },
  notifications: { title: "Notifications", subtitle: "Stay up to date"           },
  settings:      { title: "Settings",      subtitle: "Configure your workspace"  },
};

function PageContent({ activePage, onNavigate, orderId }) {
  if (activePage === "dashboard") return <Dashboard onNavigate={onNavigate} />;
  
  // Updated Orders navigation to pass the ID
  if (activePage === "orders")    return <Orders onViewOrder={(id) => onNavigate("order-details", id)} />;
  
  // New Page: Order Details
  if (activePage === "order-details") {
    return <OrderDetails orderId={orderId} onBack={() => onNavigate("orders")} />;
  }

  if (activePage === "new-order") return <NewOrder onBack={() => onNavigate("orders")} />;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "50vh", flexDirection: "column", gap: 12,
      fontFamily: "'DM Sans', sans-serif", color: "#8891aa",
    }}>
      <span style={{ fontSize: "3rem" }}>🚧</span>
      <p style={{ margin: 0, fontWeight: 600 }}>
        {PAGE_META[activePage]?.title} page coming soon
      </p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleNavigate = (pageId, orderId = null) => {
    setActivePage(pageId);
    if (orderId) setSelectedOrderId(orderId);
  };

  const meta = PAGE_META[activePage] || PAGE_META.dashboard;
  const sidebarPage = (activePage === "new-order" || activePage === "order-details") ? "orders" : activePage;

  return (
    <ArtisanLayout
      activePage={sidebarPage}
      onNavigate={handleNavigate}
      pageTitle={meta.title}
      pageSubtitle={meta.subtitle}
    >
      <PageContent 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        orderId={selectedOrderId} 
      />
    </ArtisanLayout>
  );
}