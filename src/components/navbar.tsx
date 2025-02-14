'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnect } from "./connect-button";

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { title: "Home", href: "/" },
    { title: "How to Use", href: "/how-to-use" },
  ];

  return (
    <nav className="border-b border-purple-500/20 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Degen Signatures
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-purple-500/20 text-white"
                      : "text-gray-300 hover:bg-purple-500/10 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}