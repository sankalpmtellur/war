"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type FormData = {
  name: string;
  enrollment_no: string;
  bag_no: string;
  phone_no: string;
  residency_no: string;
  password: string;
};

export default function StudentSignup2() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params?.get("email") ?? "";

  const [formData, setFormData] = useState<FormData>({
    name: "",
    enrollment_no: "",
    bag_no: "",
    phone_no: "",
    residency_no: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidBagNo = (bagNo: string) => /^[BG]-\d+$/.test(bagNo.toUpperCase());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "bag_no") {
      const formatted = value.toUpperCase();
      if (formatted === "" || /^[BG](-\d*)?$/.test(formatted)) {
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.enrollment_no ||
      !formData.bag_no ||
      !formData.phone_no ||
      !formData.residency_no ||
      !formData.password
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidBagNo(formData.bag_no)) {
      setError("Invalid bag number format. Use B- or G- followed by numbers");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/student/login");
    }, 700);
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
          Complete Your Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-sm"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Enrollment Number */}
          <input
            type="text"
            name="enrollment_no"
            placeholder="Enrollment Number"
            value={formData.enrollment_no}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Bag Number */}
          <input
            type="text"
            name="bag_no"
            placeholder="Bag Number (e.g., B-558)"
            value={formData.bag_no}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Residency Number */}
          <input
            type="text"
            name="residency_no"
            placeholder="Residency Number"
            value={formData.residency_no}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-400 rounded-md bg-white
                       text-gray-900 placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg transition"
            required
          />

          {/* Email (from step 1) */}
          {email && (
            <p className="text-sm text-gray-600 -mt-2">
              Signing up with:{" "}
              <span className="font-medium">{email}</span>
            </p>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 
                       text-white font-medium py-3 rounded-lg transition text-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-6 text-gray-700 text-base">
          Already have an account?{" "}
          <a
            href="/student/login"
            className="text-[#c45c29] font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </main>
    </div>
  );
}