"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuClock, LuUser, LuLogOut, LuMenu, LuX, LuFileText } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

function getServiceStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isWeekdayOrSat = day >= 1 && day <= 6;
    const afterStart = hour > 8 || (hour === 8 && minute >= 30);
    const beforeEnd = hour < 18;
    const isOpen = isWeekdayOrSat && afterStart && beforeEnd;

    return {
        isOpen,
        label: isOpen ? "Open" : "Closed",
        dotClass: isOpen ? "bg-green-500" : "bg-red-500",
        textClass: isOpen ? "text-green-600" : "text-red-600",
    };
}

export default function StudentNavbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [drawerEnter, setDrawerEnter] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();
    const currentPath = pathname ?? "";
    const router = useRouter();
    const status = getServiceStatus();

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDropdownOpen(false);
                setMobileOpen(false);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    // Animate mobile drawer on mount
    useEffect(() => {
        if (mobileOpen) {
            // allow paint before toggling class
            const id = window.setTimeout(() => setDrawerEnter(true), 10);
            return () => window.clearTimeout(id);
        } else {
            setDrawerEnter(false);
        }
    }, [mobileOpen]);

    const navLinks = [
        { href: "/student/dashboard", label: "Dashboard" },
        { href: "/student/incomplete", label: "Incomplete" },
        { href: "/student/completed", label: "Completed" },
    ] as const;

    return (
        <>
            {/* Navbar container */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-white/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.webp"
                            alt="Rishihood University Logo"
                            width={150}
                            height={40}
                            priority
                            className="object-contain drop-shadow-md"
                        />
                    </Link>

                    {/* Center nav links (desktop) */}
                    <div className="hidden lg:flex gap-1 items-center">
                        {navLinks.map(({ href, label }) => {
                            const isActive = currentPath === href || currentPath.startsWith(`${href}/`);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive
                                            ? "bg-[#a30c34] text-white shadow-sm"
                                            : "text-gray-700 hover:text-[#a30c34] hover:bg-[#f6e7ea]"
                                        }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Status */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full text-xs shadow-sm bg-white/70 backdrop-blur-sm">
                            <LuClock className="w-4 h-4 text-gray-600" />
                            <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                            <span className={`${status.textClass} font-medium`}>
                                {status.label}
                            </span>
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative hidden lg:block" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((v) => !v)}
                                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition"
                            >
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#a30c34] text-white font-semibold">
                                    R
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-60 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">
                                            Ritesh Kumar
                                        </p>
                                        <p className="text-xs text-gray-500">Student</p>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            href="/student/profile"
                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                                        >
                                            <LuUser className="w-4 h-4" /> My Profile
                                        </Link>
                                        <button
                                            onClick={() =>
                                                window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                                            }
                                            className="flex items-center w-full gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                                        >
                                            <LuFileText className="w-4 h-4" /> Feedback
                                        </button>
                                        <div className="my-1 border-t border-gray-100" />
                                        <button
                                            onClick={() => router.push("/student/login")}
                                            className="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LuLogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? (
                                <LuX className="w-6 h-6 text-gray-700" />
                            ) : (
                                <LuMenu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex justify-end" onClick={() => setMobileOpen(false)}>
                    <div
                        className={`bg-white w-72 h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${drawerEnter ? "translate-x-0" : "translate-x-full"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Rishihood University</p>
                                <p className="font-semibold text-gray-800">Laundry Service</p>
                            </div>
                            <button onClick={() => setMobileOpen(false)}>
                                <LuX className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>

                        {/* Profile */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#a30c34] text-white font-semibold">
                                R
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Ritesh Kumar</p>
                                <p className="text-sm text-gray-500">Student</p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col gap-2 mb-4">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${currentPath === href || currentPath.startsWith(`${href}/`)
                                            ? "bg-[#a30c34] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-200 space-y-3">
                            <button
                                onClick={() =>
                                    window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                                }
                                className="flex items-center gap-3 text-sm hover:bg-gray-50 px-4 py-2 rounded-md"
                            >
                                <LuFileText className="w-4 h-4" /> Feedback
                            </button>
                            <button
                                onClick={() => router.push("/student/login")}
                                className="flex items-center justify-center gap-2 w-full rounded-lg bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-medium"
                            >
                                <LuLogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}