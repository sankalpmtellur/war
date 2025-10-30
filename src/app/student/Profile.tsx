"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MapPin,
  Edit,
  Save,
  X,
  ArrowLeft,
  Package,
} from "lucide-react";
import StudentNavbar from "./components/StudentNavbar";
import StudentFooter from "./components/StudentFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface StudentData {
  name: string;
  email: string;
  phone_no: string;
  enrollment_no: string;
  bag_no: string;
  residency_no: string;
}

const mockStudentData: StudentData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone_no: "+1234567890",
  enrollment_no: "ENR123456",
  bag_no: "BAG001",
  residency_no: "2",
};

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<StudentData>(mockStudentData);
  const [editData, setEditData] = useState<StudentData>({ ...mockStudentData });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    setSuccess("Profile updated successfully! (Changes are local only)");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f3] relative">
      <StudentNavbar />

      <main className="flex flex-col flex-1 px-4 sm:px-6 py-24 sm:py-28 w-full max-w-4xl mx-auto">
        <div className="w-full mb-4">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center space-x-2 text-[#a30c34] hover:text-[#8b092d] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        {success && (
          <Alert className="mb-4 bg-green-50 border border-green-200">
            <AlertDescription className="text-green-800 text-center font-medium">
              {success}
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mb-4 bg-red-50 border border-red-200">
            <AlertDescription className="text-red-800 text-center font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Card className="w-full bg-white rounded-xl shadow-md border-none">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333]">
                My Profile
              </h1>

              {!isEditing ? (
                <Button
                  onClick={handleEdit}
                  className="bg-[#a30c34] hover:bg-[#8b092d] text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="secondary"
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-[#a30c34] flex items-center justify-center bg-gradient-to-r from-[#a30c34] to-[#d63384]">
                <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#333] mb-1">
                  {isEditing ? (
                    <Input
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="border-b border-gray-300 rounded-none focus:border-[#a30c34] focus:ring-0 text-lg sm:text-xl"
                    />
                  ) : (
                    profileData.name
                  )}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-1">
                  Student
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Enrollment ID: {profileData.enrollment_no}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <Label className="text-gray-800 font-medium"><b>Email</b></Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="border-b border-gray-300 rounded-none focus:border-[#a30c34] focus:ring-0"
                        />
                      ) : (
                        <p className="text-sm text-gray-800 break-all">
                          {profileData.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <Label className="text-gray-800 font-medium"><b>Phone</b></Label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={editData.phone_no}
                          onChange={(e) =>
                            handleInputChange("phone_no", e.target.value)
                          }
                          className="border-b border-gray-300 rounded-none focus:border-[#a30c34] focus:ring-0"
                        />
                      ) : (
                        <p className="text-sm text-gray-800">
                          {profileData.phone_no}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">
                  Academic Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <Label className="text-gray-800 font-medium"><b>Enrollment Number</b></Label>
                      <p className="text-sm text-gray-800">
                        {profileData.enrollment_no}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <Label className="text-gray-800 font-medium"><b>Bag Number</b></Label>
                      <p className="text-sm text-gray-800">
                        {profileData.bag_no}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#333] border-b border-gray-200 pb-2">
                  Residency Information
                </h3>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <Label className="text-gray-800 font-medium"><b>Residency</b></Label>
                    {isEditing ? (
                      <Select
                        value={editData.residency_no}
                        onValueChange={(val) =>
                          handleInputChange("residency_no", val)
                        }
                      >
                        <SelectTrigger className="w-full border-b border-gray-300 rounded-none focus:border-[#a30c34] focus:ring-0">
                          <SelectValue placeholder="Select Residency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Residency 1</SelectItem>
                          <SelectItem value="2">Residency 2</SelectItem>
                          <SelectItem value="3">Residency 3</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-gray-800">
                        {profileData.residency_no || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <StudentFooter />
    </div>
  );
}