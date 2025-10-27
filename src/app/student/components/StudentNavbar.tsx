"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Clock, LogOut, UserCheck, FileText, Menu, X } from "lucide-react";

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
    status: isOpen ? "Open" : "Closed",
    color: isOpen ? "text-green-600" : "text-red-600",
    dot: isOpen ? "bg-green-500" : "bg-red-500",
  };
}

export default function StudentNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerEnter, setDrawerEnter] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "";
  const status = getServiceStatus();

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      const id = setTimeout(() => setDrawerEnter(true), 10);
      return () => clearTimeout(id);
    } else {
      setDrawerEnter(false);
    }
  }, [mobileMenu]);

  const navLinks = [
    { href: "/student/incomplete", label: "Incomplete" },
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/completed", label: "Completed" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Rishihood University"
              width={160}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Center: Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    active
                      ? "bg-[#a30c34] text-white shadow-sm"
                      : "text-gray-700 hover:text-[#a30c34] hover:bg-[#f9e9eb]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right: Status + Profile */}
          <div className="flex items-center gap-4">
            {/* Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full bg-white shadow-sm text-xs relative group">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className={`w-2 h-2 rounded-full ${status.dot}`} />
              <span className={`font-semibold ${status.color}`}>
                {status.status}
              </span>

              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-800 text-white px-4 py-2 text-xs rounded-md opacity-0 group-hover:opacity-100 transition duration-200 shadow-md whitespace-nowrap">
                <p className="font-semibold">Laundry Hours</p>
                <p>Mon - Sat • 8:30 AM - 6:00 PM</p>
                <p className="text-gray-300">Closed on Sundays</p>
              </div>
            </div>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1.5 hover:bg-gray-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#a30c34] to-[#d63384] text-white flex items-center justify-center font-semibold">
                  R
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden transition-opacity duration-200 opacity-100 z-50">
                  <div className="p-4 border-b border-gray-100 bg-[#faf6f3]">
                    <p className="font-semibold text-gray-800 text-sm">
                      Ritesh Kumar
                    </p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/student/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCheck className="w-4 h-4" /> My Profile
                    </Link>
                    <button
                      onClick={() =>
                        window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                      }
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      <FileText className="w-4 h-4" /> Feedback
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => router.push("/student/login")}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex justify-end"
          onClick={() => setMobileMenu(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white w-72 h-full shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${
              drawerEnter ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">Rishihood University</p>
                <p className="font-semibold text-gray-800">Laundry Service</p>
              </div>
              <button onClick={() => setMobileMenu(false)}>
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#a30c34] to-[#d63384] text-white flex items-center justify-center font-semibold">
                R
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ritesh Kumar</p>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    pathname === href || pathname.startsWith(`${href}/`)
                      ? "bg-[#a30c34] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenu(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-3 mt-auto">
              <button
                onClick={() =>
                  window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                }
                className="flex items-center gap-3 text-sm hover:bg-gray-50 px-4 py-2 rounded-md"
              >
                <FileText className="w-4 h-4" /> Feedback
              </button>
              <button
                onClick={() => router.push("/student/login")}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-red-600 hover:bg-red-700 text-white py-3 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}