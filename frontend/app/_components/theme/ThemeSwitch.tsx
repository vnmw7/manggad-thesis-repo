"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the theme toggle client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-900"
        aria-label="Theme Switch"
        title="Theme Switch"
      >
        <div className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-all hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700 dark:hover:text-yellow-200"
      onClick={() => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        // Force the class on the HTML element directly
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        // Log for debugging
        console.log("Setting theme to:", newTheme);
      }}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
}
