import "./globals.css";
import ThemedElement from "./_components/theme/ThemedElement";
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<SessionProvider>
					<ThemedElement> {children} </ThemedElement>
				</SessionProvider>
			</body>
		</html>
	);
}
