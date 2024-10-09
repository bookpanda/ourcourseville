export const API_URL = process.env.API_URL;
export const API_KEY = process.env.API_KEY;
export const EXTENSION_URL = process.env.EXTENSION_URL ?? "";

export const RECENT_COURSES_TTL = parseInt(
  process.env.NEXT_PUBLIC_RECENT_COURSES_TTL ?? "",
  10
);
