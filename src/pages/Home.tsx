import Image from "next/image";
import Link from "next/link";
import { LuGraduationCap, LuShirt } from "react-icons/lu";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8F6]">
      {/* Logo */}
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <Image
          src="/logo.webp"
          alt="Rishihood University"
          width={140}
          height={40}
          priority
          className="h-auto w-[120px] sm:w-[140px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full">
          <h1 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gray-800 sm:mb-12 sm:text-4xl">
            Hey there! Who&apos;s logging in?
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Student Card */}
            <Link
              href="#" // TODO: set to /student
              aria-label="Login as Student"
              className="group block rounded-2xl bg-white p-6 shadow-[0_6px_20px_rgba(16,24,40,0.06)] ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,24,40,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#990A2C]/40 sm:p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-50 text-[#990A2C] ring-1 ring-rose-100 sm:h-16 sm:w-16">
                  <LuGraduationCap className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <span className="mt-4 text-sm font-semibold text-[#1f2937] sm:text-base">Student</span>
              </div>
            </Link>

            {/* Washer Man Card */}
            <Link
              href="#" // TODO: set to /washer
              aria-label="Login as Washer Man"
              className="group block rounded-2xl bg-white p-6 shadow-[0_6px_20px_rgba(16,24,40,0.06)] ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,24,40,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#990A2C]/40 sm:p-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-50 text-[#990A2C] ring-1 ring-rose-100 sm:h-16 sm:w-16">
                  <LuShirt className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <span className="mt-4 text-sm font-semibold text-[#1f2937] sm:text-base">Washer Man</span>
              </div>
            </Link>
          </div>

        </section>
      </div>
    </main>
  );
}
