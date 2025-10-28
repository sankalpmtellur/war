"use client";

import Image from "next/image";
import { Clock, X, User, LogOut, BarChart2, Menu, Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function WashermanNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' as default
  const [serviceStatus, setServiceStatus] = useState({
    status: "Open",
    isOpen: true,
    color: "text-green-600"
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
    { code: "mr", label: "मराठी" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "kn", label: "ಕನ್ನಡ" },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
    // In a real app, this would clear auth state and redirect
    window.location.href = '/washerman/login';
  };

  const handleStatusToggle = (status: 'Open' | 'Closed') => {
    setServiceStatus({
      status,
      isOpen: status === 'Open',
      color: status === 'Open' ? 'text-green-600' : 'text-red-600'
    });
    console.log(`Service status set to: ${status}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#faf6f3] shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between font-medium z-50">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Rishihood Logo"
            width={140}
            height={40}
            className="w-24 sm:w-32 object-contain"
          />
        </div>

        {/* Right: Service Status & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">EN</span>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform ${isLangOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm text-gray-800 transition-colors hover:bg-gray-100`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{lang.label}</span>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-full bg-white border border-gray-200 shadow">
            <Clock className="w-4 h-4 text-gray-600 mr-1" />
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => handleStatusToggle('Open')}
                className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ${serviceStatus.status === 'Open' ? 'bg-green-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
              >
                Open
              </button>
              <button
                onClick={() => handleStatusToggle('Closed')}
                className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ml-1 ${serviceStatus.status === 'Closed' ? 'bg-red-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
              >
                Closed
              </button>
            </div>
            <span className={`w-2 h-2 rounded-full ${serviceStatus.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </div>

          {/* Profile Dropdown - Desktop */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Washerman Menu"
            >
              <BarChart2 className="w-5 h-5 text-[#a30c34]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden">
                <div className="py-1">
                  <Link
                    href="/washerman/stats"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span>Stats</span>
                  </Link>
                  <Link
                    href="/washerman/student-lookup"
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Student Lookup</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors duration-200 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="mobile-menu absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Rishihood University</h3>
                <p className="text-xs text-gray-500">Laundry Service</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Service Status Toggle */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <div className="flex items-center bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => handleStatusToggle('Open')}
                    className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ${serviceStatus.status === 'Open' ? 'bg-green-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleStatusToggle('Closed')}
                    className={`px-4 py-1 rounded-full font-semibold text-xs transition-colors duration-200 focus:outline-none ml-1 ${serviceStatus.status === 'Closed' ? 'bg-red-500 text-white shadow' : 'bg-transparent text-gray-700'}`}
                  >
                    Closed
                  </button>
                </div>
                <span className={`w-2 h-2 rounded-full ${serviceStatus.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="py-4 flex-1">
              <Link
                href="/washerman/stats"
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                <span className="text-base font-medium">Stats</span>
              </Link>
              <Link
                href="/washerman/student-lookup"
                className="flex items-center px-6 py-4 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                <span className="text-base font-medium">Student Lookup</span>
              </Link>
            </div>

            {/* Sign Out Button */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
