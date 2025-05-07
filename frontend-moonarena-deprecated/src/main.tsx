import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './index.css';

// You would get this from your Privy dashboard
const PRIVY_APP_ID = "your-privy-app-id";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrivyProvider
        appId={"cm9vrhal000jjlg0l2plddt30"}
        onSuccess={() => console.log('Privy authentication successful')}
      >
        <App />
      </PrivyProvider>
    </BrowserRouter>
  </StrictMode>
);