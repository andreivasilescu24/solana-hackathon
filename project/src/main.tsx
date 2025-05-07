import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={"cm9vrhal000jjlg0l2plddt30"}
      onSuccess={() => console.log("Privy authentication successful")}
      config={{
        loginMethods: ["email", "twitter", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#7C3AED",
          logo: "/logo.svg",
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: true,
        },
        defaultChain: 1,
        supportedChains: [1],
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
