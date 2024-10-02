"use client";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the diagonal arrow icon
import Carousel from "../app/components/Carousel"; // Import your Carousel component

export default function HomePage() {
	return (
		<div className="flex relative">
			<Navigation />
			<div className="grow h-[100vh] flex relative">
				<div className="absolute inset-0 flex">
					<div className="w-4/6 bg-[#C1BEAF] overflow-hidden relative"> {/* Make left side scrollable */}
						<Carousel /> {/* Your carousel component */}
					</div>
					<div className="w-1/2 bg-[#d4d4d4]" />
				</div>
				<div className="w-full flex flex-col z-10">
					<Header />
					<div className="ml-3 mt-7">
						<h1 className="text-7xl text-left break-words">
							Welcome to Manggad :<br />
							LCCB Thesis Repository
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
