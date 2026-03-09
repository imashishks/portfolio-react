import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite already includes robust CommonJS support internally.
// Adding the Rollup commonjs plugin here was causing build-time
// conflicts with some ESM packages (e.g. `cookie` used by react-router),
// leading to \"parse is not exported\" errors.

export default defineConfig({
  plugins: [react()],
});