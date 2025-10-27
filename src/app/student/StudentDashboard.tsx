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

  const handleNumberClick = (n: number) => {
    setSelectedCount(n);
    setCustomCount(n.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = selectedCount || Number(customCount);
    if (!count || count <= 0) {
      setError("Please enter a valid number of clothes");
      return;
    }
    setError("");
    setLoading(true);

    // simulate submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSelectedCount(null);
      setCustomCount("");
      setTimeout(() => setSuccess(false), 2500);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3]">
      {/* Header / Navbar placeholder */}
      <header className="p-3.5 relative z-10 flex justify-between items-center shadow-sm bg-white">
        <Image
          src="/logo.webp"
          alt="Rishihood University Logo"
          width={160}
          height={45}
          priority
          className="w-28 sm:w-32 md:w-36 object-contain h-auto"
        />
        <button
          onClick={() => setShowOrders(true)}
          className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-md"
        >
          View Orders
        </button>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#333] mb-6 text-center">
            Add Clothes for Laundry
          </h1>

          {/* Messages */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3 w-full mb-4 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-md p-3 w-full mb-4 text-center">
              ✓ Clothes submitted successfully!
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
            className="mb-5 w-60 px-4 py-3 border border-gray-300 rounded-md bg-[#fffdfc] focus:outline-none focus:ring-2 focus:ring-[#a30c34] text-lg text-center"
          />

          {/* Number Buttons */}
          <div className="grid grid-cols-5 gap-3 mb-5">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNumberClick(i + 1)}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-md border text-base sm:text-lg font-semibold shadow-sm transition-colors duration-200 ${selectedCount === i + 1
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
            className="mt-2 bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition text-lg flex items-center justify-center w-full sm:w-auto"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowOrders(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-center mb-6">
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
                  className={`bg-${item.color}-50 p-4 rounded-lg`}
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