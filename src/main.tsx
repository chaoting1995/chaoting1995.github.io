import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import './index.css';
import PopupProvider from "context/Popup/Popup.provider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupProvider>
      <BrowserRouter basename="/debateTimer">
        <App />
      </BrowserRouter>
    </PopupProvider>
  </StrictMode>,
);
