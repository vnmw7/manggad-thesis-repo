"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useRouter } from "next/navigation";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideNav from "../_components/SideNav";

export default function HomePage() {
  const router = useRouter();

  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // State for real-time clock and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Use useEffect to update the clock and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  	return (
      	<div className="w-full min-h-screen flex flex-col">
			<Header />

		{/* Main Content with Sidebar under the banner */}
		<div className="flex flex-1 ml-4">
			<SideNav />

			{/* Main Content Area */}
			<div className="flex-1">

			{/* Image Carousel */}
			<div className="w-full mt-8 flex justify-center rounded-lg">
				<div className="w-full max-w-7xl">
				<Carousel
					showThumbs={false}
					showArrows={false}
					autoPlay={true}
					infiniteLoop={true}
					interval={4000}
					showStatus={false}
					stopOnHover={false}  // Optional: Keeps autoPlay running when hovered
					dynamicHeight={false}
				>
					<div>
					<img src="Galo.jpg" alt="Carousel Image 1" className="object-fill h-[300px] w-full rounded-lg" />
					</div>
					<div>
					<img src="RizalEntrance.jpg" alt="Carousel Image 2" className="object-fill h-[300px] w-full rounded-lg" />
					</div>
					<div>
					<img src="CollegeAtrium.jpg" alt="Carousel Image 3" className="object-fill h-[300px] w-full rounded-lg" />
					</div>
					<div>
					<img src="SwimCenter.jpg" alt="Carousel Image 4" className="object-fill h-[300px] w-full rounded-lg" />
					</div>
					<div>
					<img src="Amistad.jpg" alt="Carousel Image 5" className="object-fill h-[300px] w-full rounded-lg" />
					</div>
				</Carousel>
				</div>
			</div>

			{/* First New Div Below the Carousel */}
			<div className="w-full flex justify-center mt-8 -ml-48">
				<div className="text-center max-w-4xl">
				<h2 className="text-5xl text-left font-bold text-[#0A379C] mb-2">The First Higher Education Institution in Negros Occidental</h2>
				<p className="text-gray-600 text-xl text-justify mt-5 max-full">
					Dive deep into various disciplines and explore a wealth of knowledge contributed by our students and faculty. 
					Our repository houses documents, research papers, and valuable resources curated for your academic and professional growth.
				</p>
				</div>
			</div>

			{/* Second New Div */}
			<div className="w-full flex justify-center mt-8 -ml-48">
				<div className="text-center max-w-4xl">
				<h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">Founded by the Augustinian Sisters of our Lady of Consolation</h2>
				<p className="text-gray-600 text-xl text-justify mt-5">
				La Consolacion College Bacolod was first established in 1919 by the Augustinian Sisters from Spain under the leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo, OSA upon the invitation of a Catholic Bishop to put up a school in Bacolod City, now the capital of Negros Occidental, Philippines – one of the world’s top suppliers of sugar at that time. 
				</p>
				</div>
			</div>

			{/* Third New Div */}
			<div className="w-full flex justify-center mt-8 -ml-48">
				<div className="text-center max-w-4xl">
				<h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">Pioneer in Education</h2>
				<p className="text-gray-600 text-xl text-justify mt-5">
				With a campus located at the center of Bacolod City, the first educational offerings of La Consolacion College Bacolod were primary and intermediate school certificates.
				</p>
				</div>
			</div>

			{/* Fourth New Div */}
			<div className="w-full flex justify-center mt-8 -ml-48">
				<div className="text-center max-w-4xl">
				<h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">School of Girls</h2>
				<p className="text-gray-600 text-xl text-justify mt-5">
				The first students of La Consolacion College Bacolod were girls from wealthy families of Negros Occidental until the 1960’s when the provincial economy was hit by a global crisis in the sugar industry, LCCB became co-educational and opened its doors to provide greater access to education for the poor – reinforcing its mission for evangelization through education.
				</p>
				</div>
			</div>

			{/* Fifth New Div */}
			<div className="w-full flex justify-center mt-8 -ml-48">
				<div className="text-center max-w-4xl">
				<h2 className="text-3xl text-justify font-bold text-[#0A379C] mb-2">Physical and Academic Advancement</h2>
				<p className="text-gray-600 text-xl text-justify mt-5">
				There was a rapid growth of student population as educational offerings and scholarship opportunities were increasingly offered. The college pioneered the offering of architecture, fine arts and interior design degree programs in addition to its teacher education and commerce degrees. It was followed by the offering of culinary, hospitality and tourism degree programs which were also the first of their kind in the province.
				</p>
				</div>
			</div>

			</div>
		</div>
    
		<Footer />
    </div>
  );
}
