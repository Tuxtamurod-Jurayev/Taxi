import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { useAuth } from "./hooks/useAuth";

const Home = lazy(() => import("./pages/Home"));
const Passenger = lazy(() => import("./pages/Passenger"));
const Taxi = lazy(() => import("./pages/Taxi"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminRequests = lazy(() => import("./pages/AdminRequests"));
const AdminDrivers = lazy(() => import("./pages/AdminDrivers"));
const AdminStats = lazy(() => import("./pages/AdminStats"));

function RequireAdmin({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function AppShell({ children, withSidebar = false }) {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        {withSidebar ? <Sidebar /> : null}
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<AppShell><Loader label="Sahifa yuklanmoqda..." /></AppShell>}>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <Home />
            </AppShell>
          }
        />
        <Route
          path="/passenger"
          element={
            <AppShell>
              <Passenger />
            </AppShell>
          }
        />
        <Route
          path="/taxi"
          element={
            <AppShell>
              <Taxi />
            </AppShell>
          }
        />
        <Route
          path="/admin"
          element={
            <AppShell>
              <Admin />
            </AppShell>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AppShell withSidebar>
                <AdminDashboard />
              </AppShell>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <RequireAdmin>
              <AppShell withSidebar>
                <AdminRequests />
              </AppShell>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/drivers"
          element={
            <RequireAdmin>
              <AppShell withSidebar>
                <AdminDrivers />
              </AppShell>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/stats"
          element={
            <RequireAdmin>
              <AppShell withSidebar>
                <AdminStats />
              </AppShell>
            </RequireAdmin>
          }
        />
      </Routes>
    </Suspense>
  );
}
