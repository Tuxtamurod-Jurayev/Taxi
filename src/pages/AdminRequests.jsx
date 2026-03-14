import { useState } from "react";
import Modal from "../components/Modal";
import Table from "../components/Table";
import Loader from "../components/Loader";
import { useRequests } from "../hooks/useRequests";
import { aggregatePassengers } from "../utils/helpers";
import { formatDateTime } from "../utils/formatTime";

export default function AdminRequests() {
  const { requests, loading, deletingId, deleteRequest } = useRequests();
  const [selectedId, setSelectedId] = useState("");
  const topPassengers = aggregatePassengers(requests);

  const columns = [
    { key: "id", label: "ID" },
    { key: "passenger_name", label: "Yo'lovchi" },
    { key: "from_location", label: "Qayerdan" },
    { key: "to_location", label: "Qayerga" },
    {
      key: "departure_time",
      label: "Vaqt",
      render: (row) => formatDateTime(row.departure_time),
    },
    { key: "phone", label: "Telefon" },
    { key: "status", label: "Holat" },
    {
      key: "actions",
      label: "Amal",
      render: (row) => (
        <button type="button" className="danger-text-button" onClick={() => setSelectedId(row.id)}>
          Ochirish
        </button>
      ),
    },
  ];

  const topColumns = [
    { key: "name", label: "Yo'lovchi" },
    { key: "phone", label: "Telefon" },
    { key: "requests", label: "E'lonlar soni" },
    {
      key: "last_posted_at",
      label: "Oxirgi faollik",
      render: (row) => formatDateTime(row.last_posted_at),
    },
  ];

  const handleConfirmDelete = async () => {
    await deleteRequest(selectedId);
    setSelectedId("");
  };

  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">Yo'lovchi e'lonlari</p>
        <h1>Barcha so'rovlar</h1>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section>
            <h2>Eng ko'p e'lon qoldirgan yo'lovchilar</h2>
            <Table columns={topColumns} data={topPassengers} emptyMessage="Yo'lovchi topilmadi" />
          </section>

          <section>
            <h2>Barcha yo'lovchi so'rovlari</h2>
            <Table columns={columns} data={requests} />
          </section>
        </>
      )}

      <Modal
        open={Boolean(selectedId)}
        title="Zaprosni ochirish"
        description={
          deletingId === selectedId
            ? "Sorov ochirilmoqda..."
            : "Bu amal tanlangan passenger zaprosini royxatdan olib tashlaydi."
        }
        onCancel={() => setSelectedId("")}
        onConfirm={handleConfirmDelete}
        confirmLabel="Ochirish"
      />
    </div>
  );
}
