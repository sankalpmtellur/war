"use client";
import { useState, useEffect } from "react";
import StudentNavbar from "@/app/student/components/StudentNavbar";
import StudentFooter from "@/app/student/components/StudentFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";

interface Order {
  id: string;
  status: string;
  submission_date?: string;
  updated_at?: string;
  number_of_clothes?: number;
  count?: number;
}

const mockOrders: Order[] = [
  {
    id: "2001",
    status: "complete",
    submission_date: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    number_of_clothes: 4,
  },
  {
    id: "2002",
    status: "complete",
    submission_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    number_of_clothes: 6,
  },
];

export default function Completed() {
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompletedOrders(mockOrders.filter((order) => order.status === "complete"));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3] relative">
      <StudentNavbar />

      <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#a30c34] mb-8 text-center">
          Completed Orders
        </h1>

        <Card className="bg-white rounded-2xl shadow-lg border-none">
          <CardContent className="p-6 sm:p-8 w-full">
            {loading ? (
              <div className="flex flex-col items-center py-12">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <p className="text-gray-500 text-lg">Loading completed orders...</p>
              </div>
            ) : completedOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-500 text-lg">No completed orders yet</p>
                <p className="text-gray-400 text-sm mt-2">
                  Your completed laundry orders will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {completedOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="border border-green-200 bg-green-50 hover:shadow-md transition-shadow duration-200"
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">
                            Order #{order.id}
                          </h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              Submitted:{" "}
                              {order.submission_date
                                ? new Date(order.submission_date).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p>
                              Completed:{" "}
                              {order.updated_at
                                ? new Date(order.updated_at).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-4 text-right">
                          <p className="font-semibold text-green-700">
                            {order.number_of_clothes || order.count || 0} clothes
                          </p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700 border border-green-200"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <StudentFooter />
    </div>
  );
}
