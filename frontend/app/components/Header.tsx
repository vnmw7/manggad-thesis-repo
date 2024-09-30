import { useRouter } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex">
            <div className="flex">
                <input type="text" placeholder="Search Related Studies" />
                <button >Search </button>
            </div>
            <ThemeSwitch />
            <button onClick={() => router.push("/auth")}> Admin </button>
        </div>
    )
}

export default Header
