"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

export default function UserProvider({ children }: { children: ReactNode }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
}
