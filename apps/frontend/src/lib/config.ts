export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}
