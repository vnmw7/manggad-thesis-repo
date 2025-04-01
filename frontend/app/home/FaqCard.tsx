"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GlassmorphicCard from "@/app/_components/ui/GlassmorphicCard"; // Updated import path

export default function FaqCard() {
  return (
    <GlassmorphicCard hoverEffect>
      <h2 className="mb-4 text-xl font-bold text-blue-800 dark:text-blue-300">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="font-medium text-gray-800 dark:text-white">
            When is the enrollment period?
          </h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Enrollment periods vary by semester. Please contact the Admissions
            Office for the current schedule.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="font-medium text-gray-800 dark:text-white">
            Are there scholarships available?
          </h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            Yes, LCCB offers various scholarship programs. Contact the
            Scholarship Office for more information.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="font-medium text-gray-800 dark:text-white">
            How can I access the MANGGAD repository?
          </h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            MANGGAD repository is accessible online. For technical issues,
            contact the IT Department.
          </p>
        </div>
      </div>
    </GlassmorphicCard>
  );
}
