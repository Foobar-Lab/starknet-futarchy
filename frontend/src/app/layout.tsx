import type { Metadata } from "next";
// import { satoshi } from "@/app/fonts/satoshi";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import HeaderSection from "@/app/components/header-section";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Starknet Futarchy.",
	description: "Futarchy as a service platform on Starknet.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={spaceGrotesk.className}>
				<HeaderSection />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
