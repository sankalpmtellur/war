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
import { motion, AnimatePresence } from "framer-motion";

function getServiceStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekday = day >= 1 && day <= 6;
  const afterStart = hour > 8 || (hour === 8 && minute >= 30);
  const beforeEnd = hour < 18;
  const isOpen = isWeekday && afterStart && beforeEnd;

  return {
    isOpen,
    label: isOpen ? "Open" : "Closed",
    dotColor: isOpen ? "bg-green-500" : "bg-red-500",
    textColor: isOpen ? "text-green-600" : "text-red-600",
  };
}

export default function StudentNavbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const status = getServiceStatus();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/student/Incomplete", label: "Incomplete" },
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/Completed", label: "Completed" },
  ];

  const handleRating = (val: number) => {
    setRating(val);
    setHasRated(true);
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
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

        {/* Center: Links (Desktop) */}
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
          <button
            onClick={() => window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")}
            className="hover:text-[#a30c34] transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
          >
            Feedback
          </button>
        </div>

        {/* Right: Status & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4 relative flex-shrink-0">
          {/* Service Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm relative group">
            <Clock className="w-4 h-4 text-gray-600" />
            <div className={`w-2 h-2 rounded-full ${status.dotColor}`} />
            <span className={`text-xs font-medium ${status.textColor}`}>
              {status.label}
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              <p className="font-semibold mb-1">Laundry Hours</p>
              <p>Mon - Sat: 8:30 AM - 6:00 PM</p>
              <p className="text-gray-300 text-xs mt-1">Closed on Sundays</p>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#a30c34] to-[#d63384] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 text-sm font-medium">Ritesh</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm">Ritesh Kumar</p>
                    <p className="text-xs text-gray-500">Student</p>
                    <p className="text-xs text-gray-400 mt-1">2401010384</p>
                  </div>

                  <Link
                    href="/student/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={() =>
                      window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                    }
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 w-full text-left"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Feedback</span>
                  </button>

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    onClick={() => router.push("/student/login")}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden mobile-menu-button p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* ===== SIDEBAR (Mobile) ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl flex flex-col p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Rishihood University
                  </h3>
                  <p className="text-xs text-gray-500">Laundry Service</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* User */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-[#a30c34] to-[#d63384] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Ritesh Kumar</p>
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="text-xs text-gray-400">2401010384</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className={`w-3 h-3 rounded-full ${status.dotColor}`} />
                <span className={`text-sm font-medium ${status.textColor}`}>
                  Service: {status.label}
                </span>
              </div>

              {/* Menu */}
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() =>
                    window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                  }
                  className="text-left px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Feedback
                </button>
              </div>

              {/* Rating */}
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
                  setSidebarOpen(false);
                  router.push("/student/login");
                }}
                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}