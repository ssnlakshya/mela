"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Home, Utensils, Gamepad2, Gem } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Food", href: "/food", icon: Utensils },
    { name: "Accessories", href: "/accessories", icon: Gem },
    { name: "Games", href: "/games", icon: Gamepad2 },
];

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Hide header on login page properly if needed, but usually good to show everywhere
    if (pathname === '/login') return null;

    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8">
                        <Image src="/lakshya.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
                        MELA
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                            relative flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors
                            ${isActive ? "text-orange-600" : "text-neutral-600 hover:text-orange-500"}
                        `}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                                    />
                                )}
                            </Link>
                        )
                    })}
                    <Link
                        href="/login"
                        className="ml-4 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
                    >
                        Login
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Drawer */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { height: "auto", opacity: 1, display: "block" },
                    closed: { height: 0, opacity: 0, transitionEnd: { display: "none" } }
                }}
                className="md:hidden overflow-hidden bg-white border-b border-neutral-100"
            >
                <div className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                            ${isActive ? "bg-orange-50 text-orange-600" : "text-neutral-600 hover:bg-neutral-50"}
                        `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                    <div className="h-px bg-neutral-100 my-2" />
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center w-full px-4 py-3 bg-neutral-900 text-white rounded-lg font-medium"
                    >
                        Login as Stall Owner
                    </Link>
                </div>
            </motion.div>
        </header>
    );
}
