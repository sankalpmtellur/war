"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Launchpage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-[#FFF8F6] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
        <Image
          src="/logo.webp"
          alt="Rishihood University"
          width={160}
          height={45}
          priority
          className="h-auto w-[140px] sm:w-[160px]"
        />
      </div>

      {/* Center Card */}
      <div className="bg-white shadow-lg rounded-2xl px-10 py-8 sm:px-14 sm:py-10 text-center max-w-md w-[90%] ring-1 ring-gray-100 backdrop-blur">
        <h1 className="text-[#990A2C] text-4xl sm:text-5xl font-extrabold mb-3">
          Welcome!
        </h1>
        <p className="text-gray-700 text-base sm:text-lg font-medium">
          Rishihood University Laundry Service
        </p>

        <div className="mt-7 flex justify-center">
          <button
            onClick={() => router.push("/Home")}
            type="button"
            className="bg-[#990A2C] hover:bg-[#7e0824] text-white font-semibold text-sm sm:text-base px-8 py-3 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#990A2C]/50"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
