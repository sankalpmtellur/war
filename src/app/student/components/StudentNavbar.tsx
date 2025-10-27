"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuClock,
  LuUser,
  LuLogOut,
  LuMenu,
  LuX,
  LuFileText,
} from "react-icons/lu";

function getServiceStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun ... 6 Sat
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekdayOrSat = day >= 1 && day <= 6; // Mon-Sat
  const afterStart = hour > 8 || (hour === 8 && minute >= 30); // 8:30
  const beforeEnd = hour < 18; // < 18:00
  const isOpen = isWeekdayOrSat && afterStart && beforeEnd;

  return {
    isOpen,
    label: isOpen ? "Open" : "Closed",
    dotClass: isOpen ? "bg-green-500" : "bg-red-500",
    textClass: isOpen ? "text-green-700" : "text-red-700",
  } as const;
}

export default function StudentNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src="/logo.webp"
                alt="Rishihood University Logo"
                width={160}
                height={45}
                priority
                className="w-28 sm:w-32 md:w-36 h-auto object-contain"
              />
            </Link>

            {/* Center tabs (desktop) */}
            <div className="hidden lg:flex items-center gap-1 text-sm">
              <Link href="/student/incomplete" className="px-3 py-2 rounded-md text-gray-700 hover:text-[#a30c34] hover:bg-gray-100 transition">Incomplete</Link>
              <Link href="/student/dashboard" className="px-3 py-2 rounded-md text-gray-700 hover:text-[#a30c34] hover:bg-gray-100 transition">Dashboard</Link>
              <Link href="/student/completed" className="px-3 py-2 rounded-md text-gray-700 hover:text-[#a30c34] hover:bg-gray-100 transition">Completed</Link>
            </div>

            {/* Right: status + profile + mobile menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs shadow-sm">
                <LuClock className="h-4 w-4 text-gray-600" />
                <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                <span className={`${status.textClass} font-medium`}>{status.label}</span>
              </div>

              {/* Profile dropdown (desktop) */}
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="group flex items-center gap-2 rounded-full p-1.5 hover:bg-gray-100"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#a30c34] text-white">
                    <LuUser className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-gray-700 group-hover:text-[#a30c34]">Ritesh</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a30c34] text-white">
                          <LuUser className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Ritesh Kumar</p>
                          <p className="text-xs text-gray-500">Student</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1 text-sm">
                      <Link href="/student/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50">
                        <LuUser className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={() => window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
                      >
                        <LuFileText className="h-4 w-4" />
                        <span>Feedback</span>
                      </button>
                      <div className="my-1 border-t border-gray-100" />
                      <button className="flex w-full items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50">
                        <LuLogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden rounded-md p-2 hover:bg-gray-100"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <LuX className="h-5 w-5 text-gray-700" /> : <LuMenu className="h-5 w-5 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <p className="text-sm text-gray-500">Rishihood University</p>
                <p className="font-semibold text-gray-800">Laundry Service</p>
              </div>
              <button className="rounded-full p-2 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                <LuX className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <div className="border-b border-gray-200 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#a30c34] text-white">
                  <LuUser className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-gray-800">Ritesh Kumar</p>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 p-5 text-sm">
              <div className="mb-4 flex items-center gap-2">
                <LuClock className="h-5 w-5 text-gray-700" />
                <span className={`h-3 w-3 rounded-full ${status.dotClass}`} />
                <span className={`${status.textClass} font-medium`}>Service: {status.label}</span>
              </div>
              <div className="space-y-1">
                <Link href="/student/orders" className="block rounded-md px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  View Orders
                </Link>
                <Link href="/student/profile" className="block rounded-md px-3 py-2 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  My Profile
                </Link>
                <button
                  onClick={() => window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")}
                  className="block w-full rounded-md px-3 py-2 text-left hover:bg-gray-50"
                >
                  Feedback
                </button>
              </div>
            </div>

            <div className="p-5">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700">
                <LuLogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
