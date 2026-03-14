import Card from "./Card";
import { PassengerIcon } from "./Icons";
import { formatDateTime } from "../utils/formatTime";

export default function PassengerCard({ request }) {
  return (
    <Card
      title={`${request.from_location} -> ${request.to_location}`}
      subtitle={request.passenger_name || request.phone}
      icon={<PassengerIcon size={18} />}
    >
      <div className="detail-list">
        <span>Telefon: {request.phone}</span>
        <span>Ketish vaqti: {formatDateTime(request.departure_time)}</span>
        <span>Status: {request.status}</span>
      </div>
    </Card>
  );
}
