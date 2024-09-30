import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import SearchIcon from "./icons/search.svg"

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex">
            {/* left side sng header: search bar */}
            <div className="flex w-7/12 ml-72 mt-1">
                <SearchIcon style={{ fill: '#000', stroke: '#000', width: 50, height: 50 }} />
                <input type="text" placeholder="Search Related Studies" />
            </div>

            {/* right side sng header: theme switch and admin */}
            <div className="flex grow">
                <ThemeSwitch />
                <button className="ml-50" onClick={() => router.push("/auth")}> Admin </button>
            </div>
        </div>
    )
}

export default Header
