import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useRequests } from "../hooks/useRequests";
import { buildChartData } from "../utils/helpers";

export default function AdminStats() {
  const { requests, loading } = useRequests();

  if (loading) {
    return <Loader label="Statistika yuklanmoqda..." />;
  }

  const { daily, weekly, monthly } = buildChartData(requests);

  return (
    <div className="page-stack">
      <section className="page-heading">
        <p className="eyebrow">Statistika</p>
        <h1>Kunlik, haftalik va oylik so'rovlar</h1>
      </section>

      <div className="chart-grid">
        <Card title="Kunlik so'rovlar">
          <Chart data={daily} />
        </Card>
        <Card title="Haftalik so'rovlar">
          <Chart data={weekly} />
        </Card>
        <Card title="Oylik so'rovlar">
          <Chart data={monthly} />
        </Card>
      </div>
    </div>
  );
}

function Chart({ data }) {
  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#34504d" />
          <XAxis dataKey="label" stroke="#d9e8d7" />
          <YAxis stroke="#d9e8d7" allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" name="So'rovlar" stroke="#ff9b54" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
