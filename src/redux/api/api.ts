export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

if (!BASE_API_URL) {
  throw new Error("VITE_BASE_API_URL is not defined");
}
