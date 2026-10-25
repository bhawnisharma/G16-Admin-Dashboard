// Owner: Manya - CSV export

export function exportCsv(rows, columns, filename = "users.csv") {
  if (!rows.length) return;

  const header = columns.map((c) => c.label).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const csvContent = `${header}\n${body}`;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
