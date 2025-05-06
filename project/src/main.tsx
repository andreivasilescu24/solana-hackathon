import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import App from "./App.tsx";
import "./index.css";

// Get your app ID from the Privy Dashboard: https://console.privy.io/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={"cm9vrhal000jjlg0l2plddt30"}
      onSuccess={() => console.log("Privy authentication successful")}
      config={{
        loginMethods: ["email", "twitter", "wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#7C3AED", // primary-600
          logo: "/logo.svg",
          showWalletLoginFirst: false,
          defaultLanguage: "en",
        },
        embeddedWallets: {
          createOnLogin: true,
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
