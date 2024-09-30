"use client"

import Navigation from "./components/Navigation";
import Header from "./components/Header";


export default function HomePage() {

	return (
		<div className="flex">
            <Navigation />

            <div>
                <Header />
                <h1> This is the Home Page </h1>
            </div>
        </div>
	);
}
