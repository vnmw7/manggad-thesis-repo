"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch, FaSchool } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
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

type ContentSectionType = "home" | "about" | "history" | "academics";

export default function HomeContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // State to track which content section is currently displayed
  const [activeSection, setActiveSection] =
    useState<ContentSectionType>("home");

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

  // Page transition animation
  const pageTransition = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
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

  // Function to render the appropriate content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <motion.div
            key="home-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
          >
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
              className="mx-auto mt-10 max-w-7xl"
            >
              {/* First Section */}
              <motion.div variants={fadeIn} className="mb-14">
                <GlassmorphicCard
                  className="overflow-hidden rounded-xl p-6 shadow-md sm:p-8"
                  hoverEffect
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 p-3 text-blue-600 sm:h-20 sm:w-20 dark:bg-blue-500/20 dark:text-blue-400">
                      <i className="ri-history-line text-2xl sm:text-3xl"></i>
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-3 text-2xl font-bold text-blue-800 sm:text-3xl dark:text-blue-300">
                        The First Higher Education Institution in Negros
                        Occidental
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        Dive deep into various disciplines and explore a wealth
                        of knowledge contributed by our students and faculty.
                        Our repository houses documents, research papers, and
                        valuable resources curated for your academic and
                        professional growth.
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
                        Founded by the Augustinian Sisters
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        La Consolacion College Bacolod was first established in
                        1919 by the Augustinian Sisters from Spain under the
                        leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo,
                        OSA upon the invitation of a Catholic Bishop.
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
                      <FaSchool className="h-8 w-8 sm:h-10 sm:w-10" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-3 text-2xl font-bold text-purple-800 sm:text-3xl dark:text-purple-300">
                        Pioneer in Education
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        With a campus located at the center of Bacolod City, the
                        first educational offerings of La Consolacion College
                        Bacolod were primary and intermediate school
                        certificates.
                      </p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case "about":
        return (
          <motion.div
            key="about-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
            className="mx-auto mt-8 max-w-7xl px-4 lg:px-0"
          >
            <GlassmorphicCard className="overflow-hidden rounded-xl p-8">
              <h1 className="mb-6 text-3xl font-bold text-indigo-800 dark:text-indigo-300">
                About MANGGAD
              </h1>

              <div className="space-y-6">
                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    MANGGAD serves as the digital repository of La Consolacion
                    College Bacolod, dedicated to collecting, preserving, and
                    providing access to the scholarly and creative output of the
                    LCCB community. Our goal is to make these resources freely
                    available to support research, teaching, and learning.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    What We Offer
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our digital repository provides access to a wide range of
                    academic content including:
                  </p>
                  <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Faculty research and publications</li>
                    <li>Student theses and dissertations</li>
                    <li>Conference papers and presentations</li>
                    <li>Technical reports and working papers</li>
                    <li>Educational resources and learning materials</li>
                    <li>Historical documents and archives of LCCB</li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Why MANGGAD?
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    The name &quot;MANGGAD&quot; comes from the Hiligaynon word
                    meaning &quot;treasure&quot; or &quot;wealth,&quot;
                    representing the valuable intellectual assets of our
                    institution. Just as traditional treasures are carefully
                    preserved and valued, our digital repository safeguards and
                    shares the academic treasures of La Consolacion College
                    Bacolod.
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        );

      case "history":
        return (
          <motion.div
            key="history-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
            className="mx-auto mt-8 max-w-7xl px-4 lg:px-0"
          >
            <GlassmorphicCard className="overflow-hidden rounded-xl p-8">
              <h1 className="mb-6 text-3xl font-bold text-indigo-800 dark:text-indigo-300">
                History of LCCB
              </h1>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                  <div className="flex-shrink-0 md:w-1/3">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg">
                      <Image
                        src="/StaMonica.jpg"
                        alt="Historical LCCB"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-2/3">
                    <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                      The Beginning (1919)
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      La Consolacion College Bacolod was founded in 1919 by the
                      Augustinian Sisters from Spain under the leadership of Mo.
                      Rita Barcelo, OSA and Mo. Consuelo, OSA. It started as a
                      humble school offering primary and intermediate education,
                      making it the first higher education institution in Negros
                      Occidental.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Growth and Development
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Over the decades, LCCB expanded its educational programs and
                    campus facilities. In 1925, it began offering secondary
                    education, and by 1945, after World War II, the college
                    department was established. The 1960s and 1970s saw the
                    introduction of various degree programs that responded to
                    the needs of the community and industry.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Modern Era
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Today, La Consolacion College Bacolod stands as a premier
                    Catholic educational institution in the region, offering
                    programs across various disciplines including Business,
                    Education, Hospitality Management, Information Technology,
                    and more. The institution continues to uphold its
                    Augustinian values while embracing modern educational
                    approaches and technologies.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Legacy of Excellence
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    For over a century, LCCB has been committed to providing
                    quality education guided by Catholic Augustinian values.
                    Thousands of graduates have gone on to make significant
                    contributions in various fields locally and internationally,
                    embodying the institution&apos;s motto of &quot;Scientia,
                    Virtus, Devotio&quot; (Knowledge, Virtue, Devotion).
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        );

      case "academics":
        return (
          <motion.div
            key="academics-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
            className="mx-auto mt-8 max-w-7xl px-4 lg:px-0"
          >
            <GlassmorphicCard className="overflow-hidden rounded-xl p-8">
              <h1 className="mb-6 text-3xl font-bold text-indigo-800 dark:text-indigo-300">
                Academic Programs
              </h1>

              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Schools and Colleges
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                      <div className="mb-3 flex items-center">
                        <Image
                          src="/SBIT.png"
                          alt="SBIT Logo"
                          width={50}
                          height={50}
                          className="mr-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          School of Business, IT & Accountancy
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Offering programs in Business Administration,
                        Accountancy, and Information Technology designed to
                        equip students with the skills needed in the business
                        and technology sectors.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                      <div className="mb-3 flex items-center">
                        <Image
                          src="/SHTM.png"
                          alt="SHTM Logo"
                          width={50}
                          height={50}
                          className="mr-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          School of Hospitality & Tourism Management
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Preparing students for careers in the hospitality and
                        tourism industry through programs in Hotel and
                        Restaurant Management, Tourism Management, and Culinary
                        Arts.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                      <div className="mb-3 flex items-center">
                        <Image
                          src="/SSLATE.png"
                          alt="SSLATE Logo"
                          width={50}
                          height={50}
                          className="mr-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          School of Liberal Arts, Teacher Education, & Sciences
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Focusing on programs in Education, Languages,
                        Communication, Psychology, and Natural Sciences to
                        develop well-rounded professionals in these fields.
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white/70 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                      <div className="mb-3 flex items-center">
                        <Image
                          src="/SARFAID.png"
                          alt="SARFAID Logo"
                          width={50}
                          height={50}
                          className="mr-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          School of Architecture, Fine Arts & Industrial Design
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Nurturing creativity and technical skills through
                        programs in Architecture, Fine Arts, and Industrial
                        Design for future designers and artists.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Graduate Programs
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    LCCB offers various graduate programs designed for
                    professionals seeking to enhance their knowledge and skills
                    in their respective fields. These include Master&apos;s
                    programs in Business Administration, Education, and other
                    specialized disciplines.
                  </p>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                    Research and Publication
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    The institution places strong emphasis on research and
                    publication across all academic departments. Faculty members
                    and students are encouraged to conduct research that
                    contributes to knowledge creation and addresses societal
                    issues. The MANGGAD repository serves as a platform to
                    showcase and preserve these scholarly works.
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        );
    }
  };

  return (
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

      {/* SPA Navigation Tabs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto mt-6 w-full max-w-7xl px-4 lg:px-0"
      >
        <GlassmorphicCard className="overflow-hidden rounded-xl p-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSection("home")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                activeSection === "home"
                  ? "bg-blue-600 text-white"
                  : "bg-white/50 text-gray-700 hover:bg-blue-100 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveSection("about")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                activeSection === "about"
                  ? "bg-blue-600 text-white"
                  : "bg-white/50 text-gray-700 hover:bg-blue-100 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              About MANGGAD
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                activeSection === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-white/50 text-gray-700 hover:bg-blue-100 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              LCCB History
            </button>
            <button
              onClick={() => setActiveSection("academics")}
              className={`rounded-lg px-4 py-2 transition-colors ${
                activeSection === "academics"
                  ? "bg-blue-600 text-white"
                  : "bg-white/50 text-gray-700 hover:bg-blue-100 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Academic Programs
            </button>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Dynamic Content Area */}
      {renderContent()}
    </div>
  );
}
