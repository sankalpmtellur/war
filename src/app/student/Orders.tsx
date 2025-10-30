"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "./components/StudentNavbar";
import StudentFooter from "./components/StudentFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  total_orders: number;
  pending_orders: number;
  inprogress_orders: number;
  complete_orders: number;
}

const mockDashboardData: DashboardData = {
  total_orders: 24,
  pending_orders: 5,
  inprogress_orders: 3,
  complete_orders: 16,
};

export default function Orders() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardData(mockDashboardData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f3]">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3] relative">
      <StudentNavbar />

      <main className="flex flex-col items-center flex-1 px-4 sm:px-6 py-28 sm:py-32 w-full max-w-2xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="secondary"
          className="sm:hidden mb-6 self-start px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm flex items-center transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Button>

        <Card className="w-full bg-white rounded-2xl shadow-lg border-none">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Your Orders
            </h1>

            {dashboardData && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-blue-50 border border-blue-100">
                  <CardContent className="text-center p-4">
                    <p className="text-3xl font-bold text-blue-600">
                      {dashboardData.total_orders}
                    </p>
                    <p className="text-sm font-medium text-blue-800 mt-1">
                      Total Orders
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border border-yellow-100">
                  <CardContent className="text-center p-4">
                    <p className="text-3xl font-bold text-yellow-600">
                      {dashboardData.pending_orders}
                    </p>
                    <p className="text-sm font-medium text-yellow-800 mt-1">
                      Pending
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border border-orange-100">
                  <CardContent className="text-center p-4">
                    <p className="text-3xl font-bold text-orange-600">
                      {dashboardData.inprogress_orders}
                    </p>
                    <p className="text-sm font-medium text-orange-800 mt-1">
                      In Progress
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border border-green-100">
                  <CardContent className="text-center p-4">
                    <p className="text-3xl font-bold text-green-600">
                      {dashboardData.complete_orders}
                    </p>
                    <p className="text-sm font-medium text-green-800 mt-1">
                      Completed
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Order History
              </h2>
              <Card className="bg-gray-50 border border-gray-100">
                <CardContent className="text-center p-4">
                  <p className="text-gray-500 text-sm">
                    Your detailed order history will appear here
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>

      <StudentFooter />
    </div>
  );
}