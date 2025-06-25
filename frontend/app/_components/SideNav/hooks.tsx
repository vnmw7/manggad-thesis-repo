import { useState, useEffect } from "react";
import { getUser } from "@/lib/supabase";

// Hook for managing time and date with proper SSR handling
export const useTimeAndDate = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use useEffect to update the clock and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  // Handle theme mounting for SSR
  useEffect(() => setMounted(true), []);

  // Format time as HH:MM:SS AM/PM
  const formattedTime = mounted
    ? currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
    : "";

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = mounted
    ? currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return { mounted, formattedTime, formattedDate };
};

// Hook for user authentication status
export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { success } = await getUser();
      setIsAuthenticated(success);
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
};

// Navigation helper hook - handles content switching and routing
export const useNavigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Function to toggle dropdown state
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return {
    openDropdown,
    toggleDropdown,
  };
};
