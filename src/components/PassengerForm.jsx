import { useState } from "react";
import Card from "./Card";
import FormField from "./FormField";

const initialState = {
  passenger_name: "",
  from_location: "",
  to_location: "",
  departure_time: "",
  phone: "",
};

export default function PassengerForm({ onSubmit, loading, embedded = false }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm(initialState);
    }
  };

  const formContent = (
    <form className="form-grid" onSubmit={handleSubmit}>
      <FormField
        label="Ism"
        name="passenger_name"
        value={form.passenger_name}
        onChange={handleChange}
        placeholder="Masalan, Nodira"
      />
      <FormField
        label="Qayerdan"
        name="from_location"
        value={form.from_location}
        onChange={handleChange}
        placeholder="Masalan, Toshkent"
      />
      <FormField
        label="Qayerga"
        name="to_location"
        value={form.to_location}
        onChange={handleChange}
        placeholder="Masalan, Parkent"
      />
      <FormField
        label="Ketish vaqti"
        name="departure_time"
        type="datetime-local"
        value={form.departure_time}
        onChange={handleChange}
      />
      <FormField
        label="Telefon"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="+998 90 123 45 67"
      />
      <button type="submit" className="solid-button" disabled={loading}>
        {loading ? "Yuborilmoqda..." : "Zapros yuborish"}
      </button>
    </form>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <Card title="Yolovchi zaprosi" subtitle="Shahardan qishloqqa yoki aksincha yol sorovi qoldiring">
      {formContent}
    </Card>
  );
}
