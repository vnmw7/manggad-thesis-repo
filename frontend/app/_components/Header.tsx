import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FaUser,
  FaHome,
  FaSearch,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import ThemeSwitch from "./theme/ThemeSwitch";
import { logout, getCurrentUser } from "@/lib/appwrite";

// Animation variants
const navItemVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, y: -2, transition: { duration: 0.2 } },
};

const stickyHeaderVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.4 },
  },
  exit: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Define interfaces for component props
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

interface NavLinksProps {
  router: any; // Using AppRouterInstance type would be better but keeping it simple
}

interface UserMenuProps {
  isUserMenuOpen: boolean;
  userMenuRef: React.RefObject<HTMLDivElement | null>;
  isAuthenticated: boolean;
  handleLogout: () => Promise<void>;
  router: any;
}

interface LogoProps {
  router: any;
}

interface NavigationBarProps {
  router: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (isOpen: boolean) => void;
  userMenuRef: React.RefObject<HTMLDivElement | null>;
  isAuthenticated: boolean;
  handleLogout: () => Promise<void>;
  variants: Variants;
  className: string;
}

// SearchBar component
const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchBarProps) => (
  <div className="mx-4 hidden flex-1 items-center md:flex">
    <form onSubmit={handleSearch} className="w-full max-w-lg">
      <div className="relative flex rounded-lg bg-white/20 backdrop-blur-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books, authors..."
          className="w-full rounded-l-lg bg-transparent px-4 py-2 text-white placeholder-white/70 focus:outline-none"
          aria-label="Search books"
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-r-lg bg-white/30 px-4 font-medium text-white transition-colors hover:bg-white/40 focus:outline-none"
          aria-label="Submit search"
        >
          <FaSearch className="h-4 w-4" />
        </button>
      </div>
    </form>
  </div>
);

// Navigation links component
const NavLinks = ({ router }: NavLinksProps) => (
  <div className="hidden md:flex md:space-x-3">
    <motion.a
      initial="rest"
      whileHover="hover"
      variants={navItemVariants}
      className="flex cursor-pointer items-center text-sm hover:text-blue-200"
      onClick={() => router.push("/home")}
    >
      <FaHome className="mr-1 h-3 w-3" />
      Home
    </motion.a>
    <motion.a
      initial="rest"
      whileHover="hover"
      variants={navItemVariants}
      className="flex cursor-pointer items-center text-sm hover:text-blue-200"
      onClick={() => router.push("/book")}
    >
      <FaBook className="mr-1 h-3 w-3" />
      Books
    </motion.a>
  </div>
);

// UserMenu component
const UserMenu = ({
  isUserMenuOpen,
  userMenuRef,
  isAuthenticated,
  handleLogout,
  router,
}: UserMenuProps) =>
  isUserMenuOpen && isAuthenticated && (
    <div
      ref={userMenuRef}
      className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
    >
      <div className="py-1">
        <a
          onClick={() => router.push("/account-settings")}
          className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaCog className="mr-2 h-5 w-5" />
          Account settings
        </a>
        <a
          onClick={handleLogout}
          className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <FaSignOutAlt className="mr-2 h-5 w-5" />
          Logout
        </a>
      </div>
    </div>
  );

// Logo component
const Logo = ({ router }: LogoProps) => (
  <div className="flex items-center">
    <motion.div
      className="flex items-center"
      onClick={() => router.push("/home")}
      style={{ cursor: "pointer" }}
    >
      <Image
        src="/MANGGAD LOGO.png"
        alt="Logo"
        width={40}
        height={40}
        className="mr-2"
      />
      <div className="text-lg font-extrabold">Manggad Repository</div>
    </motion.div>
  </div>
);

// Banner component
const Banner = () => (
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
);

// Navigation bar component
const NavigationBar = ({
  router,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  isAuthenticated,
  handleLogout,
  variants,
  className,
}: NavigationBarProps) => (
  <motion.nav
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={className}
  >
    <Logo router={router} />
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
    />
    <div className="flex items-center space-x-4">
      <NavLinks router={router} />
      <ThemeSwitch />
      <div className="relative">
        <motion.button
          initial="rest"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
          }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30 cursor-pointer"
          onClick={() => {
            if (isAuthenticated) {
              setIsUserMenuOpen(!isUserMenuOpen);
            } else {
              router.push("/auth");
            }
          }}
          aria-label={isAuthenticated ? "User menu" : "Login"}
          data-test-id="user-menu-button"
        >
          <FaUser className="h-4 w-4 text-white" />
        </motion.button>
        <UserMenu
          isUserMenuOpen={isUserMenuOpen}
          userMenuRef={userMenuRef}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          router={router}
        />
      </div>
    </div>
  </motion.nav>
);

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { success } = await getCurrentUser();
      setIsAuthenticated(success);
    };

    checkAuth();
  }, []);

  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/book/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        // Close the menu
        setIsUserMenuOpen(false);
        // Redirect to home or login page
        router.push("/home");
      } else {
        console.error("Logout failed:", response.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {/* Sticky Header */}
      <AnimatePresence>
        {isHeaderSticky ? (
          <NavigationBar
            router={router}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            userMenuRef={userMenuRef}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            variants={stickyHeaderVariants}
            className="fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-[#053fa8]/90 to-[#053fa8]/80 px-4 py-2 text-white shadow-lg dark:bg-gradient-to-r dark:from-[#1a202c]/90 dark:to-[#1a202c]/80"
          />
        ) : (
          <NavigationBar
            router={router}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            userMenuRef={userMenuRef}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            variants={stickyHeaderVariants}
            className="relative z-50 flex w-full items-center justify-between bg-gradient-to-r from-[#053fa8]/95 to-[#053fa8]/90 px-4 py-2 text-white shadow-lg backdrop-blur-md dark:bg-gradient-to-r dark:from-[#1a202c]/90 dark:to-[#1a202c]/80"
          />
        )}
      </AnimatePresence>

      {/* Image Banner with overlay and animation */}
      <Banner />
    </div>
  );
};

export default Header;
