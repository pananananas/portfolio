import type React from "react";
import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "Eryk - Software Developer & AI Enthusiast",
  description:
    "Portfolio website of Eryk, a software developer specializing in AI and web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistMono.className}>
      <body className="bg-[#101010]">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
