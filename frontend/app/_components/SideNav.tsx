import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaGraduationCap,
  FaChevronDown,
  FaInfoCircle,
  FaHome,
  FaEnvelope,
  FaBook,
  FaBookOpen,
  FaStar,
  FaTachometerAlt,
  FaLayerGroup,
  FaEye,
  FaPlus,
} from "react-icons/fa";
import { getCurrentUser } from "@/lib/appwrite";

interface SideNavProps {
  onContentChange?: (
    content: "home" | "contact" | "book" | "dashboard",
  ) => void;
}

const SideNav = ({ onContentChange }: SideNavProps) => {
  const router = useRouter();
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { success } = await getCurrentUser();
      setIsAuthenticated(success);
    };

    checkAuth();
  }, []);

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Handle navigation with content change
  const handleNavigation = (
    path: string,
    content?: "home" | "contact" | "book" | "dashboard",
  ) => {
    if (path === "/home" && onContentChange && content) {
      // If we're on the home page and navigating to home/contact/book/dashboard content
      onContentChange(content);
    } else {
      // Otherwise use normal router navigation
      router.push(path);
    }
  };

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col">
      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mt-5 h-auto w-full bg-white/60 p-5 backdrop-blur-lg lg:mr-4 lg:ml-5 lg:w-[280px] dark:bg-gray-900/80 dark:text-white"
        >
          {/* Logo and Navigation Links Section */}
          <div className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center"
              onClick={() => handleNavigation("/home", "home")}
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/MANGGAD LOGO.png"
                alt="Logo"
                width={50}
                height={50}
                className="mr-2"
              />
              <div className="text-lg font-extrabold text-blue-900 dark:text-blue-100">
                Manggad Repository
              </div>
            </motion.div>

            <div className="mb-5 space-y-2">
              <motion.a
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                onClick={() => handleNavigation("/home", "home")}
              >
                <FaHome className="mr-2 h-5 w-5" />
                Home
              </motion.a>

              {/* Admin Dashboard - Only visible when authenticated */}
              {isAuthenticated && (
                <motion.a
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                  onClick={() => handleNavigation("/home", "dashboard")}
                >
                  <FaTachometerAlt className="mr-2 h-5 w-5" />
                  Dashboard
                </motion.a>
              )}

              <motion.a
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                onClick={() => handleNavigation("/home", "book")}
              >
                <FaBook className="mr-2 h-5 w-5" />
                Books
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <motion.button
                  className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                  onClick={() => toggleDropdown("books")}
                  aria-expanded={openDropdown === "books"}
                  aria-controls="books-dropdown"
                >
                  <div className="flex items-center">
                    <FaBookOpen className="mr-2 h-5 w-5" />
                    Collections
                  </div>
                  <FaChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "books" ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {openDropdown === "books" && (
                    <motion.div
                      id="books-dropdown"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="overflow-hidden"
                    >
                      <ul className="mt-1 space-y-2 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() => router.push("/book")}
                          >
                            <FaBookOpen className="mr-2 h-4 w-4" />
                            All Thesis
                          </a>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() =>
                              router.push("/book?category=Graduate")
                            }
                          >
                            <FaGraduationCap className="mr-2 h-4 w-4" />
                            Graduate Collection
                          </a>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() =>
                              router.push("/book?category=SARFAID")
                            }
                          >
                            <FaBookOpen className="mr-2 h-4 w-4" />
                            SARFAID Collection
                          </a>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() => router.push("/book?category=SBIT")}
                          >
                            <FaBookOpen className="mr-2 h-4 w-4" />
                            SBIT Collection
                          </a>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() => router.push("/book?category=SHTM")}
                          >
                            <FaBookOpen className="mr-2 h-4 w-4" />
                            SHTM Collection
                          </a>
                        </motion.li>
                        <motion.li
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <a
                            className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                            onClick={() => router.push("/book?category=SSLATE")}
                          >
                            <FaBookOpen className="mr-2 h-4 w-4" />
                            SSLATE Collection
                          </a>
                        </motion.li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Manage Collections - Only visible when authenticated */}
              {isAuthenticated && (
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="relative"
                >
                  <motion.button
                    className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                    onClick={() => toggleDropdown("collections")}
                    aria-expanded={openDropdown === "collections"}
                    aria-controls="collections-dropdown"
                  >
                    <div className="flex items-center">
                      <FaLayerGroup className="mr-2 h-5 w-5" />
                      Manage Collections
                    </div>
                    <FaChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "collections" ? "rotate-180" : ""}`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {openDropdown === "collections" && (
                      <motion.div
                        id="collections-dropdown"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="overflow-hidden"
                      >
                        <ul className="mt-1 space-y-2 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                          <motion.li
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <a
                              className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                              onClick={() => router.push("/collection")}
                            >
                              <FaEye className="mr-2 h-4 w-4" />
                              View Collections
                            </a>
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <a
                              className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                              onClick={() => router.push("/book/addBook")}
                            >
                              <FaPlus className="mr-2 h-4 w-4" />
                              Add Collections
                            </a>
                          </motion.li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              <motion.a
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                onClick={() => handleNavigation("/home", "contact")}
              >
                <FaEnvelope className="mr-2 h-5 w-5" />
                Contact
              </motion.a>
            </div>

            {/* Clock and Date Display */}
            {mounted && (
              <div className="mb-4 rounded-lg bg-blue-50/70 p-3 text-center font-mono text-sm dark:bg-blue-900/30">
                <div className="text-blue-800 dark:text-blue-200">
                  {formattedDate}
                </div>
                <div className="text-blue-800 dark:text-blue-200">
                  {formattedTime}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SideNav;
