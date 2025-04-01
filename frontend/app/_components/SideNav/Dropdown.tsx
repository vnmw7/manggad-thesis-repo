import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownProps, dropdownVariants } from "./types";
import { FaChevronDown } from "react-icons/fa";
import { styles } from "./CollectionItem";

// Dropdown Component for expandable menu sections
const Dropdown = ({
  icon,
  label,
  isOpen,
  toggleDropdown,
  children,
  id,
}: DropdownProps) => (
  <motion.div
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400 }}
    className="relative"
  >
    <motion.button
      className={styles.navItem}
      onClick={toggleDropdown}
      aria-expanded={isOpen}
      aria-controls={`${id}-dropdown`}
    >
      <div className="flex items-center">
        {icon}
        {label}
      </div>
      <FaChevronDown
        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={`${id}-dropdown`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Dropdown;
