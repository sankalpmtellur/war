"use client";

import React, { useState } from "react";
import StudentNavbar from "@/app/student/components/StudentNavbar";
import StudentFooter from "@/app/student/components/StudentFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
      <StudentNavbar />

      {/* View Orders Button */}
      <Button
        onClick={() => setShowOrders(true)}
        className="hidden sm:block fixed right-8 top-28 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-medium text-sm z-30 transition"
      >
        View Orders
      </Button>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 px-5 pt-24 pb-16">
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
          <Input
            type="number"
            min="1"
            placeholder="Enter count"
            value={customCount}
            onChange={(e) => {
              setCustomCount(e.target.value);
              setSelectedCount(null);
            }}
            className="w-64 sm:w-72 px-5 py-3 border-gray-300 text-center text-lg placeholder-gray-400 text-gray-800 focus-visible:ring-[#a30c34] focus-visible:ring-2 transition mb-6"
          />

          {/* Number Buttons */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[...Array(10)].map((_, i) => (
              <Button
                key={i}
                type="button"
                variant={selectedCount === i + 1 ? "default" : "outline"}
                onClick={() => handleNumberClick(i + 1)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg text-lg font-semibold shadow-sm transition ${selectedCount === i + 1
                    ? "bg-[#a30c34] text-white border-[#a30c34] hover:bg-[#8b092d]"
                    : "bg-gray-100 hover:bg-[#f9dcdc] border-gray-300 text-gray-800"
                  }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#a30c34] hover:bg-[#8b092d] text-white text-lg font-medium px-8 py-3 rounded-lg shadow-md transition w-full sm:w-auto disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </main>

      {/* Orders Modal */}
      <Dialog open={showOrders} onOpenChange={setShowOrders}>
        <DialogContent 
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-[calc(100%-2rem)] border border-gray-200 [&>button]:text-gray-600 [&>button]:hover:text-gray-900 [&>button]:transition-colors"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-6 text-[#222]">
              Your Orders
            </DialogTitle>
          </DialogHeader>

            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { label: "Total Orders", color: "blue", count: 12 },
                { label: "Pending", color: "yellow", count: 2 },
                { label: "In Progress", color: "orange", count: 3 },
                { label: "Completed", color: "green", count: 7 },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-5 rounded-xl border shadow-sm
              ${item.color === "blue"
                      ? "bg-blue-100 border-blue-300"
                      : item.color === "yellow"
                        ? "bg-yellow-100 border-yellow-300"
                        : item.color === "orange"
                          ? "bg-orange-100 border-orange-300"
                          : "bg-green-100 border-green-300"
                    }`}
                >
                  <p
                    className={`text-3xl font-extrabold mb-1 ${item.color === "blue"
                        ? "text-blue-900"
                        : item.color === "yellow"
                          ? "text-yellow-900"
                          : item.color === "orange"
                            ? "text-orange-900"
                            : "text-green-900"
                      }`}
                  >
                    {item.count}
                  </p>
                  <p
                    className={`text-sm font-medium ${item.color === "blue"
                        ? "text-blue-800"
                        : item.color === "yellow"
                          ? "text-yellow-800"
                          : item.color === "orange"
                            ? "text-orange-800"
                            : "text-green-800"
                      }`}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
        </DialogContent>
      </Dialog>
      {/* Footer - Mobile Only */}
      <StudentFooter />
    </div>
  );
}