import Card from "../components/Card";
import Loader from "../components/Loader";
import { useRequests } from "../hooks/useRequests";
import { useRoutes } from "../hooks/useRoutes";
import { buildDashboardStats } from "../utils/helpers";

export default function AdminDashboard() {
  const { requests, loading: requestsLoading } = useRequests();
  const { routes, loading: routesLoading } = useRoutes();

  if (requestsLoading || routesLoading) {
    return <Loader label="Dashboard yuklanmoqda..." />;
  }

  const stats = buildDashboardStats(requests, routes);

  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">Boshqaruv</p>
        <h1>Asosiy ko'rsatkichlar</h1>
      </section>

      <section className="metric-grid">
        <Card title="Jami foydalanuvchilar" value={String(stats.totalUsers)} />
        <Card title="Jami yo'lovchi e'lonlari" value={String(stats.totalPassengers)} />
        <Card title="Jami taxi e'lonlari" value={String(stats.totalDrivers)} />
        <Card title="Bugungi so'rovlar" value={String(stats.todayRequests)} />
      </section>

      <section className="metric-grid">
        <Card
          title="Eng faol yo'lovchi"
          subtitle={stats.topPassenger ? stats.topPassenger.phone : "Ma'lumot yo'q"}
          value={stats.topPassenger ? String(stats.topPassenger.requests) : "0"}
        >
          <div className="detail-list">
            <span>{stats.topPassenger ? stats.topPassenger.name : "Hali e'lon yo'q"}</span>
          </div>
        </Card>
        <Card
          title="Eng faol taxi"
          subtitle={stats.topDriver ? stats.topDriver.phone : "Ma'lumot yo'q"}
          value={stats.topDriver ? String(stats.topDriver.routes) : "0"}
        >
          <div className="detail-list">
            <span>{stats.topDriver ? stats.topDriver.name : "Hali e'lon yo'q"}</span>
          </div>
        </Card>
      </section>
    </div>
  );
}
