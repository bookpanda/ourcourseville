export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;
export const EXTENSION_URL = process.env.EXTENSION_URL ?? "";

export const FACULTY_TTL = parseInt(
  process.env.NEXT_PUBLIC_FACULTY_TTL ?? "",
  10
);

export const COURSE_TTL = parseInt(
  process.env.NEXT_PUBLIC_COURSE_TTL ?? "",
  10
);
