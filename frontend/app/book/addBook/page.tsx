"use client";

import AddEditBookForm from "@/app/_components/AddEditBookForm";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";

export default function AddBookPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      {/* Main Content with Sidebar under the banner */}
      <div className="ml-4 flex flex-1">
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="mx-auto mt-5 max-w-7xl rounded-lg border px-4 py-2">
            <AddEditBookForm heading="Add Book / Repository" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
