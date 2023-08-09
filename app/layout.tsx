"use client"

import "./globals.css";

import { Provider, defaultTheme } from "@adobe/react-spectrum";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider theme={defaultTheme}>{children}</Provider>
      </body>
    </html>
  );
}
