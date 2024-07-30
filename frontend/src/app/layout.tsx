import type { Metadata } from "next";
import { satoshi } from "@/app/fonts/satoshi";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Providers } from "@/app/providers";
import { Header } from "@/app/components/Header";

const inter = Inter({ subsets: ['latin'] })

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
			<body className={satoshi.className}>
				<Header/>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
