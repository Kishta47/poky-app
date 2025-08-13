import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  define: {
    "process.env.VITE_BASE_API_URL": JSON.stringify(
      process.env.VITE_BASE_API_URL || "https://pokeapi.co/api/v2"
    ),
  },
});
