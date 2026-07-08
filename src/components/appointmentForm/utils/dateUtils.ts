import { format } from "date-fns";
import filterAvailableTimes, { TimeRule } from "./availableTimeUtils";

const ALLOWED_MONDAY = ["2026-06-22"];
const BLOCKED_DAYS = ["2026-06-24"];
const ANDRE_BLOCKED_DAYS = ["2026-06-20", "2026-06-24", "2026-10-03"];
const JI_BLOCKED_DAYS = ["2026-07-01", "2026-07-02"];
const PAULINHA_BLOCKED_DAYS = ["2026-07-15", "2026-07-18", "2026-08-04", "2026-08-13", "2026-08-14", "2026-08-15"];

export function isDateDisabled(
  date: Date,
  blockedDates: string[] = [],
  professionalName?: string,
): boolean {
  const formattedDate = format(date, "yyyy-MM-dd");
  const isAllowedMonday =
    ALLOWED_MONDAY.includes(formattedDate) && date.getDay() === 1;

  // Bloqueia domingos (0) e segundas (1), exceto a segunda específica
  if (!isAllowedMonday && (date.getDay() === 0 || date.getDay() === 1)) {
    return true;
  }

  const andreBlockedDays =
    professionalName === "André"
      ? [...ANDRE_BLOCKED_DAYS, ...blockedDates]
      : [...BLOCKED_DAYS];

  const jiBlockedDays =
    professionalName === "Ji"
      ? [...JI_BLOCKED_DAYS, ...blockedDates]
      : [...BLOCKED_DAYS];

  const paulinhaBlockedDays =
    professionalName === "Paulinha"
      ? [...PAULINHA_BLOCKED_DAYS, ...blockedDates]
      : [...BLOCKED_DAYS];

  // Datas bloqueadas manualmente
  if (andreBlockedDays.includes(formattedDate)) {
    return true;
  }

  if (jiBlockedDays.includes(formattedDate)) {
    return true;
  }

  if (paulinhaBlockedDays.includes(formattedDate)) {
    return true;
  }

  // Bloqueia datas passadas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Filter a list of times for a given professional using time rules.
 * - `times`: array of strings in "HH:mm" format
 * - `professionalName`: optional professional identifier
 * - `extraRules`: additional TimeRule entries to apply
 *
 * Returns filtered times preserving order.
 */
export function getFilteredTimes(
  times: string[],
  professionalName?: string,
  date?: string,
  extraRules: TimeRule[] = [],
): string[] {
  // Global Default rules. Adjust or extend as needed.
  const GLOBAL_DEFAULT_RULES: TimeRule[] = [
    { allowRanges: [{ from: "09:30", to: "12:30" }],
      days: ["2026-06-22"] },
  ];

  // Default rules per professional. Adjust or extend as needed.
  const PROFESSIONAL_DEFAULT_RULES: Record<string, TimeRule[]> = {
     Ji: [
      {
        professional: "Ji",
        blockRanges: [{ from: "14:30", to: "19:45" }],
        days: ["2026-06-30"],
      },
    ],
    Paulinha: [
      {
        professional: "Paulinha",
        blockRanges: [{ from: "14:30", to: "19:45" }],
        days: ["2026-07-17"],
      },
      {
        professional: "Paulinha",
        blockRanges: [{ from: "14:30", to: "19:45" }],
        days: ["2026-07-17"],
      },
    ]
  }; 

  const defaults = professionalName
    ? (PROFESSIONAL_DEFAULT_RULES[professionalName] ?? [])
    : [];
  const rules = [...GLOBAL_DEFAULT_RULES, ...defaults, ...extraRules];

  if (!rules || rules.length === 0) return times;

  return filterAvailableTimes(times, rules, professionalName, date);
}
