import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  CloseIcon,
  HomeIcon,
  MenuIcon,
  MoonIcon,
  PassengerIcon,
  ShieldIcon,
  SunIcon,
  TaxiIcon,
} from "./Icons";

const navLinks = [
  { to: "/", label: "Bosh sahifa", icon: <HomeIcon size={18} /> },
  { to: "/passenger", label: "Yolovchi", icon: <PassengerIcon size={18} /> },
  { to: "/taxi", label: "Taxi", icon: <TaxiIcon size={18} /> },
  { to: "/admin", label: "Admin", icon: <ShieldIcon size={18} /> },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("qatnov-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("qatnov-theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand-mark">
        <div>
          <strong>Qatnov</strong>
          <small>Tez yo'nalish va buyurtma paneli</small>
        </div>
      </Link>

      <div className="nav-tools">
        <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Theme toggle">
          {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
        <button
          type="button"
          className="icon-button menu-toggle"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="Menu toggle"
        >
          {isMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </div>

      <nav className={isMenuOpen ? "nav-links open" : "nav-links"}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <span className="nav-link-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {isAdmin ? (
        <div className="nav-actions">
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Chiqish
          </button>
        </div>
      ) : null}
    </header>
  );
}
