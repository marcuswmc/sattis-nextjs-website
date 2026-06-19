// Utilities to filter available times per professional using allow/block rules
// Time format used: "HH:mm" (24-hour)

export type Time = string; // "HH:mm"

export type TimeRange = {
  from: Time; // inclusive
  to: Time; // inclusive
};

export interface TimeRule {
  professional?: string; // if set, rule applies only to this professional
  days?: string[]; // optional list of specific days (yyyy-MM-dd) when this rule applies
  allowRanges?: TimeRange[]; // if provided, only times within any allowRanges are kept (whitelist)
  blockRanges?: TimeRange[]; // times within these ranges will be removed
  blockTimes?: Time[]; // exact times to remove
}

function timeToMinutes(t: Time): number {
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr ?? 0);
  const m = Number(mStr ?? 0);
  return h * 60 + m;
}

function isInRange(timeMin: number, range: TimeRange): boolean {
  const from = timeToMinutes(range.from);
  const to = timeToMinutes(range.to);
  return timeMin >= from && timeMin <= to;
}

function mergeRanges(ranges: TimeRange[]): [number, number][] {
  const mins = ranges
    .map((r) => [timeToMinutes(r.from), timeToMinutes(r.to)] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const r of mins) {
    if (!merged.length) {
      merged.push(r);
      continue;
    }
    const last = merged[merged.length - 1];
    if (r[0] <= last[1] + 1) {
      // overlapping or contiguous
      last[1] = Math.max(last[1], r[1]);
    } else {
      merged.push(r);
    }
  }
  return merged;
}

/**
 * Filter an array of time strings according to provided rules for a specific professional.
 * Behavior summary:
 * - Collect all rules that apply (rule.professional omitted or matches provided professional).
 * - If any applicable rule provides `allowRanges`, only times inside the union of all allowRanges are kept.
 * - After applying allowRanges (if any), any times that match blockRanges or blockTimes from applicable rules are removed.
 *
 * Example:
 *  const rules = [
 *    { professional: 'André', allowRanges: [{from: '09:30', to: '12:30'}] },
 *    { blockTimes: ['10:00'] }
 *  ];
 *  filterAvailableTimes(['09:00','09:30','10:00','11:00'], rules, 'André') -> ['09:30','11:00']
 */
export function filterAvailableTimes(
  times: Time[],
  rules: TimeRule[] = [],
  professional?: string,
  date?: string // optional date in yyyy-MM-dd; if provided, rules with `days` will only apply when included
): Time[] {
  if (!times || times.length === 0) return [];

  const applicable = rules.filter((r) => {
    // professional match
    if (r.professional && r.professional !== professional) return false;

    // if rule specifies days, require a date and that the date is included
    if (r.days && r.days.length > 0) {
      if (!date) return false;
      return r.days.includes(date);
    }

    return true;
  });

  // If any allowRanges are provided, build their union and use it as whitelist
  const allAllowRanges: TimeRange[] = applicable.flatMap((r) => r.allowRanges ?? []);
  let allowedSet: ((tMin: number) => boolean) | null = null;

  if (allAllowRanges.length > 0) {
    const merged = mergeRanges(allAllowRanges);
    allowedSet = (tMin: number) => merged.some(([a, b]) => tMin >= a && tMin <= b);
  }

  // Collect blockRanges and blockTimes
  const allBlockRanges: TimeRange[] = applicable.flatMap((r) => r.blockRanges ?? []);
  const mergedBlockRanges = allBlockRanges.length > 0 ? mergeRanges(allBlockRanges) : [];
  const blockTimesSet = new Set(applicable.flatMap((r) => r.blockTimes ?? []));

  // Filter preserving original order
  return times.filter((t) => {
    const tMin = timeToMinutes(t);

    // If whitelist exists, require be in one of the allow ranges
    if (allowedSet && !allowedSet(tMin)) return false;

    // Exact block
    if (blockTimesSet.has(t)) return false;

    // Block ranges
    if (mergedBlockRanges.some(([a, b]) => tMin >= a && tMin <= b)) return false;

    return true;
  });
}

export default filterAvailableTimes;
