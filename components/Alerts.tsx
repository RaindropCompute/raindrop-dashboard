"use client";

import { Snackbar } from "@mui/joy";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Error } from "@mui/icons-material";

const AlertContext = createContext<{ showError: (e: unknown) => void }>({
  showError: () => {},
});

export function useAlert() {
  return useContext(AlertContext);
}

export default function Alerts({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showError = useCallback((e: unknown) => {
    console.error(e);
    setMessage("An error occurred.");
  }, []);

  return (
    <AlertContext.Provider value={{ showError }}>
      {children}
      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === "timeout") {
            setMessage(null);
          }
        }}
        startDecorator={<Error />}
        color="danger"
        variant="outlined"
      >
        {message}
      </Snackbar>
    </AlertContext.Provider>
  );
}
