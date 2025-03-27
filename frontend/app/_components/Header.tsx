import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUser, FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useTheme } from "next-themes";
import ThemeSwitch from "./theme/ThemeSwitch";

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
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
  const formattedTime = mounted ? currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }) : '';

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = mounted ? currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : '';

  // Animation variants
  const navItemVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
  };

  return (
    <div>
      {/* Navbar with glassmorphism effect */}
      <nav className="relative z-10 flex w-full items-center justify-between bg-gradient-to-r from-[#053fa8]/95 to-[#053fa8]/90 px-4 py-2 text-white backdrop-blur-sm">
        <div className="flex items-center">
          {/* Logo with subtle animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Image
              src="/MANGGAD LOGO.png"
              alt="Logo"
              width={128}
              height={128}
              className="mr-2 hidden lg:block"
            />
            <div className="text-lg font-extrabold lg:text-2xl">
              Manggad Research Repository
            </div>
          </motion.div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links with hover animations */}
          <div className="flex space-x-5">
            <motion.a
              initial="rest"
              whileHover="hover"
              variants={navItemVariants}
              className="flex cursor-pointer items-center text-lg hover:text-blue-200"
              onClick={() => router.push("/home")}
            >
              <FaHome className="mr-1 h-4 w-4" />
              Home
            </motion.a>
            <motion.a
              initial="rest"
              whileHover="hover"
              variants={navItemVariants}
              className="flex cursor-pointer items-center text-lg hover:text-blue-200"
              onClick={() => router.push("/about")}
            >
              <FaInfoCircle className="mr-1 h-4 w-4" />
              About
            </motion.a>
            <motion.a
              initial="rest"
              whileHover="hover"
              variants={navItemVariants}
              className="flex cursor-pointer items-center text-lg hover:text-blue-200"
              onClick={() => router.push("/contact")}
            >
              <FaEnvelope className="mr-1 h-4 w-4" />
              Contact
            </motion.a>
          </div>

          {/* Divider Line with subtle animation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "40px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-4 hidden border-l border-white/40 lg:block"
          ></motion.div>

          {/* Real-time Date, Time and Admin Button */}
          <div className="flex items-center space-x-4">
            {/* Clock with fade-in animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden text-right font-mono text-lg lg:block"
            >
              {mounted && (
                <>
                  <div className="text-blue-100">{formattedDate}</div>
                  <div className="text-blue-100">{formattedTime}</div>
                </>
              )}
            </motion.div>

            {/* Theme Switch */}
            <div className="mr-2">
              <ThemeSwitch />
            </div>

            {/* Profile Icon Button for Admin Login with hover effect */}
            <motion.button
              initial="rest"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
              transition={{ duration: 0.2 }}
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30"
              onClick={() => router.push("/login")}
            >
              <FaUser className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Image Banner with overlay and animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative w-full"
      >
        <div className="relative h-[200px] w-full overflow-hidden">
          <Image
            src="/Librarysample.jpg"
            alt="Banner"
            fill
            className="object-cover object-center transition-transform duration-20000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>

          {/* Optional: Add text overlay on the banner */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">
              Discover Knowledge
            </h2>
            <p className="mt-1 text-white drop-shadow-md">
              Access research resources from LCCB
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
