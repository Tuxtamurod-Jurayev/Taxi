import Card from "./Card";
import { TaxiIcon } from "./Icons";
import { formatDateTime } from "../utils/formatTime";

export default function TaxiRoutes({
  routes,
  onSelect,
  selectedRouteId,
  actionLabel = "Mos yolovchilar",
  browseMode = false,
}) {
  if (!routes.length) {
    return <div className="empty-state">Hozircha taxi marshrutlari yoq.</div>;
  }

  return (
    <div className="stack-grid">
      {routes.map((route) => (
        <Card
          key={route.id}
          title={`${route.from_location} -> ${route.to_location}`}
          subtitle={route.driver_name || `Joy: ${route.seats}`}
          icon={<TaxiIcon size={18} />}
          action={
            browseMode || !onSelect ? null : (
              <button
                type="button"
                className={selectedRouteId === route.id ? "ghost-button active-toggle" : "ghost-button"}
                onClick={() => onSelect(route.id)}
              >
                {selectedRouteId === route.id ? "Tanlangan" : actionLabel}
              </button>
            )
          }
        >
          <div className="detail-list">
            <span>Mashina: {route.car_model || "Mashina kiritilmagan"}</span>
            <span>Raqam: {route.car_plate || "Raqam kiritilmagan"}</span>
            <span>Telefon: {route.driver_phone || "Telefon kiritilmagan"}</span>
            <span>Ketish vaqti: {formatDateTime(route.departure_time)}</span>
            <span>Bo'sh joy: {route.seats}</span>
            <span>Status: {route.status}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
