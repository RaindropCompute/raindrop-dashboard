"use client";

import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Inter, Source_Code_Pro } from "next/font/google";
import { ReactNode } from "react";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";

const inter = Inter({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: [
    // the default theme's fallback for monospace fonts
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  display: "swap",
});

const theme = extendTheme({
  fontFamily: {
    body: inter.style.fontFamily,
    display: inter.style.fontFamily,
    code: sourceCodePro.style.fontFamily,
  },
});

export default function Theme({ children }: { children: ReactNode }) {
  return (
    <>
      <InitColorSchemeScript />
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </>
  );
}
