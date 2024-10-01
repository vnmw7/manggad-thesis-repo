import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTh, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    return (
        <div className="bg-[#C1BEAF] w-20 h-screen border-r border-r-[#b9bdd3] border-transparent flex flex-col relative">
            {/* Logo Container */}
            <div className="mb-4 flex justify-center mt-1"> {/* Use negative margin to adjust logo position */}
                <Image 
                    src="/lccb.png" 
                    alt="Logo" 
                    width={400} // Adjust width here for responsiveness
                    height={400} // Adjust height here for responsiveness
                    className="object-contain max-w-full" 
                />
            </div>
            {/* Navigation Items */}
            <ul className="flex flex-col items-center mt-4 space-y-4"> {/* Adjust mt to ensure items are spaced correctly */}
                {[
                    { icon: faHome, label: "Home" },
                    { icon: faTh, label: "Categories" },
                    { icon: faArrowUp, label: "Updates" }
                ].map((item, index) => (
                    <li key={index} className="relative">
                        <div className="w-14 h-14 bg-[#262832] rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-blue-500 hover:cursor-pointer">
                            <FontAwesomeIcon icon={item.icon} className="text-white" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navigation;
