import Card from "./Card";
import { SparkIcon } from "./Icons";
import { formatDateTime } from "../utils/formatTime";

export default function TaxiPassengers({ route, matches }) {
  if (!route) {
    return (
      <Card title="Matching natijasi" subtitle="Biror marshrut tanlang">
        <div className="empty-state">Marshrut tanlangandan keyin mos yolovchilar shu yerda chiqadi.</div>
      </Card>
    );
  }

  return (
    <Card
      title={`${route.from_location} -> ${route.to_location}`}
      subtitle="2 soat ichidagi mos yolovchilar"
      icon={<SparkIcon size={18} />}
    >
      {matches.length ? (
        <div className="matched-list">
          {matches.map((request) => (
            <div key={request.id} className="matched-item">
              <strong>{request.phone}</strong>
              <span>{formatDateTime(request.departure_time)}</span>
              <span>
                {`${request.from_location} -> ${request.to_location}`}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">Mos yolovchi topilmadi.</div>
      )}
    </Card>
  );
}
