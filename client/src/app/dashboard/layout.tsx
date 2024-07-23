import LeftSidebar from "@/components/sidebar/left-sidebar";
import React from "react";

export default function DashboardLayout({ children } : { children: React.ReactNode }) {

  return (
    <div className="w-screen h-screen flex">
      <LeftSidebar />
      {children}
    </div>
  )
}