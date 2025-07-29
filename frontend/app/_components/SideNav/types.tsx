import { ReactNode } from "react";
import { ContentType } from "../../../constants/navData";

// Common props types for SideNav components
export interface SideNavProps {
  onContentChange?: (content: ContentType) => void;
}

export interface NavLinkProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface DropdownProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  children: ReactNode;
  id: string;
}

export interface CollectionItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface ClockDisplayProps {
  formattedDate: string;
  formattedTime: string;
}

export interface DropdownListProps {
  children: ReactNode;
}

export interface LogoProps {
  onClick: () => void;
}

// Animation variants used throughout the components
export const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};
