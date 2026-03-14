import { NavLink } from "react-router-dom";
import { PassengerIcon, ShieldIcon, SparkIcon, TaxiIcon } from "./Icons";

const items = [
  { to: "/admin/dashboard", label: "Boshqaruv", icon: <ShieldIcon size={18} /> },
  { to: "/admin/requests", label: "Yolovchilar", icon: <PassengerIcon size={18} /> },
  { to: "/admin/drivers", label: "Taxi yonalishlari", icon: <TaxiIcon size={18} /> },
  { to: "/admin/stats", label: "Statistika", icon: <SparkIcon size={18} /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-title">Admin bo'limi</p>
      <div className="sidebar-links">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            <span className="nav-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
