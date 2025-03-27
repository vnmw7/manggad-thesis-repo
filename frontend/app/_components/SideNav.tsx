import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaChevronDown, FaInfoCircle } from "react-icons/fa";

const SideNav = () => {
  const router = useRouter();
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

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

  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 20px rgba(5, 63, 168, 0.15)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-5 h-auto w-full rounded-xl border border-white/20 bg-white/20 p-5 backdrop-blur-lg lg:w-[280px] dark:bg-gray-900/30 dark:text-white"
    >
      {/* Manggad Corner Section */}
      <div className="mb-4">
        <motion.button
          initial="rest"
          whileHover="hover"
          variants={buttonHoverVariants}
          onClick={() => toggleDropdown("author")}
          className="mb-3 flex w-full items-center justify-between rounded-lg bg-[#053fa8] p-4 text-left text-xl font-medium text-white shadow-md transition-all"
        >
          <div className="flex items-center">
            <FaGraduationCap className="mr-3 h-5 w-5" />
            <span>Manggad Corner</span>
          </div>
          <FaChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${openDropdown === "author" ? "rotate-180" : ""}`}
          />
        </motion.button>

        <AnimatePresence>
          {openDropdown === "author" && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="overflow-hidden"
            >
              <ul className="space-y-2 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                    onClick={() => router.push("/faq")}
                  >
                    <FaInfoCircle className="mr-2 h-4 w-4" />
                    Manggad FAQ
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Manggad Section */}
      <div className="mb-4">
        <motion.button
          initial="rest"
          whileHover="hover"
          variants={buttonHoverVariants}
          onClick={() => toggleDropdown("connect")}
          className="mb-3 flex w-full items-center justify-between rounded-lg bg-[#053fa8] p-4 text-left text-xl font-medium text-white shadow-md transition-all"
        >
          <div className="flex items-center">
            <FaInfoCircle className="mr-3 h-5 w-5" />
            <span>About Manggad</span>
          </div>
          <FaChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${openDropdown === "connect" ? "rotate-180" : ""}`}
          />
        </motion.button>

        <AnimatePresence>
          {openDropdown === "connect" && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="overflow-hidden"
            >
              <ul className="space-y-2 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                    onClick={() => router.push("/contact")}
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href="https://lcc.edu.ph/"
                    className="flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    LCCB Website
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SideNav;
