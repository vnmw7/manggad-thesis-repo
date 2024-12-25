import { useState } from "react";
import { useRouter } from "next/navigation";

const SideNav = () => {
  const router = useRouter();
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="w-[250px] h-[428px] bg-white] p-4 border rounded-lg mt-5">
      {/* BROWSE Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleDropdown("browse")}
          className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7h18M3 12h18m-7 5h7"
            />
          </svg>
          Browse
        </button>
        {openDropdown === "browse" && (
          <ul className="space-y-1">
            <li>
              <a
                className="text-lg hover:underline cursor-pointer"
                onClick={() => router.push("/book/search")}
              >
                Search Repository
              </a>
            </li>
            <li>
              <a
                className="text-lg hover:underline cursor-pointer"
                onClick={() => router.push("/collection")}
              >
                Collections
              </a>
            </li>
            <li>
              <a
                className="text-lg hover:underline cursor-pointer"
                onClick={() => router.push("/author")}
              >
                Authors
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Author Corner Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleDropdown("author")}
          className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.5 15.5l2.5-2.5-2.5-2.5m-11 7l-2.5-2.5 2.5-2.5M5 9h14m-7 10l-5-5h10l-5 5z"
            />
          </svg>
          Author Corner
        </button>
        {openDropdown === "author" && (
          <ul className="space-y-1">
            <li>
              <a
                className="text-lg hover:underline cursor-pointer"
                onClick={() => router.push("/faq")}
              >
                Author FAQ
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* CONNECT Section */}
      <div className="mb-4">
        <button
          onClick={() => toggleDropdown("connect")}
          className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 4.5l-7 7-7-7M19 15.5l-7 7-7-7"
            />
          </svg>
          About Manggad
        </button>
        {openDropdown === "connect" && (
          <ul className="space-y-1">
            <li>
              <a
                className="text-lg hover:underline cursor-pointer"
                onClick={() => router.push("/contact")}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://lcc.edu.ph/"
                className="text-lg hover:underline cursor-pointer"
              >
                LCCB Website
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideNav;
