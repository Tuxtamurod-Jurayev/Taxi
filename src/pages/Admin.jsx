import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import FormField from "../components/FormField";
import { useAuth } from "../hooks/useAuth";

const initialState = {
  login: "",
  password: "",
};

export default function Admin() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = login(form.login, form.password);

    if (!success) {
      setError("Login yoki parol notogri.");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div className="page-stack narrow-page">
      <section className="page-heading">
        <p className="eyebrow">Admin kirish</p>
        <h1>Nazorat paneliga kirish</h1>
      </section>

      <Card title="Admin hisobiga kiring">
        <form className="form-grid" onSubmit={handleSubmit}>
          <FormField label="Login" name="login" value={form.login} onChange={handleChange} />
          <FormField
            label="Parol"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {error ? <div className="notice error">{error}</div> : null}
          <button type="submit" className="solid-button">
            Kirish
          </button>
        </form>
      </Card>
    </div>
  );
}
