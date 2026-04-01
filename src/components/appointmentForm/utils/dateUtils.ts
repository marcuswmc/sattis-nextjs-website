import { format } from "date-fns";

const ALLOWED_MONDAY = ["2025-12-22", "2025-12-29"];
const BLOCKED_DAYS = [
  "2026-04-25",
  "2026-05-02",
];

export function isDateDisabled(
  date: Date,
  blockedDates: string[] = [],
  professionalName?: string
): boolean {
  const formattedDate = format(date, "yyyy-MM-dd");
  const isAllowedMonday =
    ALLOWED_MONDAY.includes(formattedDate) && date.getDay() === 1;

  // Bloqueia domingos (0) e segundas (1), exceto a segunda específica
  if (!isAllowedMonday && (date.getDay() === 0 || date.getDay() === 1)) {
    return true;
  }

  // Datas bloqueadas manualmente
  if (BLOCKED_DAYS.includes(formattedDate)) {
    return true;
  }

  // Bloqueia datas passadas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
