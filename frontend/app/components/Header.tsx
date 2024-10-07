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
                            left: '20px',
                            top: '57%',
                            transform: 'translateY(-50%)'
                        }} 
                    />
                    <input 
                        type="text" 
                        placeholder="Search Related Studies" 
                        className="pl-12 h-10 ml-14 text-base border border-[#262832] rounded-lg bg-gray-100 transition-colors placeholder:text-[#262832] focus:outline-none" 
                        style={{ marginTop: '10px', width: '970px', color: '#262832', borderColor: '#262832' }} 
                    />
                </div>
            </div>
            <div className="flex grow items-center">
                <div className="w-44"><ThemeSwitch /></div>
                <div className="w-44"><button className='-ml-6 rounded' style={{ marginTop: '10px' }} onClick={() => router.push("/auth")}> Admin </button></div>
            </div>
        </div>
    );
}

export default Header;
