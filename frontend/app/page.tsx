"use client";

import Navigation from "./components/Navigation";
import Header from "./components/Header";

export default function HomePage() {
	return (
		<div className="flex relative"> {/* Make the parent relative for absolute positioning */}
			<Navigation />
			<div className="grow h-[100vh] flex relative"> {/* Use relative positioning here as well */}
				<div className="absolute inset-0 flex"> {/* Background wrapper */}
					<div className="w-4/6 bg-[#C1BEAF]" /> {/* Left half with green background */}
					<div className="w-1/2 bg-[#FBFAF5]" /> {/* Right half with blue background */}
				</div>
				<div className="w-full flex flex-col z-10"> {/* Content container on top */}
					<Header />
					<div className="ml-5 mt-16"> {/* Added margin for positioning */}
						<h1 className="text-7xl text-left break-words">
							Welcome to the, <br />
							LCCB Thesis Repository
						</h1>
						<p className="text-2xl text-left mt-7 break-words">
							This is your space for discovering new research and fresh ideas. We invite you to explore our collection, <br />
							where you can find inspiration for your own work. Dive in and see what sparks your creativity! <br />
							Whether you’re looking for a topic, examples, or just something new to think about, <br />
							you’re in the right place.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
