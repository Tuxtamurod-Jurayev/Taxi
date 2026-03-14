export default function Table({ columns, data, emptyMessage = "Malumot topilmadi" }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
