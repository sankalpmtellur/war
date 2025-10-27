"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function WashermanLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock successful login for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', 'washerman');
      setLoading(false);
      
      // Navigate to dashboard
      router.push("/washerman/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3]">
      {/* Header */}
      <header className="p-3.5 relative z-10">
        <Image
          src="/logo.webp"
          alt="Rishihood University Logo"
          width={160}
          height={45}
          priority
          className="h-auto w-28 sm:w-32 md:w-36 object-contain drop-shadow-lg"
        />
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">
          Washerman Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-4 py-3.5 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a30c34] focus:border-transparent placeholder-gray-500 text-base"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3.5 text-gray-800 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a30c34] focus:border-transparent placeholder-gray-500 text-base pr-12"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
              disabled={loading}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#a30c34] hover:bg-[#8a0a2c]"
            } transition-colors`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}