import { useState } from "react";
import StatCard    from "../../../components/UIDashboard/StatCard/StatCard.jsx";
import AICard      from "../../../components/UIDashboard/AICard/AICard.jsx";
import OrdersTable from "../../../components/UIDashboard/OrdersTable/OrdersTable.jsx";
import Icon        from "../../../components/Icon.jsx";
import { dashboardStats, upcomingOrders, aiAlerts } from "../../../data/mockData.js";
import "./Dashboard.css";

export default function Dashboard({ onNavigate }) {
  const [orders] = useState(upcomingOrders);

  return (
    <div className="dash">
      {/* Stat cards grid */}
      <div className="dash__stats">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* AI cards row */}
      <div className="dash__ai-row">
        <AICard title="Deadline Risk Alert">
          <p>{aiAlerts.deadlineRisk.summary}</p>
        </AICard>

        <div className="dash__ai-right">
          <AICard title="Workload Summary">
            <p>{aiAlerts.workloadSummary.summary}</p>
          </AICard>

          <button className="dash__add-btn" onClick={() => onNavigate?.("new-order")}>
            <Icon name="plus" />
            Add New Order
          </button>
        </div>
      </div>

      {/* Orders table section */}
      <OrdersTable
        orders={orders}
        onView={(order) => console.log("View:", order.id)}
        onViewAll={() => onNavigate?.("orders")}
      />
    </div>
  );
}