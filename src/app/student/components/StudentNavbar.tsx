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

// ✅ Shadcn imports
import {
  Button,
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function getServiceStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const isWeekday = day >= 1 && day <= 6;

  const morningStart = hour > 8 || (hour === 8 && minute >= 30);
  const beforeMorningEnd = hour < 10;

  const eveningStart = hour > 16 || (hour === 16 && minute >= 30);
  const beforeEveningEnd = hour < 19;

  const isOpen =
    isWeekday &&
    ((morningStart && beforeMorningEnd) ||
      (eveningStart && beforeEveningEnd));

  return {
    isOpen,
    label: isOpen ? "Open" : "Closed",
    dotColor: isOpen ? "bg-green-500" : "bg-red-500",
    textColor: isOpen ? "text-green-600" : "text-red-600",
  };
}

export default function StudentNavbar() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const status = getServiceStatus();

  const navLinks = [
    { href: "/student/incomplete", label: "Incomplete" },
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/completed", label: "Completed" },
  ];

  const handleRating = (val: number) => {
    setRating(val);
    setHasRated(true);
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    router.push("/student/login");
  };

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
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

        {/* Center Links */}
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

        {/* Right side */}
        <div className="flex items-center space-x-3 sm:space-x-4 relative">
          {/* Service Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
            <Clock className="w-4 h-4 text-gray-600" />
            <div className={`w-2 h-2 rounded-full ${status.dotColor}`} />
            <span className={`text-xs font-medium ${status.textColor}`}>
              {status.label}
            </span>
          </div>

          {/* Profile Dropdown (Shadcn) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hidden lg:flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <span className="text-gray-700 text-sm font-medium">
                  Ritesh
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-gray-200 shadow-xl rounded-xl"
            >
              <DropdownMenuLabel className="text-sm font-semibold text-gray-800">
                Ritesh Kumar
                <p className="text-xs text-gray-500">Student</p>
                <p className="text-xs text-gray-400 mt-1">2401010384</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/student/profile" className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
                }
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Feedback</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center text-red-600 space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </nav>

      {/* ===== MOBILE SIDEBAR ===== */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="right" className="w-80 bg-white p-0">
          <SheetHeader className="p-6 border-b border-gray-200">
            <SheetTitle className="text-lg font-semibold text-gray-800">
              Rishihood University
            </SheetTitle>
            <SheetDescription className="text-xs text-gray-500">
              Laundry Service
            </SheetDescription>
          </SheetHeader>

          {/* User Info */}
          <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
            <Avatar className="w-14 h-14">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-800">Ritesh Kumar</p>
              <p className="text-sm text-gray-500">Student</p>
              <p className="text-xs text-gray-400">2401010384</p>
            </div>
          </div>

          {/* Service Status */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-200">
            <Clock className="w-5 h-5 text-gray-600" />
            <div className={`w-3 h-3 rounded-full ${status.dotColor}`} />
            <span className={`text-sm font-medium ${status.textColor}`}>
              Service: {status.label}
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col py-4 border-b border-gray-200">
            <Link
              href="/student/orders"
              onClick={() => setSidebarOpen(false)}
              className="px-6 py-4 hover:bg-gray-50 text-gray-700 text-sm"
            >
              View Orders
            </Link>
            <Link
              href="/student/profile"
              onClick={() => setSidebarOpen(false)}
              className="px-6 py-4 hover:bg-gray-50 text-gray-700 text-sm"
            >
              My Profile
            </Link>
            <Button
              variant="ghost"
              className="px-6 py-4 justify-start text-gray-700 text-sm"
              onClick={() =>
                window.open("https://forms.gle/tyKosaoDJZAGUqDA9", "_blank")
              }
            >
              <FileText className="w-4 h-4 mr-2" /> Feedback
            </Button>
          </div>

          {/* Rating */}
          <div className="p-6 border-b border-gray-200">
            <p className="text-base font-medium text-gray-700 mb-2">Rate Us</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`p-1 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
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
          <div className="p-6 mt-auto">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}