import { format } from "date-fns";

const ALLOWED_MONDAY = "2025-09-15";
const BLOCKED_DAYS = [""]

export function isDateDisabled(date: Date, blockedDates: string[] = []): boolean {
  const formattedDate = format(date, "yyyy-MM-dd");
  const isAllowedMonday = formattedDate === ALLOWED_MONDAY && date.getDay() === 1;
  
  const allBlockedDays = [...BLOCKED_DAYS, ...blockedDates]


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