import { useState } from "react";

const MobileHeader = () => {
  const [showNav, setShowNavStatus] = useState(false); // state kng kitaun ang navigations or wala

  const navButtonClick = () => {
    // fuction para sa nav button
    setShowNavStatus(!showNav);
    console.log("nav button clicked");
  };

  return (
    <div>
      <div className="fixed left-0 top-0 z-10 flex w-full bg-slate-400">
        {" "}
        {/* this is the container sang header. gn separate ko into 2 parts —— navigations and others*/}
        {/* ari d ang navigation. basta burger menu */}
        <div className={`bg-gray-400 ${showNav ? "navigationMenu-shown" : ""}`}>
          {" "}
          {/* amo ni ang nav container nga pwede ma adjust */}
          <div
            className={`cursor-pointer ${showNav ? "bg-blue-500" : ""}`}
            onClick={navButtonClick}
          >
            {" "}
            nav button{" "}
          </div>
        </div>
        {/* ari d ang other parts sang header nga wala nadala sa burger menu */}
        <div className="flex">
          <div> search bar </div>
          <div> theme button </div>
          <div> profile </div>
        </div>
      </div>

      {/* amo ni ang burger menu. wala ko gn butang sa header kay ga adjust ang height ka header kng magpakita ni */}
      <ul
        className={`fixed left-0 top-8 z-[9] bg-zinc-400 ${showNav ? "navigationMenu-shown block" : "hidden"}`}
      >
        <li> Home </li>
        <li> Categories </li>
        <li> Admin </li>
        <li> About </li>
      </ul>
    </div>
  );
};

export default MobileHeader;
