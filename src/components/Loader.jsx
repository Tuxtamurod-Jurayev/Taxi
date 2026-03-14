export default function Loader({ label = "Yuklanmoqda..." }) {
  return (
    <div className="loader">
      <div className="loader-dot" />
      <span>{label}</span>
    </div>
  );
}
