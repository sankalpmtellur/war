import React from "react";
import StudentDashboard from "@/app/student/StudentDashboard";

export default function Page() {
  return (
    <StudentDashboard initialError="Network error while fetching dashboard data" />
  );
}
