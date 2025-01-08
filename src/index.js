import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './auth/JwtContext';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/global/ErrorFallback";
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <App />
      </SnackbarProvider>
    </ErrorBoundary>
  </AuthProvider>
  </React.StrictMode>
);
