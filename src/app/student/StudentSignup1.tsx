"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

export default function StudentSignup1(_props: Props) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const isValidRishihoodEmail = (value: string) => value.endsWith("rishihood.edu.in");

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidRishihoodEmail(email)) {
      setError("Please use your Rishihood University email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    // Frontend-only: move to step 2 with email in query
    setTimeout(() => {
      setLoading(false);
      const q = new URLSearchParams({ email }).toString();
      router.push(`/student/signup2?${q}`);
    }, 400);
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
          className="w-28 sm:w-32 md:w-36 h-auto object-contain drop-shadow-lg"
        />
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">Sign Up</h1>

        <form onSubmit={handleNext} className="flex flex-col gap-5 w-full max-w-sm">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg w-full"
              required
            />
            <span className="text-sm text-gray-600 mt-1 block">Use your Rishihood University email</span>
          </div>

          <div className="border border-gray-300 rounded-md bg-[#fffdfc] focus-within:ring-2 focus-within:ring-[#a30c34] flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="px-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <div className="border border-gray-300 rounded-md bg-[#fffdfc] focus-within:ring-2 focus-within:ring-[#a30c34] flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="px-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition text-lg"
          >
            {loading ? "Please wait..." : "Next"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3 w-full max-w-sm">{error}</div>
        )}

        <p className="mt-6 text-gray-700 text-base">
          Already have an account?{" "}
          <Link href="/student/login" className="text-[#c45c29] font-medium hover:underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}

