import StatusBadge from "../../StatusBadge/StatusBadge";
import "./OrderCard.css";

export default function OrderCard({ order, onView }) {
  return (
    <div className="oc" onClick={() => onView?.(order)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onView?.(order)}
      aria-label={`View order ${order.id}`}
    >
      {/* Image */}
      <div className="oc__image-wrap">
        <img
          className="oc__image"
          src={order.image}
          alt={`${order.client} style reference`}
          loading="lazy"
        />
        <div className="oc__id-row">
          <span className="oc__id">{order.id}</span>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Body */}
      <div className="oc__body">
        <h3 className="oc__client">{order.client}</h3>
        <p className="oc__desc">{order.description}</p>

        <div className="oc__footer">
          <span className="oc__delivery">
            {/* Inline calendar SVG — explicit 14x14 prevents size bugs */}
            <svg className="oc__delivery-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Due {order.delivery}
          </span>

          <span className="oc__arrow" aria-hidden="true">
            {/* Inline arrowRight SVG — explicit 16x16 */}
            <svg className="oc__arrow-icon" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
