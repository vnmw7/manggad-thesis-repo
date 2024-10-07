"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    const formattedTime = time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const formattedDate = time.toLocaleDateString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="text-8xl text-right text-[#262832]" style={{ marginBottom: "635px" }}> {/* Right-aligned text */}
            <div>{formattedTime}</div>
            <div className="text-3xl" style={{ marginLeft: "550px"}}>{formattedDate}</div> {/* Date displayed below the time */}
        </div>
    );
};

export default function HomePage() {
    return (
        <div className="flex relative">
            <Navigation />
            <div className="grow h-[100vh] flex relative">
                <div className="absolute inset-0 flex">
                    <div className="w-4/6 bg-[#C1BEAF] overflow-hidden relative"> {/* Left side scrollable */}
                        <div className="grid grid-cols-4 gap-4 p-6">
                            <h2 className="text-3xl font-bold col-span-4" style={{ marginTop: "500px", fontFamily: "Lora Bold" }}>Recommended</h2>
                            <a href="#" className="text-[#262832] hover:underline col-span-4 self-start text-right -mt-10 z-20">
                                View More
                            </a>
                            
                            {/* Card 1 */}
                            <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50 hover:bg-blue-500 hover:shadow-xl duration-300">
                                <h3 className="font-semibold text-xl">Card Title 1</h3>
                                <p className="text-gray-700">Brief description of the research or topic. This is a short summary.</p>
                            </div>
                            
                            {/* Card 2 */}
                            <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
                                <h3 className="font-semibold text-xl">Card Title 2</h3>
                                <p className="text-gray-700">Brief description of the research or topic. This is a short summary.</p>
                            </div>
                            
                            {/* Card 3 */}
                            <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
                                <h3 className="font-semibold text-xl">Card Title 3</h3>
                                <p className="text-gray-700">Brief description of the research or topic. This is a short summary.</p>
                            </div>
                            
                            {/* Card 4 */}
                            <div className="bg-[#d4d4d4] p-4 rounded shadow cursor-pointer z-50  hover:bg-blue-500 hover:shadow-xl duration-300">
                                <h3 className="font-semibold text-xl">Card Title 4</h3>
                                <p className="text-gray-700">Brief description of the research or topic. This is a short summary.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 bg-[#d4d4d4] flex flex-col items-center justify-center">
                           <Clock /> {/* Render the Clock component */}

                                   {/* Quote of the Day */}
                               <div className="mt-1 text-center">
                            <p className="text-lg font-semibold" style={{ marginTop: "-565px", textAlign:"left", fontFamily: "Lora Bold" }}>"Your inspirational quote of the day here!"</p>
                            <p className="text-sm text-gray-600">- Author's Name</p>
                       </div>
                        </div>
                      </div>

                <div className="w-full flex flex-col z-10">
                    <Header />
                    <div className="ml-6 mt-12">
                        <h1 className="text-7xl text-left break-words">
                            Manggad :<br />
                            LCCB Research Repository
                        </h1>
                        <p className="text-xl text-left mt-7 break-words">
                            This is your space for discovering new research and fresh ideas. We invite you to explore our collection, <br />
                            where you can find inspiration for your own work. Dive in and see what sparks your creativity! <br />
                            Whether you’re looking for a topic, examples, or just something new to think about, <br />
                            you’re in the right place.
                        </p>
                        <div className="w-36 mt-6">
                            <button className="flex items-center transition-colors duration-300 hover:bg-blue-500 px-4 py-2 rounded">
                                Read now
                                <FontAwesomeIcon icon={faArrowRight} className="ml-5 w-6 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}