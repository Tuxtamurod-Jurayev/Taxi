import Table from "../components/Table";
import Loader from "../components/Loader";
import { useRoutes } from "../hooks/useRoutes";
import { aggregateDrivers } from "../utils/helpers";

export default function AdminDrivers() {
  const { routes, loading } = useRoutes();

  const drivers = aggregateDrivers(routes);
  const columns = [
    { key: "name", label: "Haydovchi" },
    { key: "phone", label: "Telefon" },
    { key: "car_model", label: "Mashina" },
    { key: "car_plate", label: "Raqam" },
    { key: "routes", label: "E'lonlar soni" },
    { key: "status", label: "Holat" },
  ];

  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">Taxi e'lonlari</p>
        <h1>Eng faol haydovchilar</h1>
      </section>

      {loading ? <Loader /> : <Table columns={columns} data={drivers} emptyMessage="Haydovchi topilmadi" />}
    </div>
  );
}
