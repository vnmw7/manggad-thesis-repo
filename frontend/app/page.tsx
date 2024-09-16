"use client"

import { useRouter } from "next/navigation";
import ThemeSwitch from "./components/ThemeSwitch";

export default function Home() {
  const router = useRouter();

	return (
		<div>
      {/* header and navigations */}
      <header>
          <div> logo here </div>
          <ul>
              <li> Home </li>
              <li> Categories </li>
              <li> Updates </li>
          </ul>
          <button onClick={() => router.push("/auth")}> Admin </button>
      </header>

      <h1> This is the Home Page </h1>
      <div>
          <input type="text" placeholder="Search Related Studies" />
          <button >Search </button>
      </div>

      {/* footer */}
      <footer>
          <ThemeSwitch />
      </footer>
    </div>
	); 
}
