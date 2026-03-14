function IconBase({ children, size = 20, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

export function SunIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5" />
      <path d="M12 19.5V22" />
      <path d="M4.93 4.93l1.77 1.77" />
      <path d="M17.3 17.3l1.77 1.77" />
      <path d="M2 12h2.5" />
      <path d="M19.5 12H22" />
      <path d="M4.93 19.07l1.77-1.77" />
      <path d="M17.3 6.7l1.77-1.77" />
    </IconBase>
  );
}

export function MoonIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M20 15.2A7.8 7.8 0 0 1 8.8 4 9 9 0 1 0 20 15.2z" />
    </IconBase>
  );
}

export function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.8V20h14V9.8" />
      <path d="M10 20v-6h4v6" />
    </IconBase>
  );
}

export function PassengerIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
    </IconBase>
  );
}

export function TaxiIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 16l1.2-5a2 2 0 0 1 2-1.5h7.6a2 2 0 0 1 2 1.5L19 16" />
      <path d="M4 16h16" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
      <path d="M8 9l1.2-3h5.6L16 9" />
    </IconBase>
  );
}

export function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l7 3v5c0 5.2-3 8.3-7 10-4-1.7-7-4.8-7-10V6l7-3z" />
    </IconBase>
  );
}

export function SparkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 2l1.7 4.7L18 8.4l-4.3 1.6L12 14.8 10.3 10 6 8.4l4.3-1.7L12 2z" />
      <path d="M5 15l.9 2.1L8 18l-2.1.9L5 21l-.9-2.1L2 18l2.1-.9L5 15z" />
      <path d="M19 14l.7 1.6L21 16.3l-1.3.6L19 18.5l-.7-1.6-1.3-.6 1.3-.7L19 14z" />
    </IconBase>
  );
}

export function ClockIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 2" />
    </IconBase>
  );
}

export function PhoneIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7.5 4.5h3L12 8l-2 1.8a15 15 0 0 0 4.2 4.2L16 12l3.5 1.5v3c0 .7-.5 1.3-1.2 1.4a14.6 14.6 0 0 1-12.2-12.2c.1-.7.7-1.2 1.4-1.2z" />
    </IconBase>
  );
}
