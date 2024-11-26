"use client";

import { RaindropClient } from "@/lib/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth, useClerk } from "@clerk/nextjs";

const AuthContext = createContext<{ client: RaindropClient | null }>({
  client: null,
});
const queryClient = new QueryClient();

export function useApiClient() {
  return useContext(AuthContext).client;
}

export default function AuthRequired({ children }: { children: ReactNode }) {
  const { isSignedIn, getToken, orgId, userId } = useAuth();
  const { redirectToSignIn } = useClerk();
  const [client, setClient] = useState<RaindropClient | null>(null);

  useEffect(() => {
    if (isSignedIn === false) {
      redirectToSignIn();
    }
  }, [isSignedIn, redirectToSignIn]);

  useEffect(() => {
    if (isSignedIn) {
      setClient(
        new RaindropClient({
          token: getToken as () => Promise<string>,
          baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        })
      );
    } else {
      setClient(null);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["video"] });
  }, [orgId, userId]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ client }}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
}
