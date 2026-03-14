import { useState } from "react";
import Card from "./Card";
import FormField from "./FormField";

const initialState = {
  driver_name: "",
  driver_phone: "",
  car_model: "",
  car_plate: "",
  from_location: "",
  to_location: "",
  departure_time: "",
  seats: 1,
};

export default function TaxiForm({ onSubmit, loading, embedded = false }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "seats" ? Number(value) : value }));
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
        label="Haydovchi ismi"
        name="driver_name"
        value={form.driver_name}
        onChange={handleChange}
        placeholder="Masalan, Azizbek"
      />
      <FormField
        label="Telefon"
        name="driver_phone"
        value={form.driver_phone}
        onChange={handleChange}
        placeholder="+998 90 000 00 00"
      />
      <FormField
        label="Mashina nomi"
        name="car_model"
        value={form.car_model}
        onChange={handleChange}
        placeholder="Masalan, Damas"
      />
      <FormField
        label="Mashina raqami"
        name="car_plate"
        value={form.car_plate}
        onChange={handleChange}
        placeholder="Masalan, 50T009PA"
      />
      <FormField
        label="Qayerdan"
        name="from_location"
        value={form.from_location}
        onChange={handleChange}
        placeholder="Masalan, Andijon"
      />
      <FormField
        label="Qayerga"
        name="to_location"
        value={form.to_location}
        onChange={handleChange}
        placeholder="Masalan, Marhamat"
      />
      <FormField
        label="Ketish vaqti"
        name="departure_time"
        type="datetime-local"
        value={form.departure_time}
        onChange={handleChange}
      />
      <FormField
        label="Joylar soni"
        name="seats"
        type="number"
        min="1"
        value={form.seats}
        onChange={handleChange}
      />
      <button type="submit" className="solid-button" disabled={loading}>
        {loading ? "Saqlanmoqda..." : "Marshrut qoshish"}
      </button>
    </form>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <Card title="Taxi marshruti" subtitle="Haydovchi oz yo nalishini va bosh joylarini kiritsin">
      {formContent}
    </Card>
  );
}
