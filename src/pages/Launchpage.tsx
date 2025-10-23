import Image from "next/image";

export default function Launchpage() {
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
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <section className="w-full max-w-xl">
          <div className="rounded-2xl bg-white/90 p-8 shadow-[0_20px_60px_rgba(16,24,40,0.08)] ring-1 ring-gray-100 backdrop-blur">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-[#990A2C] sm:text-5xl">
              Welcome!
            </h1>
            <p className="mt-3 text-center text-base font-medium text-gray-700">
              Rishihood University Laundry Service
            </p>
            <div className="mt-7 flex items-center justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-[#990A2C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#7e0824] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#990A2C]/50"
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
