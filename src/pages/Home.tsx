import Image from "next/image";
import Link from "next/link";
import { LuGraduationCap, LuShirt } from "react-icons/lu";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8F6]">
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

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <section className="text-center w-full max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 sm:mb-12">
            Hey there! Who’s logging in?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
            {/* Student Card */}
            <Link
              href="/student/login"
              className="group flex flex-col items-center justify-center w-60 h-40 rounded-2xl bg-gradient-to-b from-[#d9e9ff] to-[#bcd8ff] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              <LuGraduationCap className="text-[#003a8c] h-10 w-10 mb-3" />
              <span className="text-[#003a8c] text-base sm:text-lg font-semibold">
                Student
              </span>
            </Link>

            {/* Washer Man Card */}
            <Link
              href="#"
              className="group flex flex-col items-center justify-center w-60 h-40 rounded-2xl bg-gradient-to-b from-[#fff5ba] to-[#ffec80] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              <LuShirt className="text-[#804000] h-10 w-10 mb-3" />
              <span className="text-[#804000] text-base sm:text-lg font-semibold">
                Washer Man
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
