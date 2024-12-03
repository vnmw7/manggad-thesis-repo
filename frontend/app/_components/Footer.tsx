import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter(); // Ensure the router is initialized here

  return (
    <footer className="bg-[#0442B1] text-white py-4 mt-14">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Manggad. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline" onClick={() => router.push("/about")}>
            About 
          </a>
          <a
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
