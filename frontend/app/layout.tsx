import "./globals.css";
import ThemedElement from "./_components/theme/ThemedElement";

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
