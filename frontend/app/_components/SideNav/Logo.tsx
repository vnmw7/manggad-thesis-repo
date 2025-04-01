import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LogoProps } from "./types";

// Logo Component with animation
const Logo = ({ onClick }: LogoProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4 flex items-center"
    onClick={onClick}
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
);

export default Logo;
