"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaSchool } from "react-icons/fa";
import GlassmorphicCard from "@/app/_components/ui/GlassmorphicCard"; // Updated import path

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

export default function ContactInfoCard() {
  return (
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
  );
}
