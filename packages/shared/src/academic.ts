export const classes = ["S1", "S2", "S3", "S4", "S5", "S6"] as const;
export type SchoolClass = (typeof classes)[number];

export const terms2026 = [
  { id: "2026-T1", year: 2026, term: 1, start: "2026-02-02", end: "2026-05-01" },
  { id: "2026-T2", year: 2026, term: 2, start: "2026-05-25", end: "2026-08-21" },
  { id: "2026-T3", year: 2026, term: 3, start: "2026-09-14", end: "2026-12-04" },
] as const;

export const uceGrades = ["A", "B", "C", "D", "E"] as const;