import adapter from "@sveltejs/adapter-vercel";
// place files you want to import through the `$lib` alias in this folder.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export default {
  kit: {
    adapter: adapter(),
  },
};
