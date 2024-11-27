"use client";

import AddBookForm from "@/app/_components/AddBookForm";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";

export default function AddBookPage() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			{/* Main Content with Sidebar under the banner */}
			<div className="flex flex-1 ml-4">
				<SideNav />

				{/* Main Content Area */}
				<div className="flex-1">
					<div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto">
						<AddBookForm />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}
