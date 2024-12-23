import "./globals.css";
import ThemedElement from "./_components/theme/ThemedElement";
import SessionProviderWrapper from "./SessionProviderWrapper";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<SessionProviderWrapper>
					<ThemedElement> {children} </ThemedElement>
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
