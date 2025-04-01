import React from "react";
import { motion } from "framer-motion";
import { NavLinkProps } from "./types";
import { styles } from "./CollectionItem";

// NavLink Component for main menu items
const NavLink = ({ icon, label, onClick }: NavLinkProps) => (
  <motion.a
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400 }}
    className={styles.navItem}
    onClick={onClick}
  >
    {icon}
    {label}
  </motion.a>
);

export default NavLink;
