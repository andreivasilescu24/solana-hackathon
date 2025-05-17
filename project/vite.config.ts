import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
    include: [
      "@solana/web3.js",
      "@solana/spl-token-metadata",
      "@privy-io/react-auth",
    ],
  },
  define: {
    global: "globalThis",
    "process.env": process.env,
  },
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
      stream: "stream-browserify",
    },
  },
});
