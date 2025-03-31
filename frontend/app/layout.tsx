"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PostHogProvider } from "../components/PostHogProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
