"use client";

import React, { useState, useEffect } from "react";
//import Navigation from "./_components/Navigation";
//import Header from "./_components/Header";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
    return (
       /* <div className="flex relative"><Navigation /> */

            // <div className="grow h-[100vh] flex relative"> {/* whole screen except nav bar */} 
              //  <div className="absolute top-0 hidden h-[100vh] bg-blue-50 md:flex md:w-4/6"></div> {/* bg color */} 
              //  <div className="relative h-[100vh] w-full flex flex-col overflow-y-auto">
                 //   <Header /> 
        
                 <div className="flex h-[100vh]">
                 {/* Left Side Background Image */}
                 <div
                   className="bg-cover bg-no-repeat w-[50vw] h-full" // Use vw (viewport width) for responsiveness
                   style={{
                     backgroundImage: 'url("Library3.jpg")',
                   }}
                 />
               
                 {/* Right Side Logos and Text */}
                 <div className="flex flex-col items-center justify-start bg-[#ffffff] w-[50vw] h-full px-4 sm:px-8 lg:px-16"> 
                   {/* Responsive padding with px-4 for smaller screens */}
                   
                   {/* Logo Section */}
                   <div className="flex items-center mb-1">
                     <div className="w-[160px] h-[160px] mt-8">
                       <img src="MANGGAD LOGO.png" alt="Manggad Logo" className="w-full h-full object-contain" />
                     </div>
                     <div className="w-[130px] h-[130px] ml-4 mt-8">
                       <img src="lccb.png" alt="lccb" className="w-full h-full object-contain" />
                     </div>
                   </div>
               
                   {/* Centered Text Under Logos */}
                   <h2 className="text-center mt-16 text-3xl sm:text-4xl lg:text-5xl">
                     <div style={{ fontFamily: "Lora Bold" }}>MANGGAD</div>
                     <div className="mt-2 sm:mt-4" style={{ fontFamily: "Lora Bold" }}>
                       Research Repository Management System
                     </div>
                   </h2>
               
                   {/* Centered Search Bar Under the H2 Text */}
                   <div className="mt-24 w-full flex justify-center">
                     <div className="flex items-center w-full max-w-[1000px]">
                       <input 
                         type="text" 
                         placeholder="Search Related Studies" 
                         className="text-base border border-[#262832] rounded-lg bg-gray-100 transition-colors placeholder:text-[#262832] focus:outline-none flex-grow py-2 px-4"
                         style={{ color: '#262832', borderColor: '#262832' }}
                       />
                       {/* Button 1 */}
                       <button className="ml-2 px-4 py-2 w-32 bg-blue-500 text-white rounded-lg transition hover:bg-blue-600">
                         Search
                       </button>
                       {/* Button 2 */}
                       <button className="ml-2 px-4 py-2 w-64 bg-green-500 text-white rounded-lg transition hover:bg-green-600">
                         Login as Admin
                       </button>
                     </div>
                   </div>
               
                   {/* Justified Paragraph */}
                   <div className="mt-12 w-full flex justify-center">
                     <div className="w-full max-w-[1000px]">
                       <p className="text-justify text-gray-700 text-xl">
                       This system helps users easily find and organize research papers, theses, and other documents. It makes it easy to access a large collection of studies, supporting the growth of knowledge and research.
                       </p>
                     </div>
                   </div>
               
                   {/* Credit Section */}
                   <div className="w-full flex justify-center mt-48">
                     <p className="text-center text-gray-500">
                       © Aerospire. All rights reserved. 2024
                     </p>
                   </div>
                 </div>
               </div>
               
  );
}


        // <div className="flex relative">
        //     <Navigation /><div className="w-4/6 bg-[#C1BEAF] overflow-hidden relative">
        //     <div className="grow h-[100vh] flex relative">
        //         <div className="absolute inset-0 flex">
        //             <div className="w-4/6 bg-[#C1BEAF] overflow-hidden relative"> {/* Left side scrollable */}
        //                 <div className="grid grid-cols-4 gap-4 p-6">
        //                     <h2 className="text-3xl font-bold col-span-4" style={{ marginTop: "500px", fontFamily: "Lora Bold" }}>Recommended</h2>
        //                     <a href="#" className="text-[#262832] hover:underline col-span-4 self-start text-right -mt-10 z-20">
        //                         View More
        //                     </a>
                            
        //                     {/* Card 1 */}
        //                     <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50 hover:bg-blue-500 hover:shadow-xl duration-300">
        //                         <h3 className="font-semibold text-xl">LCCB Club Management System</h3>
        //                         <p className="text-gray-700 mt-4">Brief description of the research or topic. This is a short summary.</p>
        //                     </div>
                            
        //                     {/* Card 2 */}
        //                     <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
        //                         <h3 className="font-semibold text-xl">LCCB Events Scheduler System</h3>
        //                         <p className="text-gray-700 mt-4">Brief description of the research or topic. This is a short summary.</p>
        //                     </div>
                            
        //                     {/* Card 3 */}
        //                     <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
        //                         <h3 className="font-semibold text-xl">LCCB Scholarship Management System</h3>
        //                         <p className="text-gray-700 mt-4">Brief description of the research or topic. This is a short summary.</p>
        //                     </div>
                            
        //                     {/* Card 4 */}
        //                     <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
        //                         <h3 className="font-semibold text-xl">LCCB POS Inventory Management System</h3>
        //                         <p className="text-gray-700 mt-4">Brief description of the research or topic. This is a short summary.</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="w-1/2 bg-[#d4d4d4] flex flex-col items-center justify-center">
        //                    <Clock /> {/* Render the Clock component */}

        //                            {/* Quote of the Day */}
        //                        <div className="mt-1 text-center">
        //                     <p className="text-lg font-semibold" style={{ marginTop: "-565px", textAlign:"left", fontFamily: "Lora Bold" }}>"Your inspirational quote of the day here!"</p>
        //                     <p className="text-sm text-gray-600">- Author's Name</p>
        //                </div>
        //                 </div>
        //               </div>

        //         <div className="w-full flex flex-col z-10">
        //             <Header />
        //             <div className="ml-6 mt-12">
        //                 <h1 className="text-7xl text-left break-words">
        //                     Manggad :<br />
        //                     LCCB Research Repository
        //                 </h1>
        //                 <p className="text-xl text-left mt-7 break-words">
        //                     This is your space for discovering new research and fresh ideas. We invite you to explore our collection, <br />
        //                     where you can find inspiration for your own work. Dive in and see what sparks your creativity! <br />
        //                     Whether you’re looking for a topic, examples, or just something new to think about, <br />
        //                     you’re in the right place.
        //                 </p>
        //                 <div className="w-36 mt-6">
        //                     <button className="flex items-center transition-colors duration-300 hover:bg-blue-500 px-4 py-2 rounded">
        //                         Read now
        //                         <FontAwesomeIcon icon={faArrowRight} className="ml-5 w-6 h-5" />
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // </div>

