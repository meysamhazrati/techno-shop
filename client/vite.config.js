import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  define: {
    "process.env.SERVER_URI": JSON.stringify(loadEnv(mode, process.cwd(), "").SERVER_URI),
  },
  server: {
    port: 8080,
  },
  plugins: [react()],
}));