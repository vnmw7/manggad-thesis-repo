import {
  FaGraduationCap,
  FaHome,
  FaEnvelope,
  FaBookOpen,
  FaTachometerAlt,
  FaLayerGroup,
  FaEye,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

// define ang dynamic content para maging single page application
export type ContentType =
  | "home"
  | "contact"
  | "book"
  | "dashboard"
  | "add thesis"
  | "view thesis";

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
    content: "add thesis",
  },
  {
    icon: <FaEdit className="mr-2 h-4 w-4" />,
    label: "View & Edit Thesis",
    content: "view thesis",
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
