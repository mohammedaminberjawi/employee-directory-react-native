export function getFormattedDate(date: string) {
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}
