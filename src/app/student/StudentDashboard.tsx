"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function StudentDashboard() {
  const [showOrders, setShowOrders] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [customCount, setCustomCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleNumberClick = (num: number) => {
    setSelectedCount(num);
    setCustomCount(num.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = selectedCount || Number(customCount);
    if (!count || count <= 0) {
      setError("Please enter a valid number of clothes.");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSelectedCount(null);
      setCustomCount("");
      setTimeout(() => setSuccess(false), 2500);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3] relative">
      {/* Navbar */}
      <header className="bg-white shadow-sm flex items-center justify-between px-6 py-3 fixed w-full top-0 z-20">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Rishihood University Logo"
            width={160}
            height={45}
            priority
            className="w-32 sm:w-40 object-contain"
          />
        </div>

        <div className="hidden sm:flex items-center gap-6 text-[#333] font-medium">
          <button className="hover:text-[#a30c34] transition">Incomplete</button>
          <button className="hover:text-[#a30c34] transition">Dashboard</button>
          <button className="hover:text-[#a30c34] transition">Completed</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            Open
          </div>
          <div className="w-8 h-8 rounded-full bg-[#a30c34] flex items-center justify-center text-white font-semibold">
            R
          </div>
        </div>
      </header>

      {/* View Orders Button */}
      <button
        onClick={() => setShowOrders(true)}
        className="hidden sm:block fixed right-8 top-28 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-medium text-sm z-30 transition"
      >
        View Orders
      </button>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 px-5 py-32">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222] mb-6 text-center">
            Add Clothes for Laundry
          </h1>

          {/* Error */}
          {error && (
            <div className="mb-5 w-full bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-center text-sm font-medium">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 w-full bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 text-center text-sm font-medium">
              ✓ Successfully submitted!
            </div>
          )}

          {/* Input */}
          <input
            type="number"
            min="1"
            placeholder="Enter count"
            value={customCount}
            onChange={(e) => {
              setCustomCount(e.target.value);
              setSelectedCount(null);
            }}
            className="w-64 sm:w-72 px-5 py-3 border border-gray-300 rounded-md text-center text-lg placeholder-gray-400 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#a30c34] transition mb-6"
          />

          {/* Number Buttons */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNumberClick(i + 1)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg border text-lg font-semibold shadow-sm transition ${
                  selectedCount === i + 1
                    ? "bg-[#a30c34] text-white border-[#a30c34]"
                    : "bg-gray-100 hover:bg-[#f9dcdc] border-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#a30c34] hover:bg-[#8b092d] text-white text-lg font-medium px-8 py-3 rounded-lg shadow-md transition w-full sm:w-auto disabled:bg-gray-400 flex items-center justify-center"
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
        </div>
      </main>

      {/* Orders Modal */}
      {showOrders && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowOrders(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Your Orders
            </h3>

            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { label: "Total", color: "blue", count: 12 },
                { label: "Pending", color: "yellow", count: 2 },
                { label: "In Progress", color: "orange", count: 3 },
                { label: "Completed", color: "green", count: 7 },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-4 rounded-lg bg-${item.color}-50 border border-${item.color}-200`}
                >
                  <p
                    className={`text-2xl font-bold text-${item.color}-600 mb-1`}
                  >
                    {item.count}
                  </p>
                  <p className={`text-sm text-${item.color}-800`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}