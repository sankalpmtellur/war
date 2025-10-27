"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  User,
  UserCheck,
  LogOut,
  FileText,
  Menu,
  X,
  Star,
} from "lucide-react";

function getServiceStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekday = day >= 1 && day <= 6; // Monday–Saturday
  const afterStart = hour > 8 || (hour === 8 && minute >= 30);
  const beforeEnd = hour < 18;
  const isOpen = isWeekday && afterStart && beforeEnd;

  return {
    isOpen,
    status: isOpen ? "Open" : "Closed",
    dotColor: isOpen ? "bg-green-500" : "bg-red-500",
    textColor: isOpen ? "text-green-600" : "text-red-600",
  };
}

export default function StudentNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const status = getServiceStatus();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest(".mobile-menu") &&
        !(e.target as HTMLElement).closest(".mobile-menu-button")
      ) {
        setMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/student/incomplete", label: "Incomplete" },
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/completed", label: "Completed" },
  ];

  const handleRating = (value: number) => {
    setRating(value);
    setHasRated(true);
    console.log(`Rated ${value} stars`);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#faf6f3] shadow-md px-4 sm:px-6 py-3 flex items-center justify-between font-medium z-50">
        {/* Left: Logo */}
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Rishihood Logo"
            width={120}
            height={40}
            className="object-contain w-24 sm:w-28 md:w-32"
            priority
          />
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6 text-gray-700 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#a30c34] transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Service Hours + Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4 relative flex-shrink-0">
          {/* 🕐 Service Hours */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm relative group">
            <Clock className="w-4 h-4 text-gray-600" />
            <div className={`w-2 h-2 rounded-full ${status.dotColor}`} />
            <span className={`text-xs font-medium ${status.textColor}`}>
              {status.status}
            </span>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              <div className="text-center">
                <p className="font-semibold mb-1">Laundry Hours</p>
                <p>Monday - Saturday</p>
                <p>8:30 AM - 6:00 PM</p>
                <p className="text-gray-300 text-xs mt-1">Closed on Sundays</p>
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800" />
            </div>
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#a30c34] to-[#d63384] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 text-sm font-medium">Ritesh</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800 text-sm">Ritesh Kumar</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/student/profile"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={() =>
                      window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                    }
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200 w-full text-left"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Feedback</span>
                  </button>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    onClick={() => router.push("/student/login")}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors duration-200 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <button
            className="lg:hidden mobile-menu-button p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenu(false)}
          />
          <div className="mobile-menu absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Rishihood University</h3>
                <p className="text-xs text-gray-500">Laundry Service</p>
              </div>
              <button
                onClick={() => setMobileMenu(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-[#a30c34] to-[#d63384] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ritesh Kumar</p>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <div className={`w-3 h-3 rounded-full ${status.dotColor}`} />
              <span className={`text-sm font-medium ${status.textColor}`}>
                Service: {status.status}
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                  onClick={() => setMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")}
                className="text-left px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm"
              >
                Feedback
              </button>
            </div>

            {/* ⭐ Rate Us */}
            <div className="mt-auto border-t border-gray-100 pt-4">
              <p className="text-base font-medium text-gray-700 mb-2">Rate Us</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`p-1 ${star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400`}
                  >
                    <Star
                      className="w-6 h-6"
                      fill={star <= rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              {hasRated && (
                <p className="text-xs text-green-600 mt-2">
                  Thank you for your rating!
                </p>
              )}
            </div>

            {/* Sign Out */}
            <button
              onClick={() => {
                setMobileMenu(false);
                router.push("/student/login");
              }}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}