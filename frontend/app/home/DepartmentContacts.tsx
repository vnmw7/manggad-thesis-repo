"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBookReader, FaLaptop, FaUserGraduate } from "react-icons/fa";
import GlassmorphicCard from "@/app/_components/ui/GlassmorphicCard"; // Updated import path
import FaqCard from "./FaqCard"; // Import FaqCard

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

export default function DepartmentContacts() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-blue-800 dark:text-blue-300">
        Department Contacts
      </h2>
      <motion.div
        variants={fadeIn}
        className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Library Section */}
        <GlassmorphicCard hoverEffect>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/10 p-3 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <FaBookReader className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
              Library
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-indigo-700 dark:text-indigo-400">
                Hours
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Monday - Friday: 7:30 AM - 6:00 PM
                <br />
                Saturday: 8:00 AM - 12:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-700 dark:text-indigo-400">
                Contact
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Local Phone Extension: 124
                <br />
                Email: library@lccbonline.edu.ph
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-700 dark:text-indigo-400">
                Services
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                <li>Research assistance</li>
                <li>Internet and computer access</li>
                <li>MANGGAD digital repository access</li>
              </ul>
            </div>
          </div>
        </GlassmorphicCard>

        {/* IT Support Section */}
        <GlassmorphicCard hoverEffect>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-600/10 p-3 text-green-600 dark:bg-green-500/20 dark:text-green-400">
              <FaLaptop className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-300">
              IT Department
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                Contact
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Email: itsupport@lccbonline.edu.ph
                <br />
                Phone: +63 (34) 434 9661 ext. 123
                <br />
                Hours: Monday - Friday, 8:00 AM - 5:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                Services
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                <li>Network and connectivity support</li>
                <li>Software troubleshooting</li>
                <li>MANGGAD repository technical support</li>
              </ul>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Second Row of Departments */}
      <motion.div
        variants={fadeIn}
        className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Admissions Section */}
        <GlassmorphicCard hoverEffect>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-600/10 p-3 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
              <FaUserGraduate className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
              Admissions Office
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-700 dark:text-purple-400">
                Contact
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Phone: +63 (34) 434 9661 ext. 112
                <br />
                Email: admissions@lccbonline.edu.ph
                <br />
                Hours: Monday - Friday, 8:00 AM - 5:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-purple-700 dark:text-purple-400">
                Services
              </h3>
              <ul className="ml-5 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                <li>Enrollment and admission requirements</li>
                <li>Program application procedures</li>
                <li>Scholarship information</li>
              </ul>
            </div>
          </div>
        </GlassmorphicCard>

        {/* FAQ Card */}
        <FaqCard />
      </motion.div>
    </>
  );
}
