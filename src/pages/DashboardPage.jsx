import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-white ">
      <aside className="h-screen sticky top-0 w-1/6 bg-primary shadow-custom text-white">
        <Sidebar />
      </aside>

      <div className="flex flex-col  h-full w-full">
        <Header />

        <main className="flex-grow overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
