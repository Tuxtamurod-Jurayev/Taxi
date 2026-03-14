export default function Modal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "Tasdiqlash",
  cancelLabel = "Bekor qilish",
  children,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {title ? <h3>{title}</h3> : null}
        {description ? <p>{description}</p> : null}
        {children}
        {onCancel || onConfirm ? (
          <div className="modal-actions">
            {onCancel ? (
              <button type="button" className="ghost-button" onClick={onCancel}>
                {cancelLabel}
              </button>
            ) : null}
            {onConfirm ? (
              <button type="button" className="danger-button" onClick={onConfirm}>
                {confirmLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
