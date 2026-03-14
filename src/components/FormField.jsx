export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  required = true,
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        required={required}
      />
    </label>
  );
}
