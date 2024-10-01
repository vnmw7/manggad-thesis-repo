"use client"

import Navigation from "./components/Navigation";
import Header from "./components/Header";

export default function HomePage() {
	return (
		<div className="flex">
			<Navigation />
			<div className="grow h-[100vh]">
				<div>
					<Header />
                    <div>
                    <h1 className="text-7xl text-left ml-5 mt-16 break-words">
                    Welcome to the, <br></br> 
                    LCCB Thesis Repository
					</h1>
                        <p className="text-2xl text-left ml-5 mt-7 break-words">This is your space for discovering new research and fresh ideas. We invite you to explore our collection, <br></br>
                            where you can find inspiration for your own work. Dive in and see what sparks your creativity! <br></br>
                            Whether you’re looking for a topic, examples, or just something new to think about, <br></br>
                            you’re in the right place.
                        </p>
                    </div>

				</div>
			</div>
		</div>
	);
}
