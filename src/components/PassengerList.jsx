import PassengerCard from "./PassengerCard";

export default function PassengerList({ requests }) {
  if (!requests.length) {
    return <div className="empty-state">Hozircha yolovchi sorovlari yoq.</div>;
  }

  return (
    <div className="stack-grid">
      {requests.map((request) => (
        <PassengerCard key={request.id} request={request} />
      ))}
    </div>
  );
}
