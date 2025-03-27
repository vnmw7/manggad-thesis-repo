import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#0442B1]/95 to-[#0442B1]/90 backdrop-blur-sm lg:hidden">
      {/* Mobile Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center">
          <Image
            src="/MANGGAD LOGO.png"
            alt="Logo"
            width={48}
            height={48}
            className="mr-2"
          />
          <div className="text-base font-bold">Manggad Repository</div>
        </div>

        {/* Menu Toggle Button with animation */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 z-50 w-full overflow-hidden bg-gradient-to-b from-[#0442B1]/95 to-[#0442B1]/85 text-white backdrop-blur-md"
          >
            {/* Navigation Links */}
            <div className="divide-y divide-white/10">
              <motion.a
                variants={itemVariants}
                className="flex cursor-pointer items-center px-6 py-4 text-lg font-medium transition-colors hover:bg-white/10"
                onClick={() => {
                  router.push("/home");
                  setIsMenuOpen(false);
                }}
              >
                <FaHome className="mr-3 h-5 w-5" />
                Home
              </motion.a>

              <motion.a
                variants={itemVariants}
                className="flex cursor-pointer items-center px-6 py-4 text-lg font-medium transition-colors hover:bg-white/10"
                onClick={() => {
                  router.push("/about");
                  setIsMenuOpen(false);
                }}
              >
                <FaInfoCircle className="mr-3 h-5 w-5" />
                About
              </motion.a>

              <motion.a
                variants={itemVariants}
                className="flex cursor-pointer items-center px-6 py-4 text-lg font-medium transition-colors hover:bg-white/10"
                onClick={() => {
                  router.push("/contact");
                  setIsMenuOpen(false);
                }}
              >
                <FaEnvelope className="mr-3 h-5 w-5" />
                Contact
              </motion.a>

              {/* Browse Dropdown */}
              <motion.div variants={itemVariants}>
                <div
                  className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-medium transition-colors hover:bg-white/10"
                  onClick={() => toggleDropdown("browse")}
                >
                  <div className="flex items-center">
                    <svg
                      className="mr-3 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Browse
                  </div>
                  <FaChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${openDropdown === "browse" ? "rotate-180" : ""}`}
                  />
                </div>

                <AnimatePresence>
                  {openDropdown === "browse" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="overflow-hidden bg-[#0442B1]/80 backdrop-blur-md"
                    >
                      <a
                        className="flex cursor-pointer items-center px-12 py-3 text-base transition-colors hover:bg-white/10"
                        onClick={() => {
                          router.push("/book/search");
                          setIsMenuOpen(false);
                        }}
                      >
                        Search Repository
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profile/Login */}
              <motion.a
                variants={itemVariants}
                className="flex cursor-pointer items-center px-6 py-4 text-lg font-medium transition-colors hover:bg-white/10"
                onClick={() => {
                  router.push("/login");
                  setIsMenuOpen(false);
                }}
              >
                <FaUser className="mr-3 h-5 w-5" />
                Login
              </motion.a>
            </div>

            {/* Footer of Mobile Menu */}
            <motion.div
              variants={itemVariants}
              className="p-6 text-center text-xs text-white/70"
            >
              © {new Date().getFullYear()} Manggad Research Repository
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileHeader;
