import {
  FaGraduationCap,
  FaHome,
  FaEnvelope,
  FaBook,
  FaBookOpen,
  FaTachometerAlt,
  FaLayerGroup,
  FaEye,
  FaPlus,
} from "react-icons/fa";

// Type definitions for navigation
export type ContentType = "home" | "contact" | "book" | "dashboard";

export interface CollectionItemData {
  icon: React.ReactNode;
  label: string;
  path?: string;
  content?: ContentType;
}

// Collection items data
export const bookCollections: CollectionItemData[] = [
  {
    icon: <FaBookOpen className="mr-2 h-4 w-4" />,
    label: "All Thesis",
    content: "book",
  },
  {
    icon: <FaGraduationCap className="mr-2 h-4 w-4" />,
    label: "Graduate Collection",
    content: "book",
  },
  {
    icon: <FaBookOpen className="mr-2 h-4 w-4" />,
    label: "SARFAID Collection",
    content: "book",
  },
  {
    icon: <FaBookOpen className="mr-2 h-4 w-4" />,
    label: "SBIT Collection",
    content: "book",
  },
  {
    icon: <FaBookOpen className="mr-2 h-4 w-4" />,
    label: "SHTM Collection",
    content: "book",
  },
  {
    icon: <FaBookOpen className="mr-2 h-4 w-4" />,
    label: "SSLATE Collection",
    content: "book",
  },
];

// Manage collection items data
export const manageCollections: CollectionItemData[] = [
  {
    icon: <FaEye className="mr-2 h-4 w-4" />,
    label: "View Collections",
    path: "/collection",
  },
  {
    icon: <FaPlus className="mr-2 h-4 w-4" />,
    label: "Add Collections",
    path: "/book/addBook",
  },
];

// Main navigation links
export const mainNavLinks: CollectionItemData[] = [
  {
    icon: <FaHome className="mr-2 h-5 w-5" />,
    label: "Home",
    content: "home",
  },
  {
    icon: <FaBook className="mr-2 h-5 w-5" />,
    label: "Books",
    content: "book",
  },
  {
    icon: <FaEnvelope className="mr-2 h-5 w-5" />,
    label: "Contact",
    content: "contact",
  },
];

// Admin only navigation links
export const adminNavLinks: CollectionItemData[] = [
  {
    icon: <FaTachometerAlt className="mr-2 h-5 w-5" />,
    label: "Dashboard",
    content: "dashboard",
  },
];

// Dropdown configurations
export const dropdownMenus = [
  {
    id: "books",
    icon: <FaBookOpen className="mr-2 h-5 w-5" />,
    label: "Collections",
    items: bookCollections,
    requiresAuth: false,
  },
  {
    id: "collections",
    icon: <FaLayerGroup className="mr-2 h-5 w-5" />,
    label: "Manage Collections",
    items: manageCollections,
    requiresAuth: true,
  },
];
