// Layout.tsx
import React from "react";
import Sidebar from "./SidebarAdmin";
import Header from "./HeaderProductList";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutList: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="flex-shrink-0 h-screen">
          <Sidebar />
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6">
          <main className="w-full h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayoutList;
