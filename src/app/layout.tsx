import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Degen Signatures",
  description: "Sign your name in the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900`}>
        <Providers>
          <Navbar />
          <main className="container mx-auto pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}