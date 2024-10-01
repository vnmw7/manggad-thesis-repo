import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import SearchIcon from "./icons/search.svg"

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex mt-4">
            {/* left side sng header: search bar */}
            <div className="flex w-7/12 items-center">
                <SearchIcon style={{ fill: '#000', stroke: '#000', width: 30, height: 30 }} />
                <input type="text" placeholder="Search Related Studies" />
            </div>

            {/* right side sng header: theme switch and admin */}
            <div className="flex grow">
                <ThemeSwitch />
                <button onClick={() => router.push("/auth")}> Admin </button>
            </div>
        </div>
    )
}

export default Header
