import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RoutesPath from './routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
});
function App() {

  return (
    <DarkModeProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoutesPath />
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: theme => theme.palette.primary.main,
              color: theme => theme.palette.primary.text,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
