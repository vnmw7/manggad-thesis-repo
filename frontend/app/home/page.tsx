"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideNav from "../_components/SideNav";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  FaBook,
  FaBookmark,
  FaSchool,
  FaGraduationCap,
  FaSearch,
} from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// GlassmorphicCard component to replace MagicCard
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

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Current theme:", resolvedTheme);
    console.log(
      "HTML dark class:",
      document.documentElement.classList.contains("dark"),
    );
  }, [resolvedTheme]);

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

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/book/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle theme mounting for SSR
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
      {/* Animated Grid Pattern Background - Now covering the entire page with fixed positioning */}
      <div className="fixed inset-0 h-screen w-screen opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="h-full w-full fill-black/15 text-black/25 dark:fill-white/10 dark:text-white/20"
          numSquares={100}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-[120px] dark:from-blue-700/20 dark:to-purple-700/20" />
        <div className="absolute top-1/3 right-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 blur-[100px] dark:from-cyan-700/20 dark:to-emerald-700/20" />
        <div className="absolute bottom-1/4 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-400/20 blur-[100px] dark:from-indigo-700/20 dark:to-blue-700/20" />
      </div>

      <Header />

      {/* Main Content with Sidebar under the banner */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="lg:sticky lg:top-0 lg:self-start">
          <SideNav />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Search Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto mt-8 w-full max-w-7xl px-4 lg:px-0"
          >
            <GlassmorphicCard className="overflow-hidden rounded-xl p-6">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for books, research papers, authors..."
                    className="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-3 pr-4 pl-10 text-gray-700 focus:border-[#053fa8] focus:ring-2 focus:ring-[#053fa8]/50 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-white dark:focus:border-blue-500"
                  />
                  <FaSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-[#053fa8] px-5 py-3 font-medium text-white transition-colors hover:bg-[#053fa8]/90 focus:ring-2 focus:ring-[#053fa8]/50 focus:outline-none dark:bg-[#053fa8] dark:hover:bg-[#053fa8]/80"
                >
                  Search
                </button>
              </form>
            </GlassmorphicCard>
          </motion.div>

          {/* Image Carousel with glassmorphic effects */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-8 flex w-full justify-center rounded-lg px-4 lg:px-0"
          >
            <GlassmorphicCard className="w-full max-w-7xl overflow-hidden rounded-xl p-0">
              <div className="w-full max-w-7xl">
                <Carousel
                  showThumbs={false}
                  showArrows={true}
                  autoPlay={true}
                  infiniteLoop={true}
                  interval={4000}
                  showStatus={false}
                  stopOnHover={false}
                  dynamicHeight={false}
                  className="rounded-xl"
                >
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/Galo.jpg"
                      alt="Carousel Image 1"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white shadow-sm">
                        Galo Hall
                      </h2>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/RizalEntrance.jpg"
                      alt="Carousel Image 2"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white shadow-sm">
                        Rizal Entrance
                      </h2>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/CollegeAtrium.jpg"
                      alt="Carousel Image 3"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white shadow-sm">
                        College Atrium
                      </h2>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/SwimCenter.jpg"
                      alt="Carousel Image 4"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white shadow-sm">
                        Swim Center
                      </h2>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/Amistad.jpg"
                      alt="Carousel Image 5"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h2 className="text-2xl font-bold text-white shadow-sm">
                        Amistad
                      </h2>
                    </div>
                  </div>
                </Carousel>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="mx-auto mt-10 max-w-7xl px-6 lg:px-8"
          >
            {/* First Section */}
            <motion.div variants={fadeIn} className="mb-14">
              <GlassmorphicCard
                className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                hoverEffect
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 p-3 text-blue-600 sm:h-20 sm:w-20 dark:bg-blue-500/20 dark:text-blue-400">
                    <FaClockRotateLeft className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-blue-800 sm:text-3xl dark:text-blue-300">
                      The First Higher Education Institution in Negros
                      Occidental
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Dive deep into various disciplines and explore a wealth of
                      knowledge contributed by our students and faculty. Our
                      repository houses documents, research papers, and valuable
                      resources curated for your academic and professional
                      growth.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Second Section */}
            <motion.div variants={fadeIn} className="mb-14">
              <GlassmorphicCard
                className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                hoverEffect
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/10 p-3 text-indigo-600 sm:h-20 sm:w-20 dark:bg-indigo-500/20 dark:text-indigo-400">
                    <FaSchool className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-indigo-800 sm:text-3xl dark:text-indigo-300">
                      Founded by the Augustinian Sisters of our Lady of
                      Consolation
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      La Consolacion College Bacolod was first established in
                      1919 by the Augustinian Sisters from Spain under the
                      leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo, OSA
                      upon the invitation of a Catholic Bishop to put up a
                      school in Bacolod City, now the capital of Negros
                      Occidental, Philippines – one of the world's top suppliers
                      of sugar at that time.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Third Section */}
            <motion.div variants={fadeIn} className="mb-14">
              <GlassmorphicCard
                className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                hoverEffect
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-purple-600/10 p-3 text-purple-600 sm:h-20 sm:w-20 dark:bg-purple-500/20 dark:text-purple-400">
                    <FaGraduationCap className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-purple-800 sm:text-3xl dark:text-purple-300">
                      Pioneer in Education
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      With a campus located at the center of Bacolod City, the
                      first educational offerings of La Consolacion College
                      Bacolod were primary and intermediate school certificates.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Fourth Section */}
            <motion.div variants={fadeIn} className="mb-14">
              <GlassmorphicCard
                className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                hoverEffect
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600/10 p-3 text-cyan-600 sm:h-20 sm:w-20 dark:bg-cyan-500/20 dark:text-cyan-400">
                    <FaBook className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-cyan-800 sm:text-3xl dark:text-cyan-300">
                      School of Girls
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      The first students of La Consolacion College Bacolod were
                      girls from wealthy families of Negros Occidental until the
                      1960's when the provincial economy was hit by a global
                      crisis in the sugar industry, LCCB became co-educational
                      and opened its doors to provide greater access to
                      education for the poor – reinforcing its mission for
                      evangelization through education.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Fifth Section */}
            <motion.div variants={fadeIn} className="mb-14">
              <GlassmorphicCard
                className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                hoverEffect
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600/10 p-3 text-emerald-600 sm:h-20 sm:w-20 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <FaBookmark className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3 text-2xl font-bold text-emerald-800 sm:text-3xl dark:text-emerald-300">
                      Physical and Academic Advancement
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      There was a rapid growth of student population as
                      educational offerings and scholarship opportunities were
                      increasingly offered. The college pioneered the offering
                      of architecture, fine arts and interior design degree
                      programs in addition to its teacher education and commerce
                      degrees. It was followed by the offering of culinary,
                      hospitality and tourism degree programs which were also
                      the first of their kind in the province.
                    </p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
