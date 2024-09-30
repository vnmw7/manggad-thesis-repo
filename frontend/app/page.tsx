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
                    <h1> Welcome to the LCCB Thesis Library Repository: Your go-to spot for research and ideas. Dive into our collection and find inspiration! </h1>
                </div>
            </div>
        </div>
	);
}
