import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@store": resolve(__dirname, "src/store"),
      "@types": resolve(__dirname, "src/types"),
      "@layout": resolve(__dirname, "src/layout"),
      "@router": resolve(__dirname, "src/router"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
});
