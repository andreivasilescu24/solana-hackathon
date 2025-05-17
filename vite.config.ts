import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";

// Polyfill Buffer globally
globalThis.Buffer = Buffer;

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
    "process.env": {},
    Buffer: ["buffer", "Buffer"],
  },
  resolve: {
    alias: {
      buffer: "buffer",
      process: "process/browser",
    },
  },
  build: {
    rollupOptions: {
      external: ["buffer"],
    },
  },
});
