/*
System: MANGGAD - Research Repository Management System
Module: Dashboard Content (SPA Component)
File URL: Frontend/app/home/dashboardContent.tsx
Purpose: Admin dashboard showing repository statistics, metrics, and recent activity within the SPA
*/

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaBook,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheckCircle,
  FaUserClock,
  FaClipboardList,
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

// Stat Card component
const StatCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
  iconColor,
  iconBgColor,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  iconColor: string;
  iconBgColor: string;
}) => {
  return (
    <GlassmorphicCard className="h-full" hoverEffect>
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
            {trend && trendValue && (
              <p
                className={`ml-2 text-sm ${
                  trend === "up"
                    ? "text-green-500"
                    : trend === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"}{" "}
                {trendValue}
              </p>
            )}
          </div>
        </div>
      </div>
    </GlassmorphicCard>
  );
};

// Activity Item component
const ActivityItem = ({
  action,
  subject,
  timestamp,
  icon,
  iconColor,
  iconBgColor,
}: {
  action: string;
  subject: string;
  timestamp: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
}) => {
  return (
    <div className="flex items-start space-x-3 border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700">
      <div
        className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-medium">{action}</span> {subject}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default function DashboardContent() {
  const router = useRouter();

  // Dummy stats data for demonstration
  const [stats, setStats] = useState({
    totalBooks: 487,
    totalDownloads: 2438,
    totalViews: 8764,
    activeUsers: 126,
    recentUploads: 18,
    pendingApprovals: 7,
  });

  // Function to simulate fetching updated stats
  const fetchUpdatedStats = async () => {
    // In a real application, this would be an API call
    // For demonstration, we'll generate some random changes
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate random changes to stats
      const randomChange = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1) + min);

      setStats((prevStats) => ({
        totalBooks: prevStats.totalBooks + randomChange(0, 5),
        totalDownloads: prevStats.totalDownloads + randomChange(10, 50),
        totalViews: prevStats.totalViews + randomChange(20, 100),
        activeUsers: prevStats.activeUsers + randomChange(-3, 7),
        recentUploads: prevStats.recentUploads + randomChange(0, 3),
        pendingApprovals: Math.max(
          0,
          prevStats.pendingApprovals + randomChange(-2, 3),
        ),
      }));

      return true;
    } catch (error) {
      console.error("Error updating stats:", error);
      return false;
    }
  };

  // Function to simulate fetching updated activity
  const fetchUpdatedActivity = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Sample new activities that might appear
      const newActivities = [
        {
          id: Date.now(),
          action: "New upload:",
          subject: "Innovations in Renewable Energy Technology",
          timestamp: "Just now",
          icon: <FaBook className="h-4 w-4" />,
          iconColor: "text-purple-500",
          iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
          id: Date.now(),
          action: "Most viewed:",
          subject: "Digital Marketing Strategies for Local Businesses",
          timestamp: "Just now",
          icon: <FaEye className="h-4 w-4" />,
          iconColor: "text-blue-500",
          iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          action: "New user:",
          subject: "Juan Dela Cruz joined the platform",
          timestamp: "Just now",
          icon: <FaUserGraduate className="h-4 w-4" />,
          iconColor: "text-indigo-500",
          iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          action: "Approved:",
          subject: "Machine Learning Applications in Agriculture",
          timestamp: "Just now",
          icon: <FaCheckCircle className="h-4 w-4" />,
          iconColor: "text-green-500",
          iconBgColor: "bg-green-100 dark:bg-green-900/30",
        },
      ];

      // Add a random new activity to the top and remove the oldest one
      const randomIndex = Math.floor(Math.random() * newActivities.length);
      const newActivity = newActivities[randomIndex];

      setRecentActivity((prevActivities) => {
        // Create a new array with the new activity at the top
        const updatedActivities = [
          { ...newActivity, id: Date.now() },
          ...prevActivities.slice(0, -1),
        ];
        return updatedActivities;
      });

      return true;
    } catch (error) {
      console.error("Error updating activity:", error);
      return false;
    }
  };

  // State for tracking refresh status
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handler for manual refresh - update both stats and activity
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Run both updates in parallel
    await Promise.all([fetchUpdatedStats(), fetchUpdatedActivity()]);
    setIsRefreshing(false);
  };

  // Set up auto-refresh interval (every 5 minutes)
  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      // Silently refresh data without showing loading indicator
      Promise.all([fetchUpdatedStats(), fetchUpdatedActivity()]);
    }, 300000); // 5 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(autoRefreshInterval);
  }, []);

  // Dummy list of recent activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: "New upload:",
      subject: "The Impact of AI on Modern Education Systems",
      timestamp: "Just now",
      icon: <FaBook className="h-4 w-4" />,
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 2,
      action: "Approved:",
      subject: "Sustainable Tourism Practices in Negros Occidental",
      timestamp: "2 hours ago",
      icon: <FaCheckCircle className="h-4 w-4" />,
      iconColor: "text-green-500",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      action: "Most viewed:",
      subject: "A Comparative Analysis of Web Framework Performance",
      timestamp: "4 hours ago",
      icon: <FaEye className="h-4 w-4" />,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 4,
      action: "New user:",
      subject: "Maria Santos joined the platform",
      timestamp: "Yesterday",
      icon: <FaUserGraduate className="h-4 w-4" />,
      iconColor: "text-indigo-500",
      iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      id: 5,
      action: "Most downloaded:",
      subject: "Financial Management Strategies for Small Businesses",
      timestamp: "2 days ago",
      icon: <FaDownload className="h-4 w-4" />,
      iconColor: "text-teal-500",
      iconBgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
  ]);

  // Department distribution data
  const [departmentStats] = useState([
    { name: "SARFAID", count: 84, percentage: "17%" },
    { name: "SBIT", count: 156, percentage: "32%" },
    { name: "SHTM", count: 112, percentage: "23%" },
    { name: "SSLATE", count: 135, percentage: "28%" },
  ]);

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

  // Simulating data fetch
  useEffect(() => {
    // This would be replaced with an actual API call in a real application
    const fetchData = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      // Data would be fetched from API
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1">
      {/* Page Title */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto mt-8 w-full max-w-7xl px-4 lg:px-0"
      >
        <GlassmorphicCard className="overflow-hidden rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0A379C] dark:text-blue-300">
                Repository Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Overview of repository performance and statistics
              </p>
            </div>
            <div className="mt-4 flex items-center md:mt-0">
              <div className="rounded-md bg-blue-50 p-3 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                <FaCalendarAlt className="mr-1 inline h-3 w-3" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <button
                onClick={handleRefresh}
                className="ml-4 rounded-md bg-blue-50 p-3 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
              >
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="mx-auto mt-8 max-w-7xl px-4 lg:px-0"
      >
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Key Metrics
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaBook className="h-6 w-6" />}
              title="Total Publications"
              value={stats.totalBooks}
              trend="up"
              trendValue="12% from last month"
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaDownload className="h-6 w-6" />}
              title="Total Downloads"
              value={stats.totalDownloads}
              trend="up"
              trendValue="8% from last month"
              iconColor="text-green-600"
              iconBgColor="bg-green-100 dark:bg-green-900/30"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaEye className="h-6 w-6" />}
              title="Total Views"
              value={stats.totalViews}
              trend="up"
              trendValue="15% from last month"
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100 dark:bg-purple-900/30"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaUserClock className="h-6 w-6" />}
              title="Active Users"
              value={stats.activeUsers}
              trend="up"
              trendValue="5% from last month"
              iconColor="text-indigo-600"
              iconBgColor="bg-indigo-100 dark:bg-indigo-900/30"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaBook className="h-6 w-6" />}
              title="Recent Uploads"
              value={stats.recentUploads}
              trendValue="This month"
              iconColor="text-amber-600"
              iconBgColor="bg-amber-100 dark:bg-amber-900/30"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <StatCard
              icon={<FaClipboardList className="h-6 w-6" />}
              title="Pending Approvals"
              value={stats.pendingApprovals}
              iconColor="text-red-600"
              iconBgColor="bg-red-100 dark:bg-red-900/30"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Department Distribution */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto mt-10 max-w-7xl px-4 lg:px-0"
      >
        <GlassmorphicCard className="overflow-hidden rounded-xl p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
            Publication Distribution by Department
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {departmentStats.map((dept) => (
              <div
                key={dept.name}
                className="relative overflow-hidden rounded-lg border border-gray-200 bg-white/60 p-4 dark:border-gray-700 dark:bg-gray-800/60"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={`/${dept.name}.png`}
                      alt={`${dept.name} Logo`}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {dept.name}
                    </h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                        {dept.count}
                      </p>
                      <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({dept.percentage})
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                    style={{ width: dept.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto mt-10 max-w-7xl px-4 lg:px-0"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GlassmorphicCard className="h-full overflow-hidden rounded-xl p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-200">
                Recent Activity
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    action={activity.action}
                    subject={activity.subject}
                    timestamp={activity.timestamp}
                    icon={activity.icon}
                    iconColor={activity.iconColor}
                    iconBgColor={activity.iconBgColor}
                  />
                ))}
              </div>
            </GlassmorphicCard>
          </div>

          <div>
            <GlassmorphicCard className="h-full overflow-hidden rounded-xl p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-200">
                Quick Actions
              </h2>

              <div className="space-y-3">
                {/* Add New Publication button removed - route /book/addBook no longer exists */}
                {/* Use "Manage Collections" > "Add Thesis" in the SideNav instead */}

                <button
                  onClick={() => router.push("/collection")}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white/80 p-3 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:hover:bg-blue-900/20"
                >
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <FaBookOpen className="h-4 w-4" />
                    </div>
                    <span className="ml-3">Manage Collections</span>
                  </div>
                  <FaChevronRight className="h-4 w-4 text-gray-400" />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white/80 p-3 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:hover:bg-blue-900/20">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      <FaClipboardCheck className="h-4 w-4" />
                    </div>
                    <span className="ml-3">Review Pending Publications</span>
                  </div>
                  <FaChevronRight className="h-4 w-4 text-gray-400" />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white/80 p-3 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white dark:hover:bg-blue-900/20">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      <FaChartBar className="h-4 w-4" />
                    </div>
                    <span className="ml-3">View Detailed Analytics</span>
                  </div>
                  <FaChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      System Notification
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                      <p>
                        Scheduled maintenance on June 15, 2025. The system will
                        be unavailable from 2:00 AM to 4:00 AM (UTC+8).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const FaBookOpen = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className={className}
    fill="currentColor"
  >
    <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" />
  </svg>
);

const FaClipboardCheck = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className={className}
    fill="currentColor"
  >
    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
  </svg>
);

const FaChartBar = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    fill="currentColor"
  >
    <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64c0-17.7 14.3-32 32-32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
  </svg>
);

const FaChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    className={className}
    fill="currentColor"
  >
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
  </svg>
);

const FaInfoCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    fill="currentColor"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
  </svg>
);
