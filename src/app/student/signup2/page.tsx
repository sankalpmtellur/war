import { Suspense } from "react";
import StudentSignup2 from "@/app/student/StudentSignup2";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf6f3]" />}>
      <StudentSignup2 />
    </Suspense>
  );
}
