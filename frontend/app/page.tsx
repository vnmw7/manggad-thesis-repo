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
                    <h1> This is the Home Page </h1>
                </div>
            </div>
        </div>
	);
}
