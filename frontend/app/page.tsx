"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const createNotification = (message: string, type: string) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.5s ease-in-out;
    `;

    if (type === 'success') {
      notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#f44336';
    } else {
      notification.style.backgroundColor = '#2196F3';
    }

    notification.textContent = message;

    document.body.appendChild(notification);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease-in-out';
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      createNotification('Please enter a search query', 'error');
      return;
    }
    createNotification('Searching...', 'info');
    setTimeout(() => {
      router.push(`/book/search?query=${searchQuery}`);
    }, 1000);
  };

  const handleHomePage = () => {
    createNotification('Redirecting to homepage...', 'success');
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  return (
    <div className="flex h-[100vh]">
      {/* Left Side Background Image */}
      <div
        className="h-full w-[50vw] bg-cover bg-no-repeat hidden lg:block"
        style={{ backgroundImage: "url('/sample.jpg')" }}
      />

      {/* Right Side Logos and Text */}
      <div className="flex h-full w-full lg:w-[50vw] flex-col items-center bg-[#ffffff] px-4 sm:px-8 lg:px-16 overflow-y-auto justify-between">
        {/* Logo Section */}
        <div className="mb-1 flex items-center">
          <div className="mt-8 h-24 aspect-square">
            <img
              src="MANGGAD LOGO.png"
              alt="Manggad Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-4 mt-8 h-[90px] aspect-square">
            <img
              src="lccb.png"
              alt="lccb"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Centered Text Under Logos */}
        <h2 className="mt-8 text-center text-4xl font-semibold">
          <div> MANGGAD </div>
          <div className="text-3xl font-bold text-[#0A379C]">
            Research Repository Management System
          </div>
        </h2>

        {/* Centered Search Bar Under the H2 Text */}
        <div className="mt-12 flex w-full justify-center">
          <div className="flex w-full max-w-[1000px] items-center flex-col lg:flex-row">
            <input
              type="text"
              placeholder="Search Related Studies"
              className="flex-grow border border-gray-300 px-4 py-2 transition-colors placeholder:text-[#262832]"
              style={{ color: "#262832", borderColor: "#262832" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex justify-between w-full lg:w-72">
              <button
                className="w-32 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 lg:ml-2"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="w-64 rounded-lg bg-[#0442B1] px-4 py-2 text-white transition hover:bg-blue-600 lg:ml-2"
                onClick={handleHomePage}
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>

        {/* Justified Paragraph */}
        <div className="mt-12 flex w-full justify-center">
          <div className="w-full max-w-[1000px]">
            <p className="text-justify text-base lg:text-xl text-gray-700">
              This system helps users easily find and organize research papers,
              theses, and other documents. It makes it easy to access a large
              collection of studies, supporting the growth of knowledge and
              research.
            </p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="mt-4 flex w-full justify-center">
          <p className="text-center text-gray-500">
            © Manggad. All rights reserved. 2024
          </p>
        </div>
      </div>
    </div>
  );
}