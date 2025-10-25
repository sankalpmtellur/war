"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function StudentLogin(_props: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Frontend-only placeholder: show loading briefly
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
    }, 800);
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
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-8">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
            required
          />
          <input
            type="password"
            className="px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition text-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Logging in...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <p className="mt-6 text-gray-700 text-base">
          Don&apos;t have an account?{" "}
          <Link href="/student/signup1" className="text-[#c45c29] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}

