"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Mail, Phone, Hash, MapPin, Package, ArrowLeft } from "lucide-react";

type OrderStatus = 'pending' | 'inprogress' | 'complete';

interface Order {
  id: string;
  bag_no: string;
  number_of_clothes: number;
  submission_date: string;
  status: OrderStatus;
}

interface Student {
  name: string;
  email: string;
  enrollment_no: string;
  bag_no: string;
  phone_no: string;
  residency_no: string;
}

// Mock data for demonstration
const mockStudents: Record<string, Student> = {
  '001': {
    name: 'John Doe',
    email: 'john.doe@example.com',
    enrollment_no: 'ENR001',
    bag_no: '001',
    phone_no: '+1234567890',
    residency_no: 'A101'
  },
  '002': {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    enrollment_no: 'ENR002',
    bag_no: '002',
    phone_no: '+1987654321',
    residency_no: 'B205'
  },
  '003': {
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    enrollment_no: 'ENR003',
    bag_no: '003',
    phone_no: '+1122334455',
    residency_no: 'C312'
  }
};

const mockOrders: Record<string, Order[]> = {
  '001': [
    {
      id: "1",
      bag_no: "001",
      number_of_clothes: 5,
      submission_date: "2025-10-15",
      status: "complete",
    },
    {
      id: "4",
      bag_no: "001",
      number_of_clothes: 3,
      submission_date: "2025-10-20",
      status: "inprogress",
    }
  ],
  '002': [
    {
      id: "2",
      bag_no: "002",
      number_of_clothes: 3,
      submission_date: "2025-10-16",
      status: "complete",
    }
  ],
  '003': [
    {
      id: "3",
      bag_no: "003",
      number_of_clothes: 7,
      submission_date: "2025-10-17",
      status: "pending",
    }
  ]
};

export default function StudentLookup() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentOrders, setStudentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchStudents = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResults([]);
    setSelectedStudent(null);
    setStudentOrders([]);

    setTimeout(() => {
      try {
        // Filter students based on search term (bag number)
        const results = Object.keys(mockStudents).filter(bagNo => 
          bagNo.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(results);

        if (results.length === 0) {
          setError("No students found with the given bag number");
        }
      } catch (error) {
        setError("Error searching for students");
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const viewStudentDetails = (bagNo: string) => {
    setLoading(true);
    setError("");

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        const student = mockStudents[bagNo];
        const orders = mockOrders[bagNo] || [];
        
        setSelectedStudent(student);
        setStudentOrders(orders);
      } catch (error) {
        setError("Error fetching student details");
        console.error('Student details error:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'inprogress':
        return 'text-orange-600 bg-orange-100';
      case 'complete':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inprogress':
        return 'In Progress';
      case 'complete':
        return 'Completed';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="min-h-screen bg-[#faf6f3] pt-20">
      <div className="max-w-6xl mx-auto p-6 font-['Playfair_Display']">
        <div className="p-6 mb-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#a30c34] hover:text-[#8b092d] font-medium"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">Student Lookup</h1>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Student by Bag Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search"
                  type="text"
                  placeholder="Enter bag number (e.g., 001, 002)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a30c34]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchStudents()}
                />
              </div>
            </div>
            <button
              onClick={searchStudents}
              disabled={loading}
              className="bg-[#a30c34] hover:bg-[#8b092d] disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition flex items-center gap-2 w-full md:w-auto justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !selectedStudent && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((bagNo) => {
                const student = mockStudents[bagNo];
                const orders = mockOrders[bagNo] || [];
                const latestOrder = orders.length > 0 
                  ? orders.sort((a, b) => new Date(b.submission_date).getTime() - new Date(a.submission_date).getTime())[0]
                  : null;

                return (
                  <div
                    key={bagNo}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                    onClick={() => viewStudentDetails(bagNo)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-[#a30c34]" />
                      <span className="font-semibold">Bag {bagNo}</span>
                    </div>
                    {student && (
                      <p className="text-sm text-gray-600 mb-1">Student: {student.name}</p>
                    )}
                    <p className="text-sm text-gray-600">Total Orders: {orders.length}</p>
                    {latestOrder && (
                      <p className="text-sm text-gray-600">
                        Last Order: {formatDate(latestOrder.submission_date)}
                      </p>
                    )}
                    <button 
                      className="mt-2 text-[#a30c34] hover:text-[#8b092d] text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewStudentDetails(bagNo);
                      }}
                    >
                      View Details →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Student Details */}
        {selectedStudent && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Student Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Student Information</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedStudent.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Number</p>
                    <p className="font-medium">{selectedStudent.enrollment_no}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Bag Number</p>
                    <p className="font-medium">{selectedStudent.bag_no}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium">{selectedStudent.phone_no}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Residency</p>
                    <p className="font-medium">{selectedStudent.residency_no}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>

              {studentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders found</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {studentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">Order #{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Clothes: {order.number_of_clothes}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {formatDate(order.submission_date)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
