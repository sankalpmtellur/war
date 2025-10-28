"use client";

import * as React from "react";
import { useState } from "react";
import { FaTshirt, FaCalendarAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import WashermanNavbar from "./components/WashermanNavbar";

type OrderStatus = "pending" | "inprogress" | "complete";

interface Order {
  id: string;
  bag_no: string;
  number_of_clothes: number;
  submission_date: string;
  status: OrderStatus;
}

const mockOrders: Order[] = [
  {
    id: "1",
    bag_no: "001",
    number_of_clothes: 5,
    submission_date: "2025-10-15",
    status: "pending",
  },
  {
    id: "2",
    bag_no: "002",
    number_of_clothes: 3,
    submission_date: "2025-10-16",
    status: "inprogress",
  },
  {
    id: "3",
    bag_no: "003",
    number_of_clothes: 7,
    submission_date: "2025-10-17",
    status: "complete",
  },
];

export default function WashermanDashboard(): React.JSX.Element {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [error, setError] = useState<string>("");
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingCount, setEditingCount] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    // Update the order status in the local state
    setOrders((prevOrders: Order[]) => 
      prevOrders.map((order: Order) => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  const startEdit = (orderId: string, currentCount: number) => {
    setEditingOrderId(orderId);
    setEditingCount(String(currentCount));
  };

  const cancelEdit = () => {
    setEditingOrderId(null);
    setEditingCount("");
  };

  const saveEdit = () => {
    if (!editingOrderId) return;
    const parsed = parseInt(editingCount, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError("Please enter a valid positive number of clothes");
      return;
    }

    setSaving(true);
    // Update the order count in the local state
    setOrders((prevOrders: Order[]) => 
      prevOrders.map((order: Order) => 
        order.id === editingOrderId 
          ? { ...order, number_of_clothes: parsed } 
          : order
      )
    );
    
    setTimeout(() => {
      setSaving(false);
      cancelEdit();
    }, 500);
  };

  const handleReceived = (orderId: string) => {
    handleStatusUpdate(orderId, "inprogress");
  };

  const handleReady = (orderId: string) => {
    handleStatusUpdate(orderId, "complete");
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "text-yellow-700 bg-yellow-50";
      case "inprogress":
        return "text-orange-700 bg-orange-50";
      case "complete":
        return "text-green-700 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: OrderStatus) => {
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

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("en-GB");
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "pending" && order.status === "pending") ||
      (selectedTab === "inprogress" && order.status === "inprogress") ||
      (selectedTab === "complete" && order.status === "complete");
    const matchesSearch = order.bag_no
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf6f3]">
      <WashermanNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900">
          Orders
        </h1>

        {/* Error message */}
        {error && (
          <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap border rounded-xl overflow-hidden bg-white shadow-sm">
            {["all", "pending", "inprogress", "complete"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium text-sm sm:text-base capitalize transition-colors ${
                  selectedTab === tab
                    ? "bg-[#a30c34] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedTab(tab)}
                type="button"
              >
                {tab === "inprogress" ? "In Progress" : tab}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Bag Number"
                className="w-full border rounded-xl pl-10 pr-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#a30c34] outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm border">
              <p className="text-gray-500 text-lg">No orders found.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row justify-between gap-4 bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
              >
                {/* LEFT: details (same structure as your original) */}
                <div className="space-y-2 flex-1">
                  <p className="text-lg">
                    <span className="text-gray-900 font-bold">Bag No: </span>
                    <span className="text-gray-900 font-bold">
                      {order.bag_no}
                    </span>
                  </p>

                  <div className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                    <FaTshirt className="text-gray-500" />
                    <span>Clothes:</span>
                    <span className="font-medium">{order.number_of_clothes}</span>
                  </div>

                  <p className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                    <FaCalendarAlt className="text-gray-500" /> Date:{" "}
                    <span className="text-[#a30c34]">
                      {formatDate(order.submission_date)}
                    </span>
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>

                {/* RIGHT: actions (buttons) — aligned to the right */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                  {order.status === "pending" && (
                    <>
                      {editingOrderId === order.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            className="px-2 py-1 bg-gray-100 rounded-md border hover:bg-gray-200"
                            onClick={() =>
                              setEditingCount((c) =>
                                String(Math.max(1, (parseInt(c || "0", 10) || 0) - 1))
                              )
                            }
                            type="button"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            min={1}
                            value={editingCount}
                            onChange={(e) => setEditingCount(e.target.value)}
                            className="w-20 text-center border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#a30c34]"
                          />

                          <button
                            className="px-2 py-1 bg-gray-100 rounded-md border hover:bg-gray-200"
                            onClick={() =>
                              setEditingCount((c) =>
                                String((parseInt(c || "0", 10) || 0) + 1)
                              )
                            }
                            type="button"
                          >
                            +
                          </button>

                          <button
                            className="px-3 py-1 bg-[#a30c34] text-white rounded-md hover:bg-[#8b092d] disabled:bg-gray-400"
                            onClick={saveEdit}
                            disabled={saving}
                            type="button"
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>

                          <button
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            onClick={cancelEdit}
                            type="button"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm sm:text-base transition"
                          onClick={() => startEdit(order.id, order.number_of_clothes)}
                          type="button"
                        >
                          Edit Count
                        </button>
                      )}

                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleReceived(order.id)}
                        disabled={saving}
                        type="button"
                      >
                        {saving ? 'Updating...' : 'Mark as Received'}
                      </button>
                    </>
                  )}

                  {order.status === "inprogress" && (
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleReady(order.id)}
                      disabled={saving}
                      type="button"
                    >
                      {saving ? 'Updating...' : 'Mark as Ready'}
                    </button>
                  )}

                  {order.status === "complete" && (
                    <span className="flex items-center gap-1 text-green-700 font-semibold text-sm sm:text-base">
                      <AiOutlineCheckCircle className="w-4 h-4" />
                      Ready for Pickup
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}