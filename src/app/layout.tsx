import "~/styles/globals.css";
import { type Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "Eryk Wójcik",
  description: "Eryk Wójcik's Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
