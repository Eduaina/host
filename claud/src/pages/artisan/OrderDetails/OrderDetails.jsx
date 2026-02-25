import React from 'react';
import Icon from "../../../components/Icon.jsx";
import StatusBadge from "../../../components/StatusBadge/StatusBadge.jsx";
import { allOrders } from "../../../data/mockData.js";
import "./OrderDetails.css";

export default function OrderDetails({ orderId, onBack }) {
  // Find the specific order that matches the ID passed from App.jsx
  const order = allOrders.find((o) => o.id === orderId);

  // Fallback if no order is found
  if (!order) {
    return (
      <div className="od-error">
        <p>Order not found.</p>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="od">
      <div className="od__top-nav">
        <button className="od__back-btn" onClick={onBack}>
          <Icon name="arrowLeft" /> Back to orders
        </button>
        <div className="od__actions">
          <button className="od__action-btn"><Icon name="edit" /> Edit</button>
          <button className="od__action-btn od__action-btn--delete">
            <Icon name="trash" /> Delete
          </button>
        </div>
      </div>

      <div className="od__grid">
        <div className="od__main">
          <div className="od__ai-box">
            <div className="od__ai-header">
              <Icon name="star" /> Smart Order Summary <span className="od__ai-tag">AI</span>
            </div>
            <p>{order.description}. Client prefers high-quality finishing and specific gold thread embroidery.</p>
          </div>

          <section className="od__section">
            <h3 className="od__section-title">Order Details</h3>
            <div className="od__details-grid">
              <div className="od__info-item">
                <Icon name="user" />
                <div><label>CLIENT</label><p>{order.client}</p></div>
              </div>
              <div className="od__info-item">
                <Icon name="calendar" />
                <div><label>DELIVERY DATE</label><p>{order.deliveryDate || order.delivery}</p></div>
              </div>
              <div className="od__info-item">
                <Icon name="fileText" />
                <div><label>DESCRIPTION</label><p>{order.description}</p></div>
              </div>
              <div className="od__info-item">
                <Icon name="edit" />
                <div><label>NOTES</label><p>Client prefers gold thread embroidery</p></div>
              </div>
            </div>
          </section>

          <section className="od__section">
            <h3 className="od__section-title"><Icon name="ruler" /> Measurement (inches)</h3>
            <div className="od__measurements">
              {['Chest', 'Waist', 'Hip', 'Shoulder', 'Length', 'Sleeve'].map(label => (
                <div key={label} className="od__measure-field">
                  <label>{label}</label>
                  <input type="text" placeholder="--" defaultValue="35" readOnly />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="od__sidebar">
          <div className="od__side-card">
            <h4>Status</h4>
            <select className="od__status-select" defaultValue={order.status}>
              <option>{order.status}</option>
              <option>Completed</option>
            </select>
            <div className="od__status-display">
              <StatusBadge status={order.status} />
              <div className="od__stepper">
                 <div className="od__step od__step--done">Order Assigned</div>
                 <div className="od__step od__step--active">Work in Progress</div>
                 <div className="od__step">Order Completed</div>
              </div>
            </div>
          </div>

          <div className="od__side-card">
            <h4>Style Reference</h4>
            <div className="od__reference-img">
              <img src={order.image} alt="Style Reference" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}