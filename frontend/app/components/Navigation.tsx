import { useRouter } from "next/navigation";

const Navigation = () => {
    const router = useRouter();

    return (
        <div className="bg-blue-50 border">
            <div> logo here </div>
            <ul>
                <li> Home </li>
                <li> Categories </li>
                <li> Updates </li>
            </ul>
        </div>  
    )
}

export default Navigation