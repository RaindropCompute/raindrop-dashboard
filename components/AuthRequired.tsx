"use client";

import { RaindropClient } from "@/lib/api";
import { useAuth0 } from "@auth0/auth0-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AuthContext = createContext<{ client: RaindropClient | null }>({
  client: null,
});
const queryClient = new QueryClient();

export function useApiClient() {
  return useContext(AuthContext).client;
}

export default function AuthRequired({ children }: { children: ReactNode }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const [client, setClient] = useState<RaindropClient | null>(null);

  useEffect(() => {
    if (isLoading || isAuthenticated) {
      return;
    }

    loginWithRedirect();
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        setClient(
          new RaindropClient({
            token,
            baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
          })
        );
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ client }}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
}
