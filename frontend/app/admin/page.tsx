"use client"

import Navigation from "../components/Navigation";
import Header from "../components/Header";


const Dashboard = () => {
	return (
		<div className="flex">
            <Navigation />

            <div className="grow h-[100vh]">
                <div>
                    <Header />
                    <h1> Current Uploaded Books </h1>
                </div>
            </div>
        </div>
	);
}

export default Dashboard;