import { format } from "date-fns";

const ALLOWED_MONDAY = ["2025-12-22", "2025-12-29"];
const BLOCKED_DAYS = [
  "2026-02-17",
  "2026-02-18",
  "2026-02-19",
  "2026-02-20",
  "2026-02-21",
];

export function isDateDisabled(
  date: Date,
  blockedDates: string[] = [],
  professionalName?: string
): boolean {
  const formattedDate = format(date, "yyyy-MM-dd");
  const isAllowedMonday =
    ALLOWED_MONDAY.includes(formattedDate) && date.getDay() === 1;

  // Só bloqueia os dias fixos se o profissional for a Paulinha
  const allBlockedDays =
    professionalName === "Paulinha"
      ? [...BLOCKED_DAYS, ...blockedDates]
      : blockedDates;

  // Bloqueia domingos (0) e segundas (1), exceto a segunda específica
  if (!isAllowedMonday && (date.getDay() === 0 || date.getDay() === 1)) {
    return true;
  }

  // Datas bloqueadas manualmente
  if (allBlockedDays.includes(formattedDate)) {
    return true;
  }

  // Bloqueia datas passadas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
