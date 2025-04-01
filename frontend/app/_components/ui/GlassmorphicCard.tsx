"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GlassmorphicCard = ({
  children,
  className,
  hoverEffect = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}) => {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={cn(
        "dark:shadow-2xl/20 relative overflow-hidden rounded-xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-sm transition-all dark:border-gray-800/30 dark:bg-gray-900/50",
        className,
      )}
    >
      {/* Subtle inner gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/5 opacity-30 dark:from-blue-900/10 dark:to-indigo-900/5"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassmorphicCard;
