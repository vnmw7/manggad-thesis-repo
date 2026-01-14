/*
System: MANGGAD - Research Repository Management System
Module: Bionotes Page
File URL: Frontend/app/bionotes/page.tsx
Purpose: Display the development team members of the Manggad project
*/

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, ArrowLeft } from "lucide-react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

interface TeamMember {
  name: string;
  role: string;
  yearProgram: string;
  institution: string;
  imageUrl: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Vincent Manalo",
    role: "Full-Stack Developer",
    yearProgram: "4th Year BSIT Student",
    institution: "La Consolacion College Bacolod",
    imageUrl: "/vincent.jpg",
    bio: "Vincent Manalo is a 4th Year BSIT Student from La Consolacion College Bacolod serving as the Full-Stack Developer of Manggad Research Repository.",
  },
  {
    name: "Jexter Bersana",
    role: "Frontend Developer",
    yearProgram: "4th Year BSIT Student",
    institution: "La Consolacion College Bacolod",
    imageUrl: "/jex.png",
    bio: "Jexter Bersana is a 4th Year BSIT Student from La Consolacion College Bacolod serving as the Frontend Developer of the Manggad project.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const TeamMemberCard = ({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-8"
  >
    <div className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg mb-4">
        <Image
          src={member.imageUrl}
          alt={`Profile picture of ${member.name}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3">
        {member.name}
      </h2>

      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 mb-4">
        <Code2 className="w-4 h-4 mr-1" />
        {member.role}
      </span>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {member.bio}
      </p>
    </div>
  </motion.div>
);

export default function BionotesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
      <div className="pointer-events-none fixed inset-0 h-screen w-screen opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="h-full w-full fill-black/15 text-black/25 dark:fill-white/10 dark:text-white/20"
          numSquares={100}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      <Header />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/home"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3">
              Meet the Developers
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The team behind Manggad Research Repository
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
