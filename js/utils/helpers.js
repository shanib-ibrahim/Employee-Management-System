export function exportJSON(data) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  download(blob, "employees.json");
}

export function exportCSV(data) {
  const csv = data
    .map((e) => `${e.id},${e.name},${e.role},${e.department}`)
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  download(blob, "employees.csv");
}

function download(blob, fileName) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
}
