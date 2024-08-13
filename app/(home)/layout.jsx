"use client"
import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useSaveUserToDatabase } from "@/hooks/useSaveUserToDatabase";
import { Toaster } from "@/components/ui/toaster";

function DashboardLayout({ children }) {

  useSaveUserToDatabase();

  return (
    <div className="bg-gradient min-h-screen">
      <DashboardNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[300px]">
          {/* Adjust ml-[300px] if your sidebar width is different */}
          <div className="">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;



