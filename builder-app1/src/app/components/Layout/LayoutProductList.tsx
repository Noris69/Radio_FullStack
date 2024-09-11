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
      <Header />
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <main className="flex flex-col items-center md:items-start w-full p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutList;
