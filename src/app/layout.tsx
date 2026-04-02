import type React from "react";
import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { PostHogProvider } from "./_analytics/provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://ewoj.dev"),
  title: {
    default: "Eryk Wójcik",
    template: "Eryk Wójcik",
  },
  description: "Software Developer & AI Engineer",
  openGraph: {
    title: "Eryk Wójcik",
    description: "Software Developer & AI Engineer",
    url: "https://ewoj.dev",
    siteName: "Eryk Wójcik",
    locale: "en_US",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistMono.className}>
      <body className="bg-[#070707]">
        <PostHogProvider>
          {children}
          <Toaster />
          <meta
            name="yosa-project"
            content="d255474bd9429c4a6a3c759285ca1da3"
          />
        </PostHogProvider>
      </body>
    </html>
  );
}
