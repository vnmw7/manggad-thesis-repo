import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter(); // Ensure the router is initialized here

  return (
    <footer className="mt-14 bg-[#0442B1] py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Manggad. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:underline"
            onClick={() => router.push("/about")}
          >
            About
          </a>
          <a
            className="cursor-pointer hover:underline"
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
