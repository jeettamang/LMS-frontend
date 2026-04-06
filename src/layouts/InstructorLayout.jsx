import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import InstructorSidebar from "../components/sidebar/InstructorSidebar";


const InstructorLayout = () => {

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <InstructorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Instructor Panel
          </h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;