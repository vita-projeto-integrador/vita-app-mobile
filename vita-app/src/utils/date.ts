export const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Indexado por Date.getDay(): 0 = domingo
export const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

// Todos os dias de um mês (month: 0 = janeiro), do dia 1 até o último
export function getDaysOfMonth(year: number, month: number) {
  const total = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: total }, (_, i) => new Date(year, month, i + 1));
}

// Início e fim do dia escolhido, no fuso do aparelho, em ISO 8601
export function getDayRange(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    from: new Date(year, month, day, 0, 0, 0, 0).toISOString(),
    to: new Date(year, month, day, 23, 59, 59, 999).toISOString(),
  };
}

// "16h26" (horário local)
export function formatTime(iso: string) {
  const date = new Date(iso);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}h${minutes}`;
}

// "22/10/2026" (data local)
export function formatDate(iso: string) {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}
