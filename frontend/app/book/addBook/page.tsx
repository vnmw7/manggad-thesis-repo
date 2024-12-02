"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddBookForm from "@/app/_components/AddBookForm";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";

export default function AddBookPage() {
	const router = useRouter();

	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			{/* Main Content with Sidebar under the banner */}
			<div className="flex flex-1 ml-4">
				<SideNav />

				{/* Main Content Area */}
				<div className="flex-1">
					<div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto">
						<AddBookForm 
							title="Add Book / Research"
						/>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
