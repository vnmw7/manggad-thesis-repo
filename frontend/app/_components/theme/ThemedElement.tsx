"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

const ThemedElement = ({ children }: { children: React.ReactNode }) => {
  // nag add ko anay darkMode: "class" sa tailwind.config.ts
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemedElement;
