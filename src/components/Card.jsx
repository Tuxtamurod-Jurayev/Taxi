export default function Card({ title, subtitle, value, children, action, icon }) {
  return (
    <section className="card">
      {(title || action) && (
        <div className="card-head">
          <div className="card-heading">
            <div className="card-title-row">
              {icon ? <span className="card-icon">{icon}</span> : null}
              {title ? <h3>{title}</h3> : null}
            </div>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {action}
        </div>
      )}

      {value ? <div className="metric-value">{value}</div> : null}
      {children}
    </section>
  );
}
