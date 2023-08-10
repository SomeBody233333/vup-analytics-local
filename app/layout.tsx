import "./globals.css"
import type { Metadata } from "next";


export const metadata: Metadata = {
  referrer: "no-referrer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
