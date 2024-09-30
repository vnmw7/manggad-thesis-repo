import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import SearchIcon from "./icons/search.svg";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex">
            {}
            <div className="flex items-center w-7/12">
                <div className="relative">
                    <SearchIcon 
                        style={{
                            fill: '#000', 
                            stroke: '#000', 
                            width: '26px',  
                            height: '26px', 
                            position: 'absolute', 
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                        }} 
                    />
                    <input 
    type="text" 
    placeholder="Search Related Studies" 
    className="pl-12 h-10 ml-12 text-base border border-gray-300 rounded-lg bg-gray-100 focus:border-[#262832] focus:outline-none transition-colors" 
    style={{ width: '990px' }} 
/>

                </div>
            </div>
            {}
            <div className="flex grow items-center">
                <ThemeSwitch />
                <button onClick={() => router.push("/auth")}> Admin </button>
            </div>
        </div>
    );
}

export default Header;
