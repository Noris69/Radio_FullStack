import React from "react";
import { useRouter } from "next/navigation"; // Import the router

const Header: React.FC = () => {
  const router = useRouter(); // Use router for navigation

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to login page
    router.push("/login");
  };
  const goToHome = () => {
    // Redirect to homepage
    router.push("/");
  };
  const handleProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Redirect to Profile page with userId as query param
      router.push(`/ProfileUser?userId=${userId}`);
    }
  };

  return (
    <header className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/377e73321927c27c2b1a2959018f11dba7c2e715b1f53c17fd0c07506b009493?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
          alt="Logo"
          className="w-8 h-8 mr-2"
        />
<span
          className="text-xl font-bold text-slate-900 cursor-pointer"
          onClick={goToHome}
        >
          Hiphonic
        </span>      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-900">عربي <span className="text-slate-500">▼</span></button>
        <button className="text-slate-900" onClick={handleProfile}>
          حسابي
        </button>
        <button className="border border-slate-900 px-4 py-1 rounded-md" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </div>
    </header>
  );
};

export default Header;
