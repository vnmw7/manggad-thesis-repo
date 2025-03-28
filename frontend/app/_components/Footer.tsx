import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaInfoCircle,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="mt-14 bg-gradient-to-b from-[#0442B1]/95 to-[#0442B1]/85 py-8 text-white backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: About */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">About Manggad</h3>
            <p className="text-blue-100">
              Manggad is the digital repository of La Consolacion College
              Bacolod&apos;s research works, providing a platform for academic
              excellence and knowledge sharing.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="flex cursor-pointer items-center text-blue-100 transition-colors hover:text-white"
                  onClick={() => router.push("/about")}
                >
                  <FaInfoCircle className="mr-2 h-4 w-4" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="flex cursor-pointer items-center text-blue-100 transition-colors hover:text-white"
                  onClick={() => router.push("/contact")}
                >
                  <FaEnvelope className="mr-2 h-4 w-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="flex cursor-pointer items-center text-blue-100 transition-colors hover:text-white"
                  onClick={() => router.push("/faq")}
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Connect */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              >
                <FaFacebookF className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              >
                <FaTwitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                whileHover="hover"
                variants={iconVariants}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              >
                <FaInstagram className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="my-6 border-t border-white/20"
        ></motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-blue-100 md:flex-row md:space-y-0"
        >
          <p>© {currentYear} Manggad. All rights reserved.</p>
          <p>La Consolacion College Bacolod - Manggad Research Repository</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
