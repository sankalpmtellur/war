"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

export default function StudentSignup1(_props: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidRishihoodEmail = (value: string) =>
    value.endsWith("rishihood.edu.in");

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
    setTimeout(() => {
      setLoading(false);
      const q = new URLSearchParams({ email }).toString();
      router.push(`/student/signup2?${q}`);
    }, 600);
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
          className="h-auto w-28 sm:w-32 md:w-36 object-contain drop-shadow-md"
        />
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">
          Sign Up
        </h1>

        <form
          onSubmit={handleNext}
          className="flex flex-col gap-5 w-full max-w-sm"
        >
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Enter your Rishihood email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-400 rounded-md bg-white 
                         text-gray-900 placeholder:text-gray-600
                         focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg w-full transition"
              required
            />
            <span className="text-sm text-gray-600 mt-1 block">
              Use your official Rishihood email
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
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

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-3 border border-gray-400 rounded-md bg-white w-full
                         text-gray-900 placeholder:text-gray-600 pr-10
                         focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-0 top-0 h-full px-3 py-2 text-gray-600 hover:text-[#a30c34] hover:bg-transparent"
              aria-label="Toggle password visibility"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 
                       text-white font-medium py-3 rounded-lg transition text-lg w-full"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Creating account...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <p className="mt-6 text-gray-700 text-base">
          Already have an account?{" "}
          <Link
            href="/student/login"
            className="text-[#c45c29] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}