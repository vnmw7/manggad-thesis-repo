"use client";

import React from "react";
import { motion } from "framer-motion";
import ContactInfoCard from "./ContactInfoCard"; // Import the new component
import DepartmentContacts from "./DepartmentContacts"; // Import the new component

export default function ContactContent() {
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
