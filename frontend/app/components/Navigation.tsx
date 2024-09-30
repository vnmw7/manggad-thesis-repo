import { useRouter } from "next/navigation";

const Navigation = () => {
    const router = useRouter();

    return (
        <header>
            <div> logo here </div>
            <ul>
                <li> Home </li>
                <li> Categories </li>
                <li> Updates </li>
            </ul>
        </header>  
    )
}

export default Navigation