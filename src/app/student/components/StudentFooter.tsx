"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, Plus, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

interface StudentFooterProps {
  isHidden?: boolean;
}

const StudentFooter: React.FC<StudentFooterProps> = ({ isHidden = false }) => {
  const pathname = usePathname();

  const nav: NavItem[] = [
    { to: "/student/incomplete", label: "Incomplete", icon: AlertCircle },
    { to: "/student/dashboard", label: "Home", icon: Plus },
    { to: "/student/completed", label: "Completed", icon: ListChecks },
  ];

  return (
    <footer
      className={cn(
        "md:hidden fixed bottom-0 left-0 w-full z-40 transition-transform duration-300",
        isHidden ? "translate-y-full" : "translate-y-0"
      )}
    >
      <Card className="border-t border-gray-200 rounded-none bg-white px-4 py-2 pb-[calc(env(safe-area-inset-bottom,0px))] shadow-[0_-1px_4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {nav.map((item) => {
            const isActive = pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                href={item.to}
                className="flex flex-col items-center gap-1 py-2 px-3 min-w-0 flex-1"
              >
                <div
                  className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-[#a30c34]" : "text-gray-400"
                  )}
                >
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.2 : 1.6}
                    aria-hidden="true"
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-200",
                    isActive ? "text-[#a30c34]" : "text-gray-400"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </Card>
    </footer>
  );
};

export default StudentFooter;