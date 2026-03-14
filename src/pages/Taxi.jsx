import { useEffect, useMemo, useState } from "react";
import TaxiForm from "../components/TaxiForm";
import TaxiRoutes from "../components/TaxiRoutes";
import TaxiPassengers from "../components/TaxiPassengers";
import PassengerList from "../components/PassengerList";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useRequests } from "../hooks/useRequests";
import { useRoutes } from "../hooks/useRoutes";
import { findMatchingPassengers } from "../utils/helpers";

export default function Taxi() {
  const { requests, loading: requestsLoading, error: requestsError } = useRequests();
  const { routes, loading: routesLoading, saving, error: routesError, createRoute } = useRoutes();
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedRouteId && routes.length) {
      setSelectedRouteId(routes[0].id);
    }
  }, [routes, selectedRouteId]);

  const selectedRoute = useMemo(
    () => routes.find((route) => route.id === selectedRouteId) || null,
    [routes, selectedRouteId],
  );

  const matches = useMemo(
    () => findMatchingPassengers(selectedRoute, requests),
    [selectedRoute, requests],
  );

  const handleSubmit = async (payload) => {
    const success = await createRoute(payload);

    if (success) {
      setIsModalOpen(false);
    }

    return success;
  };

  return (
    <div className="page-stack">
      <section className="page-heading page-heading-row">
        <div>
          <p className="eyebrow">Taxi modul</p>
          <h1>Yangi yo'lovchi e'lonlari</h1>
          <p>Avval yo'lovchi so'rovlarini ko'ring, keyin o'zingizning marshrutingizni joylang.</p>
        </div>
        <button type="button" className="solid-button" onClick={() => setIsModalOpen(true)}>
          Marshrut qo'shish
        </button>
      </section>

      {requestsError ? <div className="notice error">{requestsError}</div> : null}
      {routesError ? <div className="notice error">{routesError}</div> : null}

      <section>
        <h2>So'nggi yo'lovchi e'lonlari</h2>
        {requestsLoading ? <Loader /> : <PassengerList requests={requests} />}
      </section>

      <section>
        <h2>Mening marshrutlarim</h2>
        {routesLoading || requestsLoading ? (
          <Loader />
        ) : (
          <div className="layout-two-col">
            <TaxiRoutes
              routes={routes}
              selectedRouteId={selectedRouteId}
              onSelect={setSelectedRouteId}
              actionLabel="Mos yo'lovchilar"
            />
            <TaxiPassengers route={selectedRoute} matches={matches} />
          </div>
        )}
      </section>

      <Modal
        open={isModalOpen}
        title="Taxi marshruti qo'shish"
        description="Yo'nalish, vaqt va bo'sh joylarni kiriting."
        onCancel={() => setIsModalOpen(false)}
        cancelLabel="Yopish"
      >
        <div className="modal-form">
          <TaxiForm onSubmit={handleSubmit} loading={saving} embedded />
        </div>
      </Modal>
    </div>
  );
}
