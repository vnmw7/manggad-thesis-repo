import { useRouter } from "next/navigation";

const Navigation = () => {
    const router = useRouter();

    return (
        <div className="bg-[#a5a29d] flex flex-col items-center">
            <div className="mb-4"> {/* Margin for spacing */}
                <img src="/path/to/logo.png" alt="Logo" />
            </div>
            <ul className="flex space-x-4"> {/* Adjust spacing as needed */}
                <li>Home</li>
                <li>Categories</li>
                <li>Updates</li>
            </ul>
        </div>  
    );
}

export default Navigation;