export const roles = [
  "student",
  "parent",
  "teacher",
  "admin",
  "bursar",
  "nurse",
] as const;

export type Role = (typeof roles)[number];