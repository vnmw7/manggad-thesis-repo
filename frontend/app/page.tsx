"use client" // sa client ma render ang amo ni nga code

export default function Page() {
    return (
        <div>
             {/* header and navigations */}
            <header>
                <div> logo here </div>
                <ul>
                    <li> Home </li>
                    <li> Categories </li>
                    <li> Updates </li>
                </ul>
                <button> Admin </button>
            </header>

            <h1> This is the Home Page </h1>
            <div>
                <input type="text" placeholder="Search Related Studies" />
                <button >Search </button>
            </div>

            {/* footer */}
            <footer>
                <button> light/dark mode </button>
            </footer>
        </div>
    )
}