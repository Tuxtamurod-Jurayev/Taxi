import { useState } from "react";
import PassengerForm from "../components/PassengerForm";
import PassengerList from "../components/PassengerList";
import TaxiRoutes from "../components/TaxiRoutes";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useRequests } from "../hooks/useRequests";
import { useRoutes } from "../hooks/useRoutes";

export default function Passenger() {
  const { requests, loading, saving, error, createRequest } = useRequests();
  const { routes, loading: routesLoading } = useRoutes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (payload) => {
    const success = await createRequest(payload);

    if (success) {
      setIsModalOpen(false);
    }

    return success;
  };

  return (
    <div className="page-stack">
      <section className="page-heading page-heading-row">
        <div>
          <p className="eyebrow">Passenger modul</p>
          <h1>Yaqin qo'yilgan taxi e'lonlari</h1>
          <p>Avval mavjud yo'nalishlarni ko'ring, kerak bo'lsa o'zingiz ham so'rov qoldiring.</p>
        </div>
        <button type="button" className="solid-button" onClick={() => setIsModalOpen(true)}>
          E'lon qo'shish
        </button>
      </section>

      {error ? <div className="notice error">{error}</div> : null}

      <section>
        <h2>So'nggi taxi e'lonlari</h2>
        {routesLoading ? <Loader /> : <TaxiRoutes routes={routes} browseMode />}
      </section>

      <section>
        <h2>Mening so'rovlarim</h2>
        {loading ? <Loader /> : <PassengerList requests={requests} />}
      </section>

      <Modal
        open={isModalOpen}
        title="Yo'lovchi e'loni qo'shish"
        description="Kerakli yo'nalish va ketish vaqtini kiriting."
        onCancel={() => setIsModalOpen(false)}
        cancelLabel="Yopish"
      >
        <div className="modal-form">
          <PassengerForm onSubmit={handleSubmit} loading={saving} embedded />
        </div>
      </Modal>
    </div>
  );
}
