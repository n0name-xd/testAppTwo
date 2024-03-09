import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3099,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src/components") },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/features"),
      },
      {
        find: "@store-hooks",
        replacement: path.resolve(__dirname, "src/app"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/variables.scss";
        `,
      },
    },
  },
});
