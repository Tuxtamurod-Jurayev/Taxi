import { Link } from "react-router-dom";
import Card from "../components/Card";
import { ClockIcon, PassengerIcon, SparkIcon, TaxiIcon } from "../components/Icons";

const featureCards = [
  {
    title: "Tez buyurtma",
    subtitle: "E'lonlar modal ichida bir necha soniyada joylanadi",
    icon: <SparkIcon size={18} />,
  },
  {
    title: "1 soatlik faol blok",
    subtitle: "Qo'yilgan har bir buyurtma va taxi e'loni 1 soatda yo'qoladi",
    icon: <ClockIcon size={18} />,
  },
];

export default function Home() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Shahar {"->"} qishloq transport boshqaruvi</p>
          <p>
            Yo'lovchi ham, taxi haydovchi ham e'lonni tez joylaydi. Faol buyurtmalar tartibli
            ko'rinadi va eski bloklar avtomatik tozalanadi.
          </p>
          <div className="hero-actions">
            <Link to="/passenger" className="solid-button">
              <PassengerIcon size={18} /> Yo'lovchi bo'limi
            </Link>
            <Link to="/taxi" className="ghost-button">
              <TaxiIcon size={18} /> Taxi bo'limi
            </Link>
          </div>
        </div>
        <div className="hero-panel home-feature-grid">
          {featureCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              icon={card.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
