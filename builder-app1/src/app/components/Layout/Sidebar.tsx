"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f33426b4b5929911dd14b7c9b1e6daef01c813a9a4b9b43815ce112b1c879f0e?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "حسابي",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb45471208530a9ec2cd838003cab7ae97071f8b594109e1eee77778f0716eef?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "البطاقات المحفوظة",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/776c6af9f59441b0017f7b873598983b3262db14568797a3d01ad53d69db73b7?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "بطاقات الدفع",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/01565fe1e622c74ed4053a6c1506cc1312d1643ae8c86f89bf97fc1912600d6e?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "الرسائل",
    badge: "150",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bc3be6bd3a4de69dafc90994f2b0490a07ffa113c0abca740286754ea09642a0?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "الإعدادات",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b0126f6593e40beba677c614c07d1929f3cbc574c6f535c01b312431588b8c1?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5",
    text: "تسجيل الخروج",
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Use router for navigation

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <nav
        className={`flex flex-col py-8 font-medium bg-white w-64 h-full fixed md:relative z-10 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64`}
      >
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            {...item}
            onClick={item.text === "تسجيل الخروج" ? handleLogout : undefined} // Handle logout for the "تسجيل الخروج" button
          />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
