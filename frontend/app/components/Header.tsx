import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import SearchIcon from "./icons/search.svg";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex">
            <div className="flex items-end w-[1070px]"> {/* Changed to items-end */}
                <div className="relative">
                    <SearchIcon 
                        style={{
                            fill: '#000', 
                            stroke: '#000', 
                            width: '26px',  
                            height: '26px', 
                            position: 'absolute', 
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }} 
                    />
                    <input 
                        type="text" 
                        placeholder="Search Related Studies" 
                        className="pl-12 h-10 ml-12 text-base border border-[#262832] rounded-lg bg-gray-100 transition-colors placeholder:text-[#262832] focus:outline-none" 
                        style={{ width: '990px', color: '#262832', borderColor: '#262832' }} 
                    />
                </div>
            </div>
            <div className="flex grow items-center">
                <div className="w-44"><ThemeSwitch /></div>
                <div className="w-44"><button className='-ml-0 rounded'onClick={() => router.push("/auth")}> Admin </button></div>
            </div>
        </div>
    );
}

export default Header;
