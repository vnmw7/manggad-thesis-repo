import "../styles/globals.css";
import ThemedElement from "../components/theme/ThemedElement";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemedElement> {children} </ThemedElement>
			</body>
		</html>
	);
}
