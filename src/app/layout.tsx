import "~/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Eryk Wójcik",
  description: "Eryk Wójcik's Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
