// Polyfills - these must come first, before any other imports
import { Buffer } from 'buffer';
import process from 'process';

// Ensure Buffer is available globally
globalThis.Buffer = Buffer;
globalThis.process = process;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import {toSolanaWalletConnectors} from "@privy-io/react-auth/solana";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId="cm9vrhal000jjlg0l2plddt30"
      config={{
        loginMethods: ["email", "twitter", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#7C3AED",
          logo: "/logo-moon.png",
          showWalletLoginFirst: false
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors(),
          },
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
