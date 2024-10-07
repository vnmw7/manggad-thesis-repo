"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faArrowUp, faCog } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    return (
        <div className="bg-[#C1BEAF] w-20 h-screen border-r border-r-[#262832] border-transparent flex-col relative hidden justify-between lg:flex">
            {/* Logo Container */}
            <div className="mb-4 flex justify-center mt-1">
                <div style={{ backgroundImage: 'url("lccb.png")', aspectRatio: "1/1", width:"60px", height: "60px", backgroundSize: "contain", marginTop: "5px" }}></div>
            </div>

            {/* Navigation Items */}
            <ul className="flex flex-col items-center space-y-4 style">
                {[
                    { icon: faHome, label: "Home" },
                    { icon: faTh, label: "List" }, // Changed from "Categories" to "List"
                    { icon: faArrowUp, label: "Updates" },
                    { icon: faCog, label: "Settings" }
                ].map((item, index) => (
                    <li key={index} className="relative">
                        <div className="w-14 h-14 bg-[#262832] rounded-lg flex flex-col items-center justify-center transition-colors duration-300 hover:bg-blue-500 hover:cursor-pointer">
                            <FontAwesomeIcon icon={item.icon} className="text-white" />
                            <span className="text-white text-xs mt-1">{item.label}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navigation;
