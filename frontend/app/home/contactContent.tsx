"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaBookReader,
  FaLaptop,
  FaUserGraduate,
} from "react-icons/fa";
import { cn } from "@/lib/utils"; // Keep cn import if needed elsewhere, or remove if not
// No longer need to import GlassmorphicCard here as it's used within the child components
import ContactInfoCard from "./ContactInfoCard"; // Import the new component
import DepartmentContacts from "./DepartmentContacts"; // Import the new component

export default function ContactContent() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="flex-1">
      {/* Main Contact Information - Combined Card with Two Columns */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="mx-auto mt-10 max-w-7xl px-4 lg:px-0"
      >
        {/* Use the new ContactInfoCard component */}
        <h2 className="mb-6 text-2xl font-bold text-blue-800 dark:text-blue-300">
          Contact Information
        </h2>
        <ContactInfoCard />

        {/* Use the new DepartmentContacts component (which includes FaqCard) */}
        <DepartmentContacts />
      </motion.div>
    </div>
  );
}
