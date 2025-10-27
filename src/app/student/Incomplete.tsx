"use client";

import { useState, useEffect } from "react";
import StudentNavbar from "@/app/student/components/StudentNavbar";
import StudentFooter from "@/app/student/components/StudentFooter";

interface Order {
  id: string;
  status: "pending" | "inprogress" | "complete" | string;
  submission_date?: string;
  date?: string;
  number_of_clothes?: number;
  count?: number;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "inprogress":
      return "bg-orange-100 text-orange-800";
    case "complete":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case "pending":
      return "Pending";
    case "inprogress":
      return "In Progress";
    case "complete":
      return "Completed";
    default:
      return status;
  }
};

// Mock data for demonstration
const mockOrders = [
  {
    id: "1001",
    status: "pending",
    submission_date: new Date().toISOString(),
    number_of_clothes: 5,
  },
  {
    id: "1002",
    status: "inprogress",
    submission_date: new Date(Date.now() - 86400000).toISOString(),
    number_of_clothes: 3,
  },
];

export default function Incomplete() {
  const [incompleteOrders, setIncompleteOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setIncompleteOrders(mockOrders.filter(order => order.status !== 'complete'));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3] relative">
      <StudentNavbar />
      
      <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#a30c34] mb-8 text-center">
          Incomplete Orders
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full">
          {error && (
            <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-center font-medium">{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34] mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading incomplete orders...</p>
            </div>
          ) : incompleteOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No incomplete orders</p>
              <p className="text-gray-400 text-sm mt-2">
                Your pending laundry orders will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {incompleteOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="border rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col items-start w-full sm:w-auto">
                    <span className="font-semibold text-lg text-gray-800 mb-1">
                      Order #{order.id}
                    </span>
                    <span className="text-sm text-gray-600 mb-1">
                      Date:{" "}
                      {order.submission_date
                        ? new Date(order.submission_date).toLocaleDateString()
                        : order.date || "N/A"}
                    </span>
                    <span className="text-sm text-gray-600">
                      Clothes:{" "}
                      <span className="font-bold">
                        {order.number_of_clothes || order.count || 0}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col items-end mt-4 sm:mt-0 sm:ml-8">
                    <span
                      className={`font-semibold px-4 py-2 rounded-full text-base ${getStatusColor(
                        order.status
                      )} sm:text-lg`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <StudentFooter />
    </div>
  );
}