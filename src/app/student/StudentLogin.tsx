"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

export default function StudentLogin(_props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setTimeout(() => setLoading(false), 1000);
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
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-sm">
          {/* Email Input */}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white 
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-gray-400 rounded-md bg-white w-full
                         text-gray-900 placeholder:text-gray-600 pr-10
                         focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-0 h-full px-3 py-2 text-gray-600 hover:text-[#a30c34] hover:bg-transparent"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 
                       text-white font-medium py-3 rounded-lg transition text-lg w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Logging in...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <p className="mt-6 text-gray-700 text-base">
          Don't have an account?{" "}
          <Link
            href="/student/signup1"
            className="text-[#c45c29] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}