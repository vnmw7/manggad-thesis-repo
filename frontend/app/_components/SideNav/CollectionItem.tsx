import React from "react";
import { motion } from "framer-motion";
import { CollectionItemProps } from "./types";

// Shared styles to reduce duplication
export const styles = {
  navItem:
    "flex cursor-pointer items-center rounded-md px-3 py-2 text-lg font-medium text-[#053fa8] transition-colors hover:bg-blue-100/60 dark:text-blue-200 dark:hover:bg-blue-800/30",
};

// Collection Item Component for dropdown items
const CollectionItem = ({ icon, label, onClick }: CollectionItemProps) => (
  <motion.li
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    <a className={styles.navItem} onClick={onClick}>
      {icon}
      {label}
    </a>
  </motion.li>
);

export default CollectionItem;
