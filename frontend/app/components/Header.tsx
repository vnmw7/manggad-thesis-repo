import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import SearchIcon from "./icons/search.svg";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex w-full h-fit relative">
            {/* left side */}
            <div className="">
                <div className="flex items-center"> {/* container sng search icon kag search bar */}
                    <div className="grid place-items-center aspect-square w-auto"> {/* container sng svg icon */}
                        <SearchIcon style={{ fill: '#000', stroke: '#000' }} /> {/* sa svg file ka gd adjust sang width kag height */}
                    </div>

                    {/* search bar */}
                    <input 
                        type="text" 
                        placeholder="Search Related Studies" 
                        className="pl-12 h-10 ml-14 text-base border border-[#262832] rounded-lg bg-gray-100 transition-colors placeholder:text-[#262832] focus:outline-none" 
                        style={{ marginTop: '10px', width: '970px', color: '#262832', borderColor: '#262832' }} 
                    />
                </div>
            </div>

            {/* right side */}
            <div className="flex flex-grow">
                <ThemeSwitch />
                <div className='aspect-square w-16 rounded-full hover:cursor-pointer' style={{ backgroundImage: 'url("profile_placeholder.png")', backgroundSize: "cover", backgroundPosition: "cover cover"}} onClick={() => router.push("/auth")}> </div>
            </div>
        </div>
    );
}

export default Header;
