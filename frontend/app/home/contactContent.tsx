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
import { cn } from "@/lib/utils";

// GlassmorphicCard component definition
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
        <h2 className="mb-6 text-2xl font-bold text-blue-800 dark:text-blue-300">
          Contact Information
        </h2>

        {/* Main Contact Card with Grid Layout */}
        <motion.div variants={fadeIn} className="mb-10">
          <GlassmorphicCard
            className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
            hoverEffect
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* School Information */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    <FaSchool className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                    La Consolacion College Bacolod
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Corner Galo-Gatuslao Streets
                  <br />
                  Bacolod City 6100, Negros Occidental
                  <br />
                  Philippines
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <FaPhone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    +63 (34) 434 9661 to 64
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    lccbpresident@lccbonline.edu.ph
                  </span>
                </div>
              </div>

              {/* Map */}
              <div className="h-[300px] w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0033441713986!2d122.94662127418753!3d10.6768038899521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed06dbcf78bdb%3A0x19ea10e8b18a7fc!2sLa%20Consolacion%20College%20Bacolod!5e0!3m2!1sen!2sph!4v1711796133561!5m2!1sen!2sph"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Department Contacts - Two Column Grid */}
        <h2 className="mb-6 text-2xl font-bold text-blue-800 dark:text-blue-300">
          Department Contacts
        </h2>
        <motion.div
          variants={fadeIn}
          className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Library Section */}
          <GlassmorphicCard
            className="h-full overflow-hidden rounded-xl"
            hoverEffect
          >
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
          <GlassmorphicCard
            className="h-full overflow-hidden rounded-xl"
            hoverEffect
          >
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
          <GlassmorphicCard
            className="h-full overflow-hidden rounded-xl"
            hoverEffect
          >
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

          {/* FAQ Section */}
          <GlassmorphicCard
            className="h-full overflow-hidden rounded-xl"
            hoverEffect
          >
            <h2 className="mb-4 text-xl font-bold text-blue-800 dark:text-blue-300">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white/70 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  When is the enrollment period?
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Enrollment periods vary by semester. Please contact the
                  Admissions Office for the current schedule.
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
        </motion.div>
      </motion.div>
    </div>
  );
}
